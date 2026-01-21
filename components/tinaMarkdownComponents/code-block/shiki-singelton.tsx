import {
  transformerNotationDiff,
  transformerNotationFocus,
  transformerNotationHighlight,
} from '@shikijs/transformers';
import type { ShikiTransformer } from 'shiki';
import { createHighlighter, type Highlighter } from 'shiki';

/**
 * Parse line range string like "5-10" or "3" into a Set of line numbers
 */
function parseLineRange(lineRange: string): Set<number> {
  const lines = new Set<number>();
  if (!lineRange) return lines;

  const parts = lineRange.split(',');
  for (const part of parts) {
    const trimmed = part.trim();
    if (trimmed.includes('-')) {
      const [start, end] = trimmed.split('-').map(Number);
      if (!Number.isNaN(start) && !Number.isNaN(end)) {
        for (let i = start; i <= end; i++) {
          lines.add(i);
        }
      }
    } else {
      const num = Number(trimmed);
      if (!Number.isNaN(num)) {
        lines.add(num);
      }
    }
  }
  return lines;
}

/**
 * Custom transformer that highlights specific line ranges
 */
function transformerLineHighlight(
  highlightLines: string,
): ShikiTransformer | undefined {
  if (!highlightLines) return undefined;

  const linesToHighlight = parseLineRange(highlightLines);
  if (linesToHighlight.size === 0) return undefined;

  return {
    name: 'line-highlight',
    line(node, line) {
      if (linesToHighlight.has(line)) {
        node.properties['data-highlighted'] = '';
        this.addClassToHast(node, 'highlighted');
      }
      return node;
    },
  };
}

class ShikiSingleton {
  private highlighter: Highlighter | null = null;
  private supportedLangs = new Set<string>();
  private readonly themes = ['night-owl', 'github-light'];
  private initPromise: Promise<void> | null = null;

  private async initializeHighlighter(initialLang: string): Promise<void> {
    if (this.highlighter) {
      return;
    }

    this.highlighter = await createHighlighter({
      themes: this.themes,
      langs: [initialLang],
    });
    this.supportedLangs.add(initialLang);
  }

  private async ensureLanguageLoaded(lang: string): Promise<void> {
    if (!this.highlighter) {
      throw new Error('Highlighter not initialized');
    }

    if (!this.supportedLangs.has(lang)) {
      try {
        await this.highlighter.loadLanguage(lang as any);
        this.supportedLangs.add(lang);
      } catch {
        // Fallback to a default language if the requested one fails
        if (!this.supportedLangs.has('text')) {
          await this.highlighter.loadLanguage('text' as any);
          this.supportedLangs.add('text');
        }
      }
    }
  }

  async getHighlighter(lang: string): Promise<Highlighter> {
    // If no highlighter exists, initialize it
    if (!this.highlighter) {
      // Prevent multiple simultaneous initializations
      if (!this.initPromise) {
        this.initPromise = this.initializeHighlighter(lang);
      }
      await this.initPromise;
    }

    // Ensure the required language is loaded
    await this.ensureLanguageLoaded(lang);

    if (!this.highlighter) {
      throw new Error('Failed to initialize highlighter');
    }

    return this.highlighter;
  }

  async codeToHtml(
    code: string,
    lang: string,
    isDarkMode: boolean,
    highlightLines?: string,
  ): Promise<string> {
    const highlighter = await this.getHighlighter(lang);

    const transformers: ShikiTransformer[] = [
      transformerNotationDiff({ matchAlgorithm: 'v3' }),
      transformerNotationHighlight({ matchAlgorithm: 'v3' }),
      transformerNotationFocus({ matchAlgorithm: 'v3' }),
    ];

    // Add line highlight transformer if lines are specified
    const lineHighlighter = transformerLineHighlight(highlightLines);
    if (lineHighlighter) {
      transformers.push(lineHighlighter);
    }

    return highlighter.codeToHtml(code, {
      lang,
      theme: isDarkMode ? 'night-owl' : 'github-light',
      transformers,
      meta: {
        showLineNumbers: true,
      },
    });
  }

  dispose(): void {
    if (this.highlighter) {
      this.highlighter.dispose();
      this.highlighter = null;
      this.supportedLangs.clear();
      this.initPromise = null;
    }
  }

  // Get info about loaded languages (useful for debugging)
  getLoadedLanguages(): string[] {
    return Array.from(this.supportedLangs);
  }
}

// Export the singleton instance
export const shikiSingleton = new ShikiSingleton();

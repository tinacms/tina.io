// .github/scripts/translate-mdx.js
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const config = require('../config/translation-config.json');
const { fixPathsInFile } = require('./fix-translation-paths');

const API_KEY = process.env.TINA_OPENAI_API_KEY;
const CHANGED_FILES = process.env.CHANGED_FILES.split('\n').filter((f) =>
  f.trim(),
);

function getTargetPath(sourceFilePath) {
  if (sourceFilePath.startsWith('content/docs/')) {
    return sourceFilePath.replace('content/docs/', 'content/docs-zh/');
  } else if (sourceFilePath.startsWith('content/blog/')) {
    return sourceFilePath.replace('content/blog/', 'content/blog-zh/');
  }
  return sourceFilePath.replace('content/docs/', 'content/docs-zh/');
}

async function translateMdx(filePath) {
  console.log(`Processing file: ${filePath}`);

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const response = await axios({
      method: 'post',
      url: config.API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      data: {
        model: config.openaiModel || 'gpt-4',
        messages: [
          {
            role: 'system',
            content:
              '你是一个翻译助手，负责将英文内容翻译成中文。请确保翻译准确，并保持原有的Markdown格式和代码块。请不要添加任何额外的注释或解释。',
          },
          {
            role: 'user',
            content: config.promptTemplate.replace('{{content}}', content),
          },
        ],
        temperature: config.temperature || 0.7,
        max_tokens: config.maxTokens || 5000,
      },
    });

    console.log(`Translation response: ${JSON.stringify(response.data)}`);

    const translatedContent = response.data.choices[0].message.content.trim();

    const targetPath = getTargetPath(filePath);

    const targetDir = path.dirname(targetPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.writeFileSync(targetPath, translatedContent);
    console.log(`Translated and saved to: ${targetPath}`);

    fixPathsInFile(targetPath);

    return targetPath;
  } catch (error) {
    console.error(`Error processing ${filePath}: ${error.message}`);
    if (error.response) {
      console.error(`API response: ${JSON.stringify(error.response.data)}`);
    }
    return null;
  }
}

async function main() {
  const translatedFiles = [];

  for (const file of CHANGED_FILES) {
    const translatedFile = await translateMdx(file);
    if (translatedFile) {
      translatedFiles.push(translatedFile);
    }
  }

  if (translatedFiles.length > 0) {
    console.log(
      `Successfully translated and fixed paths for ${translatedFiles.length} files.`,
    );
  } else {
    console.log('No files were translated.');
  }
}

main().catch((error) => {
  console.error('Translation process failed:', error);
  process.exit(1);
});

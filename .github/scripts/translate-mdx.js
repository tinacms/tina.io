// .github/scripts/translate-mdx.js
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const config = require('../config/translation-config.json');

const API_KEY = process.env.AZURE_OPENAI_API_KEY;
const CHANGED_FILES = process.env.CHANGED_FILES.split('\n').filter((f) =>
  f.trim()
);
const SOURCE_PATH = config.sourcePath || 'content/docs';
const TARGET_PATH = config.targetPath || 'content/docs-zh';

async function translateMdx(filePath) {
  console.log(`Processing file: ${filePath}`);

  try {
    const content = fs.readFileSync(filePath, 'utf8');

    //TODO: Need update
    const response = await axios.post(
      // config.apiEndpoint,
      // {
      //   model: config.modelName,
      //   prompt: config.promptTemplate.replace('{{content}}', content),
      //   max_tokens: config.maxTokens || 5000,
      //   temperature: config.temperature || 0.1,
      // },
      // {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${API_KEY}`,
      //   },
      // }

      `${config.azureApiBase}/openai/deployments/${config.azureDeploymentId}/chat/completions?api-version=${config.azureApiVersion}`,
      {
        messages: [
          {
            role: 'system',
            content:
              'You are a professional translator that translates English technical documentation to Simplified Chinese.',
          },
          {
            role: 'user',
            content: config.promptTemplate.replace('{{content}}', content),
          },
        ],
        max_tokens: config.maxTokens || 5000,
        temperature: config.temperature || 0.1,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          // Azure OpenAI uses api-key instead of Bearer token
          'api-key': `${API_KEY}`,
        },
      }
    );

    const translatedContent = response.data.choices[0].text.trim();

    const relativePath = filePath.replace(`${SOURCE_PATH}/`, '');
    const targetPath = path.join(TARGET_PATH, relativePath);

    const targetDir = path.dirname(targetPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    fs.writeFileSync(targetPath, translatedContent);
    console.log(`Translated and saved to: ${targetPath}`);

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
    console.log(`Successfully translated ${translatedFiles.length} files.`);
  } else {
    console.log('No files were translated.');
  }
}

main().catch((error) => {
  console.error('Translation process failed:', error);
  process.exit(1);
});

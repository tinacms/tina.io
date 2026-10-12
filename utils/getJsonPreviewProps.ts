import path from 'node:path';
import { readFile } from './readFile';

export const getJsonPreviewProps = async (
  fileRelativePath?: string,
  preview?: boolean,
  previewData?: any,
) => {
  let file = null;
  let error = null;

  try {
    file = await getJsonFile(fileRelativePath, preview, previewData);
  } catch (e) {
    error = e;
  }

  return {
    props: {
      error,
      preview: !!preview,
      file,
    },
  };
};

export async function getJsonFile<_T = any>(
  fileRelativePath: string,
  _preview: boolean,
  _previewData: any,
): Promise<any> {
  return {
    sha: '',
    fileRelativePath,
    data: await readJsonFile(fileRelativePath),
  };
}

export const readJsonFile = async (filePath: string) => {
  const data = await readFile(path.resolve(`${filePath}`));
  return JSON.parse(data);
};

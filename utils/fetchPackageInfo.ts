export type PackageInfoSuccess = {
  name: string;
  version: string;
  publishedAt: string;
};

export type PackageInfoError = {
  name: string;
  error: string;
};

export type PackageInfo = PackageInfoSuccess | PackageInfoError;

export function isPackageInfoError(
  info: PackageInfo,
): info is PackageInfoError {
  return 'error' in info;
}

export async function fetchPackageInfo(name: string): Promise<PackageInfo> {
  const url = `https://registry.npmjs.org/${name.replace('/', '%2F')}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      return { name, error: `HTTP ${res.status}` };
    }
    const body = await res.json();
    const version = body?.['dist-tags']?.latest;
    const publishedAt = body?.time?.[version];
    if (!version) {
      return { name, error: 'No latest dist-tag' };
    }
    return { name, version, publishedAt: publishedAt ?? '' };
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return { name, error: message };
  }
}

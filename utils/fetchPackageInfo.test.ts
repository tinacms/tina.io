import { fetchPackageInfo } from './fetchPackageInfo';

describe('fetchPackageInfo', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('returns the latest version and published date on success', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        'dist-tags': { latest: '2.3.4' },
        time: { '2.3.4': '2024-11-20T14:23:45.123Z' },
      }),
    }) as unknown as typeof fetch;

    const result = await fetchPackageInfo('tinacms');

    expect(result).toEqual({
      name: 'tinacms',
      version: '2.3.4',
      publishedAt: '2024-11-20T14:23:45.123Z',
    });
    expect(global.fetch).toHaveBeenCalledWith(
      'https://registry.npmjs.org/tinacms',
    );
  });

  it('url-encodes scoped package names', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        'dist-tags': { latest: '1.0.0' },
        time: { '1.0.0': '2024-01-01T00:00:00.000Z' },
      }),
    }) as unknown as typeof fetch;

    await fetchPackageInfo('@tinacms/cli');

    expect(global.fetch).toHaveBeenCalledWith(
      'https://registry.npmjs.org/@tinacms%2Fcli',
    );
  });

  it('returns an error entry when the fetch response is not ok', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 404,
    }) as unknown as typeof fetch;

    const result = await fetchPackageInfo('does-not-exist');

    expect(result).toEqual({
      name: 'does-not-exist',
      error: 'HTTP 404',
    });
  });

  it('returns an error entry when fetch rejects', async () => {
    global.fetch = jest
      .fn()
      .mockRejectedValue(new Error('network down')) as unknown as typeof fetch;

    const result = await fetchPackageInfo('tinacms');

    expect(result).toEqual({
      name: 'tinacms',
      error: 'network down',
    });
  });
});

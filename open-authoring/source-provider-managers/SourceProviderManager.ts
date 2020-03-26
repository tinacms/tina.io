export interface SourceProviderManager {
  authenticate(): Promise<void>
}

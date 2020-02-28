export class BrowserStorageApi {
  data: any = {}
  timeout: number | null = null
  namespace: string
  storage: Storage // should work with window.localStorage or window.sessionStorage

  constructor(storage: Storage, namespace = null) {
    if (!namespace) {
      this.namespace = window.location.hostname
    } else {
      this.namespace = namespace
    }
    this.storage = storage
    const persistedData = this.storage.getItem(this.namespace)
    if (persistedData) {
      this.data = JSON.parse(persistedData)
    }
  }

  save(id, content) {
    this.timeout && clearTimeout(this.timeout)
    this.data[id] = content
    this.timeout = setTimeout(this.persist.bind(this), 1000)
  }

  load(id) {
    return this.data[id]
  }

  persist() {
    this.storage.setItem(this.namespace, JSON.stringify(this.data))
  }
}

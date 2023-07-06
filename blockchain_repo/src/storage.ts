export class StorageUnit {
  constructor(private key: string) {}
  getValue(): string | null {
    return localStorage.getItem(this.key)
  }
  setValue(value: string) {
    localStorage.setItem(this.key, value)
  }
  clear() {
    localStorage.removeItem(this.key)
  }
}

export const storages = {
  token: new StorageUnit('token'),
  // nickname: new StorageUnit('nickname'),
}

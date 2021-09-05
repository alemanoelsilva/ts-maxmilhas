import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  url: null as unknown as string,

  _getDatabase() {
    return this.client?.db()
  },

  async connect(uri: string): Promise<void> {
    this.url = uri
    this.client = new MongoClient(uri)

    await this.client.connect()
  },

  async disconnect(): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection(name: string): Promise<Collection> {
    if (!this._getDatabase()) {
      await this.connect(this.url)
    }
    return this._getDatabase().collection(name)
  }
}

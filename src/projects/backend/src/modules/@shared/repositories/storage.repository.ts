import type { FileService } from '@/@types'

export class StorageRepository {
  constructor(private fileService: FileService) {}

  async saveFile(filePath: string, content: Buffer): Promise<void> {
    await this.fileService.saveFile(filePath, content)
  }

  async readFile(filePath: string): Promise<Buffer | null> {
    try {
      return await this.fileService.readFile(filePath)
    } catch (error) {
      return null
    }
  }

  async deleteFile(filePath: string): Promise<void> {
    await this.fileService.deleteFile(filePath)
  }

  async fileExists(filePath: string): Promise<boolean> {
    try {
      await this.fileService.readFile(filePath)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }
}

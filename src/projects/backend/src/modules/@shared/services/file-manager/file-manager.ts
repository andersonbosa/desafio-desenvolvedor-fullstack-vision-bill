import type { FileService } from '@/@types'
import fs from 'node:fs'

export class FileManagerService implements FileService {
  async saveFile(filePath: string, fileData: Buffer | string): Promise<void> {
    fs.writeFileSync(filePath, fileData)
  }

  async readFile(filePath: string): Promise<Buffer> {
    try {
      const stringData = fs.readFileSync(filePath, { encoding: 'utf8' })
      return Buffer.from(stringData)
    } catch (err) {
      throw new Error(`Error reading file: ${err}`)
    }
  }

  async deleteFile(filePath: string): Promise<void> {
    fs.unlinkSync(filePath)
  }
}

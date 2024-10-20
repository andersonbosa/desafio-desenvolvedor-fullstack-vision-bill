import { createHash } from 'node:crypto'

interface FileFingerprintGeneratorInput {
  filename: string
  encoding: string
  mimetype: string
  byteLength: number
}

export class FileFingerprintGenerator {
  constructor(private input: FileFingerprintGeneratorInput) {}

  public generate(): string {
    const hash = createHash('sha256')
    hash.update(Object.values(this.input).join())
    return hash.digest('hex')
  }
}

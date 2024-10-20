import { createHash } from 'node:crypto'

interface IdempotencyKeyGeneratorInput {
  browserFingerprint
}

export class IdempotencyKeyGenerator {
  constructor(private input: IdempotencyKeyGeneratorInput) {}

  public generate(): string {
    const hash = createHash('sha256')
    hash.update(JSON.stringify(this.input))
    return hash.digest('hex')
  }
}

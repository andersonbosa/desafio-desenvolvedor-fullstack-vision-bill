export interface Parser {
  key: string
  identifier: (txt: string) => boolean
  extractor: (txt: string) => any
}

export interface ParserResult {
  key: string
  data: any
}

export function ParsingEngine(input: string, parsers: Parser[]): ParserResult[] {
  const results = []
  for (const { identifier, extractor, key } of parsers) {
    if (identifier(input)) {
      results.push({ key, data: extractor(input) })
    }
  }
  return results
}

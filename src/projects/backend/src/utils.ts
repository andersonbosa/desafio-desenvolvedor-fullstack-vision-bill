export function toSixDecimals(value: number): number {
  return Number(value.toFixed(6))
}

export function parseRealMoney(value: string): string {
  let cleanValue = value.replace('R$', '').trim()
  cleanValue = cleanValue.replace(/\.(?=\d{3})/g, '')
  cleanValue = cleanValue.replace(',', '.')
  const parsedValue = Number.parseFloat(cleanValue)
  if (Number.isNaN(parsedValue)) {
    throw new Error(`"${value}" not a valid value`)
  }

  return String(Number.parseFloat(parsedValue.toFixed(2)))
}

export function getReferenceLineIndex(lines: string[], searchTerm: string) {
  return lines.findIndex((line) => line.includes(searchTerm))
}

export function extractColumns(line: string, columnIndices: number[]): string[] {
  const columns = line.trim().split(/\s+/)
  const extractedValues = columnIndices.map((index) => columns[index])
  return extractedValues
}

export function remapReferenceDateToISOString(dateName: string): string {
  const map: Record<string, string> = {
    JAN: '01',
    FEV: '02',
    MAR: '03',
    ABR: '04',
    MAI: '05',
    JUN: '06',
    JUL: '07',
    AGO: '08',
    SET: '09',
    OUT: '10',
    NOV: '11',
    DEZ: '12'
  }
  const [monthName, yearNumber] = dateName.split('/')
  const monthNumber = map[monthName]
  return new Date(`${monthNumber}/01/${yearNumber}`).toISOString()
}

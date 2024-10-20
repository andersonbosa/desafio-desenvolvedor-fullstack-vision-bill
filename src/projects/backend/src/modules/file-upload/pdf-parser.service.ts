import pdfParse from 'pdf-parse'
import { LumiPdfParser } from '../@shared/services/parsers/parsers'
import type { LumiPdfParserOutput } from '@/@types'

export async function parsePdfFile(pdfBuffer: Buffer): Promise<LumiPdfParserOutput> {
  const data = await pdfParse(pdfBuffer)
  // info.PDFFormatVersion: '1.3',
  // info.IsAcroFormPresent: false,
  // info.IsXFAPresent: false,
  // info.Author: 'U_PO_SOA_AGV',
  // info.Creator: 'Form ZFAT_ISUBILL_BT PT',
  // info.Producer: 'SAP NetWeaver 731 ',
  // info.CreationDate: 'D:20240131132107'

  const parsedData = new LumiPdfParser().parse(data.text)

  return parsedData
}

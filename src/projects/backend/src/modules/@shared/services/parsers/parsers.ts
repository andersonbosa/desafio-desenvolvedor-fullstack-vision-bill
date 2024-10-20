import type { ConsumptionHistoric, LumiPdfParserOutput } from '@/@types'
import { type Parser, type ParserResult, ParsingEngine } from '../../lib/parser-engine/engine'
import {
  extractColumns,
  getReferenceLineIndex,
  parseRealMoney,
  remapReferenceDateToISOString
} from '@/utils'

import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
dayjs.locale(ptBR)

const parse_numero_do_cliente = {
  key: 'numero_do_cliente',
  identifier: (txt: string) => {
    return txt.includes('')
  },
  extractor: (txt: string) => {
    const lines = txt.split('\n')
    const referenceLineIndex = getReferenceLineIndex(lines, 'Nº DO CLIENTE')
    const matches = lines[referenceLineIndex + 1].match(/(\d+)/g)
    return matches ? matches[0] : null
  }
}

const parse_numero_da_instalacao = {
  key: 'numero_da_instalacao',
  identifier: (txt: string) => {
    return txt.includes('Nº DA INSTALAÇÃO')
  },
  extractor: (txt: string) => {
    const lines = txt.split('\n')
    const referenceLineIndex = getReferenceLineIndex(lines, 'Nº DA INSTALAÇÃO')
    const matches = lines[referenceLineIndex + 1].match(/(\d+)/g)
    return matches ? matches[1] : null
  }
}

const parse_energia_eletrica_kwh = {
  key: 'energia_eletrica_kwh',
  identifier: (txt: string) => {
    return txt.includes('Energia ElétricakWh')
  },
  extractor: (txt: string) => {
    const lines = txt.split('\n')
    const referenceLineIndex = getReferenceLineIndex(lines, 'Energia ElétricakWh')
    const [value] = extractColumns(lines[referenceLineIndex], [2])
    return Number.parseFloat(value) || null
  }
}

const parse_energia_eletrica_valor = {
  key: 'energia_eletrica_valor',
  identifier: (txt: string) => {
    return txt.includes('Energia ElétricakWh')
  },
  extractor: (txt: string) => {
    const lines = txt.split('\n')
    const referenceLineIndex = getReferenceLineIndex(lines, 'Energia ElétricakWh')
    const [value] = extractColumns(lines[referenceLineIndex], [4])
    return Number.parseFloat(value) || null
  }
}

const parse_energia_sceee_sem_icms_kwh = {
  key: 'energia_sceee_sem_icms_kwh',
  identifier: (txt: string) => {
    return txt.includes('Energia SCEE s/ ICMSkWh')
  },
  extractor: (txt: string) => {
    const lines = txt.split('\n')
    const referenceLineIndex = getReferenceLineIndex(lines, 'Energia SCEE s/ ICMSkWh')
    const [value] = extractColumns(lines[referenceLineIndex], [4])
    return Number.parseFloat(value) || null
  }
}

const parse_energia_sceee_sem_icms_valor = {
  key: 'energia_sceee_sem_icms_valor',
  identifier: (txt: string) => {
    return txt.includes('Energia SCEE s/ ICMSkWh')
  },
  extractor: (txt: string) => {
    const lines = txt.split('\n')
    const referenceLineIndex = getReferenceLineIndex(lines, 'Energia SCEE s/ ICMSkWh')
    const [value] = extractColumns(lines[referenceLineIndex], [6])
    return Number.parseFloat(value) || null
  }
}

const parse_energia_compensada_gd_kwh = {
  key: 'energia_compensada_gd_kwh',
  identifier: (txt: string) => txt.includes('Energia compensada GD IkWh'),
  extractor: (txt: string) => {
    const lines = txt.split('\n')
    const referenceLineIndex = getReferenceLineIndex(lines, 'Energia compensada GD IkWh')
    const [value] = extractColumns(lines[referenceLineIndex], [4])
    return Number.parseFloat(value) || null
  }
}

const parse_energia_compensada_gd_valor = {
  key: 'energia_compensada_gd_valor',
  identifier: (txt: string) => txt.includes('Energia compensada GD IkWh'),
  extractor: (txt: string) => {
    const lines = txt.split('\n')
    const referenceLineIndex = getReferenceLineIndex(lines, 'Energia compensada GD IkWh')
    const [value] = extractColumns(lines[referenceLineIndex], [6])
    return Number.parseFloat(value) || null
  }
}

const parse_contrib_ilum_publica_municipal = {
  key: 'contrib_ilum_publica_municipal',
  identifier: (txt: string) => txt.includes('Contrib Ilum Publica Municipal'),
  extractor: (txt: string) => {
    const lines = txt.split('\n')
    const referenceLineIndex = getReferenceLineIndex(lines, 'Contrib Ilum Publica Municipal')
    const [value] = extractColumns(lines[referenceLineIndex], [4])
    return Number.parseFloat(value) || null
  }
}

const parse_url_chave_acesso = {
  key: 'url_chave_acesso',
  identifier: (txt: string) => txt.includes('http://www.sped.fazenda.mg.gov.br/spedmg/'),
  extractor: (txt: string) => {
    const lines = txt.split('\n')
    const referenceLineIndex = getReferenceLineIndex(
      lines,
      'http://www.sped.fazenda.mg.gov.br/spedmg/'
    )
    return lines[referenceLineIndex]?.trim() || null
  }
}

const parse_chave_de_acesso = {
  key: 'chave_de_acesso',
  identifier: (txt: string) => txt.includes('chave de acesso:'),
  extractor: (txt: string) => {
    const lines = txt.split('\n')
    const referenceLineIndex = getReferenceLineIndex(lines, 'chave de acesso:')
    return (referenceLineIndex && lines[referenceLineIndex + 1]?.trim()) || null
  }
}

const parse_valor = {
  key: 'valor_boleto',
  identifier: (txt: string) =>
    txt.includes('Código de Débito AutomáticoInstalaçãoVencimentoTotal a pagar'),
  extractor: (txt: string) => {
    const lines = txt.split('\n')
    const referenceLineIndex = getReferenceLineIndex(
      lines,
      'Código de Débito AutomáticoInstalaçãoVencimentoTotal a pagar'
    )
    const value = lines[referenceLineIndex + 1]?.slice(22)?.split('R$')[1]
    return Number(parseRealMoney(value)) || null
  }
}

const parse_data_de_vencimento = {
  key: 'data_de_vencimento',
  identifier: (txt: string) =>
    txt.includes('Código de Débito AutomáticoInstalaçãoVencimentoTotal a pagar'),
  extractor: (txt: string) => {
    const lines = txt.split('\n')
    const referenceLineIndex = getReferenceLineIndex(
      lines,
      'Código de Débito AutomáticoInstalaçãoVencimentoTotal a pagar'
    )
    const value = lines[referenceLineIndex + 1]?.slice(22)?.split('R$')[0]
    return dayjs(value).toISOString()
  }
}

const parse_data_de_emissao = {
  key: 'data_de_emissao',
  identifier: (txt: string) => txt.includes('Data de emissão: '),
  extractor: (txt: string) => {
    const lines = txt.split('\n')
    const referenceLineIndex = getReferenceLineIndex(lines, 'Data de emissão: ')
    const value = lines[referenceLineIndex].split(':')[1].trim()
    const [day, month, year] = value.split('/')
    return dayjs(`${month}/${day}/${year}`).toISOString()
  }
}

const parse_data_de_referencia = {
  key: 'data_de_referencia',
  identifier: (txt: string) => txt.includes(' Referente a '),
  extractor: (txt: string) => {
    const lines = txt.split('\n')
    const referenceLineIndex = getReferenceLineIndex(lines, ' Referente a ')
    const [rawValue] = extractColumns(lines[referenceLineIndex + 1], [0])
    const value = rawValue && remapReferenceDateToISOString(rawValue)
    return value || null
  }
}

/* TODO create specific table on database to store this kind of data ? */
const parse_historico_de_consumo = {
  key: 'historico_de_consumo',
  identifier: (txt: string) => txt.includes('Histórico de Consumo'),
  extractor: (txt: string) => {
    const lines = txt.split('\n')

    const referenceLineIndexStart = getReferenceLineIndex(lines, 'Histórico de Consumo')
    const referenceLineIndexEnd = getReferenceLineIndex(lines, 'Reservado ao Fisco')
    const historicLines = lines.slice(referenceLineIndexStart + 2, referenceLineIndexEnd)

    const historic: ConsumptionHistoric = {}

    for (const line of historicLines) {
      const regex = /(\w{3})\/(\d{2})\s+(\d+)\s+([\d,]+)\s+(\d+)\s*/
      const matches = line.match(regex)

      if (!matches || matches?.length !== 6) {
        continue
      }

      const month = matches[1]
      const year = matches[2]
      const consumption = Number.parseInt(matches[3], 10)
      const avgKwhPerDay = Number.parseFloat(matches[4].replace(',', '.'))
      const days = Number.parseInt(matches[5], 10)

      if (!historic[year]) {
        historic[year] = {}
      }

      historic[year][month] = {
        days,
        consumption,
        kwhPerDay: avgKwhPerDay
      }
    }

    return JSON.stringify(historic)
  }
}

export class LumiPdfParser {
  private parsers: Parser[]

  constructor() {
    this.parsers = [
      parse_numero_do_cliente,
      parse_numero_da_instalacao,
      parse_energia_eletrica_kwh,
      parse_energia_eletrica_valor,
      parse_energia_sceee_sem_icms_kwh,
      parse_energia_sceee_sem_icms_valor,
      parse_energia_compensada_gd_kwh,
      parse_energia_compensada_gd_valor,
      parse_contrib_ilum_publica_municipal,
      parse_url_chave_acesso,
      parse_chave_de_acesso,
      parse_valor,
      parse_data_de_vencimento,
      parse_data_de_emissao,
      parse_data_de_referencia,
      parse_historico_de_consumo
    ]
  }

  public parse(input: string): LumiPdfParserOutput {
    const results = ParsingEngine(input, this.parsers)
    return this.toObject(results)
  }

  private toObject(parserResults: ParserResult[]): LumiPdfParserOutput {
    return parserResults.reduce(
      (obj, item: ParserResult) => Object.assign(obj, { [item.key]: item.data }),
      {}
    ) as LumiPdfParserOutput
  }
}

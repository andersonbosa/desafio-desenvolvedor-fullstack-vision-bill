import { z } from 'zod'

export const CreateFaturaSchema = z.object({
  numero_do_cliente: z.string(),
  numero_da_instalacao: z.string(),
  energia_eletrica_kwh: z.number(),
  energia_eletrica_valor: z.number(),
  energia_sceee_sem_icms_kwh: z.number(),
  energia_sceee_sem_icms_valor: z.number(),
  energia_compensada_gd_kwh: z.number(),
  energia_compensada_gd_valor: z.number(),
  contrib_ilum_publica_municipal: z.number(),
  url_chave_acesso: z.string(),
  chave_de_acesso: z.string(),
  historico_de_consumo: z.string(),
  valor_boleto: z.number(),
  data_de_referencia: z.string(),
  data_de_vencimento: z.string(),
  data_de_emissao: z.string(),
  file_fingerprint: z.string()
})

export const UpdateFaturaSchema = z.object({
  numero_do_cliente: z.string().optional(),
  numero_da_instalacao: z.string().optional(),
  energia_eletrica_kwh: z.number().optional(),
  energia_eletrica_valor: z.number().optional(),
  energia_sceee_sem_icms_kwh: z.number().optional(),
  energia_sceee_sem_icms_valor: z.number().optional(),
  energia_compensada_gd_kwh: z.number().optional(),
  energia_compensada_gd_valor: z.number().optional(),
  contrib_ilum_publica_municipal: z.number().optional(),
  url_chave_acesso: z.string().optional(),
  chave_de_acesso: z.string().optional(),
  historico_de_consumo: z.string().optional(),
  valor_boleto: z.number(),
  data_de_referencia: z.string(),
  data_de_vencimento: z.string(),
  data_de_emissao: z.string(),
  file_fingerprint: z.string().optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional()
})

export const FindAllSchema = z.object({
  searchTerm: z.string().optional(),
  page: z.number(),
  pageSize: z.number()
})

export type CreateFaturaDTO = z.infer<typeof CreateFaturaSchema>
export type UpdateFaturaDTO = z.infer<typeof UpdateFaturaSchema>
export type FindAllDTO = z.infer<typeof FindAllSchema>

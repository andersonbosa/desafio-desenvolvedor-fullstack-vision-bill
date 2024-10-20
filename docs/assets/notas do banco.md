# notas sobre banco de dados

#### dados obrigatorios

numero_do_client: string
numero_da_instalacao: string
mes_referencia: data
valor: bigint
data_devencimento: data
data_de_emissao: data

#### dados relevantes

energia_eletrica_kwh: bigint
energia_eletrica_valor: bigint
energia_sceee_sem_icms_kwh: bigint
energia_sceee_sem_icms_valor: bigint
energia_compensada_gd_kwh: bigint
energia_compensada_gd_valor: bigint
contrib_ilum_publica_municipal: bigint
url_chave_acesso: string
chave_de_acesso: string
historico_de_consumo: JSON
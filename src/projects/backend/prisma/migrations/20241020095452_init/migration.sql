-- CreateTable
CREATE TABLE "Fatura" (
    "id" TEXT NOT NULL,
    "file_fingerprint" TEXT NOT NULL,
    "numero_do_cliente" TEXT NOT NULL,
    "numero_da_instalacao" TEXT NOT NULL,
    "energia_eletrica_kwh" BIGINT NOT NULL,
    "energia_eletrica_valor" BIGINT NOT NULL,
    "energia_sceee_sem_icms_kwh" BIGINT NOT NULL,
    "energia_sceee_sem_icms_valor" BIGINT NOT NULL,
    "energia_compensada_gd_kwh" BIGINT NOT NULL,
    "energia_compensada_gd_valor" BIGINT NOT NULL,
    "contrib_ilum_publica_municipal" BIGINT NOT NULL,
    "url_chave_acesso" TEXT NOT NULL,
    "chave_de_acesso" TEXT NOT NULL,
    "historico_de_consumo" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Fatura_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Fatura_file_fingerprint_key" ON "Fatura"("file_fingerprint");

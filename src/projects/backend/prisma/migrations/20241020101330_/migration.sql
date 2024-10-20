-- AlterTable
ALTER TABLE "Fatura" ALTER COLUMN "energia_eletrica_kwh" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "energia_eletrica_valor" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "energia_sceee_sem_icms_kwh" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "energia_sceee_sem_icms_valor" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "energia_compensada_gd_kwh" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "energia_compensada_gd_valor" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "contrib_ilum_publica_municipal" SET DATA TYPE DOUBLE PRECISION;

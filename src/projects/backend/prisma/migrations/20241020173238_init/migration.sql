/*
  Warnings:

  - Added the required column `data_de_emissao` to the `Fatura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_de_referencia` to the `Fatura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_de_vencimento` to the `Fatura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_boleto` to the `Fatura` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fatura" ADD COLUMN     "data_de_emissao" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "data_de_referencia" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "data_de_vencimento" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "valor_boleto" DOUBLE PRECISION NOT NULL;

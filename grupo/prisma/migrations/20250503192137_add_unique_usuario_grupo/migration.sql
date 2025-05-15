/*
  Warnings:

  - You are about to drop the column `usuario_uuid` on the `grupo_usuarios` table. All the data in the column will be lost.
  - Added the required column `usuario_uuid_fk` to the `grupo_usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_grupo_usuarios" (
    "usuario_grupo_uuid" TEXT NOT NULL PRIMARY KEY,
    "usuario_uuid_fk" TEXT NOT NULL,
    "grupo_uuid_fk" TEXT NOT NULL,
    CONSTRAINT "grupo_usuarios_grupo_uuid_fk_fkey" FOREIGN KEY ("grupo_uuid_fk") REFERENCES "grupos" ("grupo_uuid") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_grupo_usuarios" ("grupo_uuid_fk", "usuario_grupo_uuid") SELECT "grupo_uuid_fk", "usuario_grupo_uuid" FROM "grupo_usuarios";
DROP TABLE "grupo_usuarios";
ALTER TABLE "new_grupo_usuarios" RENAME TO "grupo_usuarios";
CREATE UNIQUE INDEX "grupo_usuarios_usuario_uuid_fk_grupo_uuid_fk_key" ON "grupo_usuarios"("usuario_uuid_fk", "grupo_uuid_fk");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

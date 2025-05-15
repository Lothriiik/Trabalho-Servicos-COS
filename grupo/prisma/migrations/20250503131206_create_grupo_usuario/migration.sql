-- CreateTable
CREATE TABLE "grupo_usuarios" (
    "usuario_grupo_uuid" TEXT NOT NULL PRIMARY KEY,
    "usuario_uuid" TEXT NOT NULL,
    "grupo_uuid_fk" TEXT NOT NULL,
    CONSTRAINT "grupo_usuarios_grupo_uuid_fk_fkey" FOREIGN KEY ("grupo_uuid_fk") REFERENCES "grupos" ("grupo_uuid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "grupos" (
    "grupo_uuid" TEXT NOT NULL PRIMARY KEY,
    "grupo_titulo" TEXT NOT NULL,
    "grupo_descricao" TEXT NOT NULL,
    "usuario_uuid_fk" TEXT NOT NULL
);

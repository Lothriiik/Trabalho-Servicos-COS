import createPrivateAPI from './createPrivateAPI';
import createPublicAPI from './createPublicAPI';

const API = createPrivateAPI ('http://localhost:8000');
const APIPublic = createPublicAPI ('http://localhost:8000');
const APIUnion = createPrivateAPI ('http://localhost:8080');


///Grupo + Usuario
export const obterGrupo = (uuid) => APIUnion.get(`/grupo/${uuid}`);

///Grupos
export const criarGrupo = (data) => API.post('/grupo/grupos', data);
export const deletarGrupo = (uuid) => API.delete(`/grupo/grupos/${uuid}`);
export const entrarGrupo = (uuid) =>
  API.post(`/grupo/grupos/entrar/${uuid}`, {
    grupo_uuid_fk: uuid,
  });
export const sairGrupo = (uuid) => API.delete(`/grupo/grupos/sair/${uuid}`, {
  data: {
    grupo_uuid_fk: uuid,
  }
});
export const listarGruposDisponiveis = () => API.get('/grupo/grupos/listar/disponiveis');
export const listarMeusGrupos = () => API.get('/grupo/grupos/listar/meu');
export const listarGruposInscrito = () => API.get('/grupo/grupos/listar/inscrito');

///Usuarios
export const criarUsuario = (data) => APIPublic.post('/usuario/usuario', data);
export const obterUsuario = () => API.get('/usuario/usuario');
export const deletarUsuario = () => API.delete('/usuario/usuario');
export const logarUsuario = (data) => APIPublic.post('/usuario/logar', data);
export const listarUsuarios = () => API.post('/usuario/usuarios/listar');
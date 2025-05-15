import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { useNavigate } from 'react-router-dom';
import { 
  Divider
} from 'antd';
import { 
  HomeOutlined,
  SearchOutlined,
  UserOutlined

} from '@ant-design/icons';
import { listarMeusGrupos, listarGruposInscrito } from '../api/apiMain';


function Sidebar() {
  const [userGroups, setUserGroups] = useState([]);
  const navigate = useNavigate();
  
  
  const handleCreategroup = () => {
    navigate('/home/create-group');
  };
  const handleInicio =  () => {
    navigate('/home');
  };
  const handleExplorar =  () => {
    navigate('/home/search');
  };
  const handlePerfil =  () => {
    navigate('/home/user');
  };

  const handleGrupo= ( grupo ) => {
    navigate(`/home/group/${grupo}`);
    
  }



  useEffect(() => {

    const fetchGroup = async () => {
          try {
            const responseDonos = await listarMeusGrupos();     
            const responseParticipando = await listarGruposInscrito();
    
            const meusGrupos = responseDonos.data.map((group) => ({
              id: group.grupo_uuid,
              name: group.grupo_titulo,
              description: group.grupo_descricao,
              owner: true,
            }));
    
            const gruposInscrito = responseParticipando.data.map((group) => ({
              id: group.grupo_uuid,
              name: group.grupo_titulo,
              description: group.grupo_descricao,
              owner: false,
            }));
    
            const todosGrupos = [...meusGrupos, ...gruposInscrito];
            setUserGroups(todosGrupos);
          } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error);
          }
          };

    fetchGroup();
   }, []);
  


  return (
    <div className="sidebar">
      <nav className="main-nav">
        <ul>
          <li className="nav-item active">
            <a onClick={handleInicio}>
              <HomeOutlined className='icon'/>
              <span className="label">Início</span>
            </a>
          </li>
          <li className="nav-item">
            <a onClick={handleExplorar}>
              <SearchOutlined className='icon'/>
              <span className="label">Explorar</span>
            </a>
          </li>
          <li className="nav-item">
            <a onClick={handlePerfil}>
              <UserOutlined className='icon'/>
              <span className="label">Perfil</span>
            </a>
          </li>
        </ul>
      </nav>

      <div className="groups-section">
        <h2>Seus Grupos</h2>
        <button className="create-group-btn-sidebar" onClick={handleCreategroup}>+ Criar Grupo</button>
        <ul className="groups-list">
        {userGroups.map((group) => (
          <div key={group.id} >
        
            <li key={group.id} className="group-item" onClick={() => handleGrupo(group.id)}>
              <span className="group-name">{group.name}</span>
            </li>
            <Divider style={{margin:1, backgroundColor: 'white'}}/>
          </div>
        ))}
        </ul>
        
      </div>
      <div className="sidebar-footer">
        <button className="post-btn">Postar</button>
      </div>

      
    </div>
  );
}

export default Sidebar;
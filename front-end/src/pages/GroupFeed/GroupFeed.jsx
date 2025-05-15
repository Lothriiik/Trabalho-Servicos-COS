import React, { useState, useEffect } from 'react';
import './GroupFeed.css';
import Post from '../../components/Post';
import { useParams } from 'react-router-dom';
import {obterGrupo} from '../../api/apiMain';
import { Menu, Dropdown, Button } from 'antd';
import { useNavigate } from 'react-router-dom';


function GroupFeed() {
  const [newPostText, setNewPostText] = useState('');
  const { groupId } = useParams();
  const [group, setGroup] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Grupo selecionado:", groupId);

    const fetchGroup = async () => {
          try {
            const response = await obterGrupo(groupId);
            const data = response.data.grupo;
            console.log(data)
            const formattedGroup = {
              id: data.grupo_uuid,
              name: data.grupo_titulo,
              description: data.grupo_descricao,
              users: data.usuarios || [] 
          };
          setGroup(formattedGroup)
          } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error);
          }
          };
    fetchGroup();
  }, [groupId]);



  const currentGroup = group;

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'João Silva',
      authorUsername: '@joaosilva',
      content: 'Acabei de conhecer uma nova tecnologia incrível! Alguém já ouviu falar sobre React Native?',
      timestamp: '2h atrás',
      likes: 24,
      dislike:1,
      comments: 5,
    },
    {
      id: 2,
      author: 'Maria Oliveira',
      authorUsername: '@mariaoliveira',
      content: 'Compartilhando esse artigo interessante sobre desenvolvimento web em 2023. Vale a pena conferir!',
      timestamp: '4h atrás',
      likes: 18,
      dislike:1,
      comments: 2,
    },
    {
      id: 3,
      author: 'Pedro Santos',
      authorUsername: '@pedrosantos',
      content: 'Estou organizando um meetup sobre desenvolvimento front-end no próximo mês. Quem tiver interesse, deixe um comentário!',
      timestamp: '1d atrás',
      likes: 42,
      dislike:1,
      comments: 15,
    }
  ]);

  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost = {
      id: Date.now(),
      author: 'Usuário',
      authorUsername: '@usuario',
      content: newPostText,
      timestamp: 'agora',
      likes: 0,
      dislike:0,
      comments: 0,
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
  };

  const menu = (
    <Menu>
      <Menu.Item key="members" onClick={() => navigate(`/home/group/${groupId}/members`)}>
        Membros
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="group-feed">
      <div className="group-header">
        <div className="group-header-info">
          <h1>{currentGroup.name}</h1>
          <span className="group-members-feed">{currentGroup.members} </span>
          <p className="group-description">{currentGroup.description}</p>
        </div>
        <div className="group-actions">
          <button className="join-group">Participar</button>
          <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
              <Button className="group-menu">•••</Button>
          </Dropdown>
        </div>
      </div>

      <div className="post-composer">
        <form onSubmit={handleSubmitPost}>
          <textarea
            placeholder={`Compartilhe algo com o grupo ${currentGroup.name}...`}
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
          ></textarea>
          <div className="composer-actions">
            <div className="composer-tools">

            </div>
            <button 
              type="submit" 
              className="post-button"
              disabled={!newPostText.trim()}
            >
              Publicar
            </button>
          </div>
        </form>
      </div>

      <div className="posts-container">
        {posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default GroupFeed;
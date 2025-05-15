import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Avatar, 
  Tabs, 
  Button, 
  Typography, 
  Space, 
  Divider, 
  List, 
  Skeleton, 
  message,
  Modal
} from 'antd';
import { 
  DeleteOutlined,
  EnvironmentOutlined, 
  LinkOutlined, 
  PlusOutlined,
  CrownOutlined

} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Post from '../../components/Post';
import { obterUsuario, listarMeusGrupos, listarGruposInscrito, deletarGrupo, deletarUsuario } from '../../api/apiMain';
import DeleteModal  from '../../components/DeleteModal';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;


const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userPosts, setUserPosts] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteUserVisible, setDeleteUserVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState([]);
  const navigate = useNavigate();

  const handleDeleteClick = (id) => {
    setSelectedGroup(id);
    setDeleteModalVisible(true);
  };

const handleDeleteConfirm = async () => {
  try {
    await deletarGrupo(selectedGroup);
    setUserGroups(prev => prev.filter(g => g.id !== selectedGroup));
  } catch (error) {
    message.error('Erro ao excluir o item.');
  } finally {
    setDeleteModalVisible(false);
  }
};
  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
  };

  const handleUserDeleteClick = () => {

    setDeleteUserVisible(true);
  };

const handleUserDeleteConfirm = async () => {
  try {
    await deletarUsuario();
    navigate('/login');
  } catch (error) {
    message.error('Erro ao excluir o item.');
  } finally {
    setDeleteUserVisible(false);
  }
};
  const handleUserDeleteCancel = () => {
    setDeleteUserVisible(false);
  };


  useEffect(() => {

    const timer = setTimeout(() => {

      const fetchUser = async () => {
      try {
        const response = await obterUsuario();
        const data = response.data;
        const formattedUser = {
            id: data.usuario_uuid,
            username: data.usuario_username,
            displayName: data.usuario_nome,
          };

          setUser(formattedUser);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
      };

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

    fetchUser();
    fetchGroup();

      const mockUser = {
        id: 1,
        username: 'johndoe',
        displayName: 'John Doe',
      };

      const mockPosts = [
        {
          id: 1,
          content: "Just released a new version of my React library! Check it out #ReactJS #WebDev",
          createdAt: "2023-11-10T14:30:00",
          user: mockUser,
          likes: 42,
          comments: 12,
          shares: 8,
          liked: false,
          shared: false,
        },
        {
          id: 2,
          content: "Beautiful day for a hike! 🏞️ #Nature #Weekend",
          createdAt: "2023-11-08T10:15:00",
          user: mockUser,
          likes: 67,
          comments: 5,
          shares: 3,
          liked: true,
          shared: false,
        },
        {
          id: 3,
          content: "Thoughts on the latest tech trends? I'm particularly interested in AI advancements.",
          createdAt: "2023-11-05T16:45:00",
          user: mockUser,
          likes: 31,
          comments: 22,
          shares: 4,
          liked: false,
          shared: true,
          images: []
        }
      ];

      setUser(mockUser);
      setUserPosts(mockPosts);
      setIsCurrentUser(mockUser.id === 1);
      
      
      setLoading(false);
    }, 400);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Card>
        <Skeleton avatar active paragraph={{ rows: 4 }} />
      </Card>
    );
  }

  return (
    <div className="user-profile">
      <Card>
        <div style={{ marginTop: -25 }}>
          <div style={{ marginTop: 16 }}>
            <Space direction="horizontal" size={0} style={{display: 'flex', justifyContent: 'space-between'}}>

              <Space  direction="vertical">
                  <Title level={4} style={{ margin: 0 }}>{user.displayName}</Title>
                  <Text type="secondary">@{user.username}</Text>
              </Space>

              <Space>
                {isCurrentUser ? (
                  <Button 
                    danger
                    icon={<DeleteOutlined />} 
                    onClick={() => handleUserDeleteClick()}
                  >
                    Apagar
                  </Button>
                ) : (
                  <>

                  </>
                )}
              </Space>
            </Space>
            
            {user.bio && (
              <Paragraph style={{ marginTop: 16 }}>
                {user.bio}
              </Paragraph>
            )}

            <Space style={{ marginTop: 8 }} wrap>
              {user.location && (
                <Space size={4}>
                  <EnvironmentOutlined />
                  <Text type="secondary">{user.location}</Text>
                </Space>
              )}
              
              {user.website && (
                <Space size={4}>
                  <LinkOutlined />
                  <a href={user.website} target="_blank" rel="noopener noreferrer">
                    {user.website.replace(/^https?:\/\//, '')}
                  </a>
                </Space>
              )}
              
            </Space>
            
            <Divider style={{ margin: '16px 0' }} />

          </div>
        </div>
      </Card>

      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab}
        style={{ marginTop: 16, width:800 }}
      >
        <TabPane tab="Posts" key="posts">
          {userPosts.length > 0 ? (
            <List
              dataSource={userPosts}
              renderItem={post => (
                <List.Item style={{ display: 'block', padding: 0, marginBottom: 16 }}>
                  <Post post={post} />
                </List.Item>
              )}
            />
          ) : (
            <Card>
              <div style={{ textAlign: 'center', padding: 24 }}>
                <Title level={4}>Nenhuma postagem ainda</Title>
                <Paragraph type="secondary">
                  {isCurrentUser 
                    ? "Você ainda não postou nada. Compartilhe sua primeira publicação!" 
                    : "Este usuário ainda não postou nada."}
                </Paragraph>
                {isCurrentUser && (
                  <Button type="primary" icon={<PlusOutlined />}>
                    Criar Post
                  </Button>
                )}
              </div>
            </Card>
          )}
        </TabPane>
            
        <TabPane tab="Likes" key="likes">
          <List
            dataSource={userPosts.filter(post => post.liked)}
            locale={{ emptyText: 'Nenhum post com like ainda' }}
            renderItem={post => (
              <List.Item style={{ display: 'block', padding: 0, marginBottom: 16 }}>
                <Post post={post} />
              </List.Item>
            )}
          />
        </TabPane>
        
        <TabPane tab="Grupos" key="groups">
          <Card style={{width:'800px'}}>
            <List
              dataSource={userGroups}
              renderItem={group => (
                <List.Item
                  actions={[
                    group.owner ? (
                      <Button danger onClick={() => handleDeleteClick(group.id)}>Excluir</Button>
                    ) : (
                      <Button>Sair</Button>
                    )
                  ]}
                >
                  <List.Item.Meta
                    avatar={group.owner && <CrownOutlined />}
                    title={<Space>{group.name}</Space>}
                    description={group.description}
                  />
                </List.Item>
              )}
            />

            <DeleteModal
              visible={deleteModalVisible}
              onCancel={handleDeleteCancel}
              onConfirm={handleDeleteConfirm}
              item="grupo"
            />

            

          </Card>
        </TabPane>
    
      </Tabs>

      <DeleteModal
              visible={deleteUserVisible}
              onCancel={handleUserDeleteCancel}
              onConfirm={handleUserDeleteConfirm}
              item="usuario"
            />
      
    </div>
  );
};

export default UserProfile;
import React, { useState, useEffect } from 'react';
import { Card, List, Avatar, Input, Button, Typography, Tooltip, Divider, Badge, Space } from 'antd';
import { SearchOutlined, UserAddOutlined, UserOutlined} from '@ant-design/icons';
import { useParams } from 'react-router-dom';
const { Title, Text } = Typography;
import {obterGrupo} from '../../api/apiMain';


const GroupMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const { groupId } = useParams();


  useEffect(() => {

    const timer = setTimeout(() => {

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
          setMembers(formattedGroup.users); 
          setLoading(false);
          } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error);
          }
          };

    fetchGroup();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [groupId]);
  
  const filteredMembers = members.filter(
    member => 
      member.usuario_nome.toLowerCase().includes(searchText.toLowerCase()) || 
      member.usuario_username.toLowerCase().includes(searchText.toLowerCase())
  );
  
  
  return (
    <Card 
      title={<Title level={4}>Membros do Grupo</Title>}
      style={{ width: '100%' }}
    >
      <Input
        placeholder="Procurar membros..."
        prefix={<SearchOutlined />}
        value={searchText}
        onChange={e => setSearchText(e.target.value)}
        style={{ marginBottom: 16 }}
      />
      
      <Divider orientation="left">
        <Space>
          Membros ({members.length})
        </Space>
      </Divider>
      
      <List
        loading={loading}
        itemLayout="horizontal"
        dataSource={filteredMembers}
        renderItem={member => (
          <List.Item

          >
            <List.Item.Meta
              avatar={
                  <Avatar icon={<UserOutlined />} />
              }
              title={
                <Space>
                  {member.usuario_nome} 
                  <Text type="secondary">@{member.usuario_username}</Text>
                </Space>
              }
            />
          </List.Item>
        )}
        pagination={{
          pageSize: 5,
          size: "small",
          showSizeChanger: false,
        }}
      />
    </Card>
  );
};

export default GroupMembers;
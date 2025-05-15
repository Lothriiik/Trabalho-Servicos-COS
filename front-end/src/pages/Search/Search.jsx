import React, { useState, useEffect } from 'react';
import {
  Layout,
  Typography,
  Input,
  Tabs,
  List,
  Card,
  Button,
  Empty,
  message,
} from 'antd';
import {
  SearchOutlined,
  TeamOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import './Search.css';
import { listarGruposDisponiveis, entrarGrupo } from '../../api/apiMain';
import SuccessModal from '../../components/SuccessModal';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [searching, setSearching] = useState(false);
  const [allGroups, setAllGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState({ title: '', message: '' });


  useEffect(() => {
    async function fetchGroups() {
      try {
        const response = await listarGruposDisponiveis();
        setAllGroups(response.data);
        setFilteredGroups(response.data);
      } catch (error) {
        console.error('Erro ao buscar grupos:', error);
        message.error('Erro ao buscar grupos');
      }
    }

    fetchGroups();
  }, []);

  const handleSearch = (value) => {
    const searchValue = value.trim().toLowerCase();
    setSearchText(value);

    if (!searchValue) {
      setFilteredGroups(allGroups);
      return;
    }

    setSearching(true);

    setTimeout(() => {
      const filtered = allGroups.filter(group =>
        group.grupo_titulo.toLowerCase().includes(searchValue) ||
        group.grupo_descricao.toLowerCase().includes(searchValue)
      );
      setFilteredGroups(filtered);
      setSearching(false);
    }, 300);
  };

  const handleEntrarGrupo = async (uuid) => {
  try {
    await entrarGrupo(uuid);
    const grupo = allGroups.find(g => g.grupo_uuid === uuid);
    setModalInfo({
      title: 'Participação Confirmada',
      message: `Você entrou no grupo "${grupo?.grupo_titulo}" com sucesso!`,
    });
    setSuccessModalVisible(true);

    const novosGrupos = allGroups.filter(g => g.grupo_uuid !== uuid);
    setAllGroups(novosGrupos);
    setFilteredGroups(novosGrupos.filter(group =>
      group.grupo_titulo.toLowerCase().includes(searchText.trim().toLowerCase()) ||
      group.grupo_descricao.toLowerCase().includes(searchText.trim().toLowerCase())
    ));
  } catch (error) {
    console.error('Erro ao entrar no grupo:', error);
    message.error('Erro ao entrar no grupo');
  }
};

  return (
    <Layout style={{ padding: '20px', background: '#fff' }}>
      <Title level={2}><SearchOutlined /> Pesquisar</Title>

      <Input.Search
        placeholder="Buscar por grupos..."
        allowClear
        enterButton="Pesquisar"
        size="large"
        value={searchText}
        onChange={e => handleSearch(e.target.value)}
        onSearch={handleSearch}
        loading={searching}
        style={{ marginBottom: 24 }}
      />

      {searchText && (
        <div style={{ marginBottom: 16 }}>
          <Text>
            {filteredGroups.length} resultado(s) para "{searchText}"
          </Text>
        </div>
      )}

      <Tabs defaultActiveKey="groups">
        <TabPane tab={<><TeamOutlined /> Grupos</>} key="groups">
          {filteredGroups.length === 0 ? (
            <Empty description={searchText ? "Nenhum grupo encontrado" : "Digite algo para pesquisar"} />
          ) : (
            <List
              grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 3 }}
              dataSource={filteredGroups}
              renderItem={item => (
                <List.Item>
                  <Card
                    style={{ width: '350px' }}
                    actions={[
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => handleEntrarGrupo(item.grupo_uuid)}
                      >
                        Participar
                      </Button>
                    ]}
                  >
                    <Card.Meta
                      title={
                        <a className='titlecard' href={`/home/group/${item.grupo_uuid}`}>
                          {item.grupo_titulo}
                        </a>
                      }
                      description={
                        <Text className='descriptioncard' type="secondary">
                          {item.grupo_descricao}
                        </Text>
                      }
                    />
                  </Card>
                </List.Item>
              )}
            />
          )}
        </TabPane>
      </Tabs>
      <SuccessModal
        visible={successModalVisible}
        onClose={() => setSuccessModalVisible(false)}
        title={modalInfo.title}
        message={modalInfo.message}
      />

    </Layout>
  );
};

export default Search;

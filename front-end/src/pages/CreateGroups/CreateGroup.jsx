import React, { useState } from 'react';
import { 
  Layout, 
  Typography, 
  Form, 
  Input, 
  Button, 
  Row, 
  message, 
  Card, 
} from 'antd';
import { UsergroupAddOutlined } from '@ant-design/icons';
import { criarGrupo } from '../../api/apiMain'; 
import SuccessModal from '../../components/SuccessModal';   

const { Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;

const CreateGroup = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);

    const payload = {
      grupo_titulo: values.grupo_titulo,
      grupo_descricao: values.grupo_descricao,
    };

    try {
      await criarGrupo(payload);
      setModalVisible(true);
      form.resetFields();
    } catch (error) {
      console.error('Erro ao criar grupo:', error);
      message.error('Erro ao criar grupo');
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <Content>
      <Row justify="center">
        <Card style={{ marginBottom: 20, width: 1000 }}>
          <Title level={2} style={{ textAlign: 'center' }}>
            Criar um Novo Grupo
          </Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{}}
          >
            <Form.Item
              label="Nome do Grupo"
              name="grupo_titulo"
              rules={[{ required: true, message: 'Por favor digite o nome do grupo' }]}
            >
              <Input
                prefix={<UsergroupAddOutlined />}
                placeholder="Digite o nome do Grupo"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Descrição do Grupo"
              name="grupo_descricao"
              rules={[{ required: true, message: 'Por favor digite a descrição do grupo' }]}
            >
              <TextArea
                placeholder="Sobre que é o grupo?"
                rows={4}
                showCount
                maxLength={500}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={loading}
              >
                Criar Grupo
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Row>


      <SuccessModal
        visible={modalVisible}
        onClose={handleModalClose}
        title="Sucesso!"
        message="Grupo criado com sucesso!"
      />
    </Content>
  );
};

export default CreateGroup;

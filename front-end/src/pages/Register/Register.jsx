import React, { useState } from 'react';
import { Layout, Typography, Form, Input, Button, Divider, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import { criarUsuario } from '../../api/apiMain';
import  SuccessModal  from '../../components/SuccessModal'; 

const { Title, Text } = Typography;
const { Password } = Input;

const RegisterPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);

    const userData = {
      usuario_nome: values.nomeCompleto,
      usuario_username: values.nomeusuario,
      usuario_senha: values.senha,
    };

    try {
      await criarUsuario(userData);
      form.resetFields();
      setSuccessVisible(true);
    } catch (error) {
      const errorMsg = error?.response?.data?.detail || 'Erro ao cadastrar. Verifique os dados.';
      message.error(errorMsg);
      console.error('Erro ao cadastrar:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setSuccessVisible(false);
    navigate('/login'); // redireciona após fechar o modal
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2}>Criar sua conta</Title>
        </div>

        <Form form={form} layout="vertical" onFinish={handleSubmit} scrollToFirstError>
          <Form.Item
            name="nomeCompleto"
            label="Nome Completo"
            rules={[{ required: true, message: 'Escreva seu nome completo ' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nome Completo" style={{ height: '40px' }} />
          </Form.Item>

          <Form.Item
            name="nomeusuario"
            label="Nome de Usuario"
            rules={[
              { required: true, message: 'Escreva seu nome de usuario' },
              { min: 3, message: 'Nome de usuario precisa de ao menos 3 caracteres' },
              { pattern: /^[a-zA-Z0-9_]+$/, message: 'Nome de usuario só pode conter letras, números e underline' },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nome de Usuario" style={{ height: '40px' }} />
          </Form.Item>

          <Form.Item
            name="senha"
            label="Senha"
            rules={[
              { required: true, message: 'Escreva sua senha' },
              { min: 8, message: 'Senha precisa de ao menos 8 caracteres' },
            ]}
          >
            <Password
              prefix={<LockOutlined />}
              placeholder="Senha"
              visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
              style={{ height: '40px' }}
            />
          </Form.Item>

          <Form.Item
            name="confirmarsenha"
            label="Confirmar Senha"
            dependencies={['senha']}
            rules={[
              { required: true, message: 'Por favor confirme sua senha' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('senha') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('As senhas não correspondem'));
                },
              }),
            ]}
          >
            <Password
              prefix={<LockOutlined />}
              placeholder="Confirmar Senha"
              visibilityToggle={{ visible: confirmPasswordVisible, onVisibleChange: setConfirmPasswordVisible }}
              style={{ height: '40px' }}
            />
          </Form.Item>

          <Divider />

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large" loading={loading}>
              Criar Conta
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center' }}>
            <Text>
              Já tem uma conta? <Link to="/login">Fazer Login</Link>
            </Text>
          </div>
        </Form>
      </div>

      <SuccessModal
        visible={successVisible}
        onClose={handleSuccessClose}
        title="Cadastro realizado com sucesso!"
        message="Agora você será redirecionado para a página de login."
      />
    </div>
  );
};

export default RegisterPage;

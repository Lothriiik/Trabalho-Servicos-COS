import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/brasao-ufal.png'
import { logarUsuario } from '../../api/apiMain';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

import { 

  Form, 
  Input, 
  Button, 
  message, 

} from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 

} from '@ant-design/icons';

const { Password } = Input;


function Login() {
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
  setLoading(true);

  try {
      const loginData = {
        usuario_username: values.nomeusuario,
        usuario_senha: values.senha,
      };

      const response = await logarUsuario(loginData);
      const { access_token } = response.data;
      const decoded = jwtDecode(access_token);
      localStorage.setItem('token', access_token); 
      localStorage.setItem('username', decoded.usuario_username);
      form.resetFields();

      navigate('/home/');
    } catch (error) {
      console.error('Erro ao logar:', error);
      message.error('Usuário ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img className='logoicon' src={logo} alt='Logo'></img>
          <p>Conecte-se com seus grupos favoritos</p>
        </div>
        
        <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    scrollToFirstError
                >
          <Form.Item
            name="nomeusuario"
            label="Nome de Usuario"
            rules={[
                { required: true, message: 'Escreva seu nome de usuario' },
                { min: 3, message: 'Usuario precisa de ao menos 3 caracteres' },
                { pattern: /^[a-zA-Z0-9_]+$/, message: 'Usuario so pode conter letras, números e underline' }
            ]}
            >
            <Input prefix={<UserOutlined />} placeholder="Nome de Usuario" style={{height:'40px'}} />
          </Form.Item>
          
          <Form.Item
            name="senha"
            label="Senha"
            rules={[
                { required: true, message: 'Escreva sua senha' },
                { min: 8, message: 'Senha precisa de ao menos 3 caracteres' }
            ]}
            >
            <Password
                prefix={<LockOutlined />}
                placeholder="Senha"
                visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
                style={{height:'40px'}}
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
                                  Entrar
                              </Button>
                              </Form.Item>
        </Form>
        
        <div className="register-link">
          <p>
            Não tem uma conta? <a href="/registrar">Registre-se</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
// src/components/Home.jsx
import React, {useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import logo from '../../assets/brasao-ufal.png';
import './styles.css';

import Sidebar from '../../components/Sidebar';


const { Content } = Layout;

const Home = ({children}) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    
    if (storedUsername) {
      setUsername(storedUsername);
    }

  }, []);
  return (
    <Layout style={{ Minheight: '100vh', width: '100vw' }}>
      <Content style={{ overflow: 'initial' }}>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <div className="home-container">
              <header className="main-header">
                <div className="logo">
                  <img className="logoicon" src={logo} alt="Logo" />
                </div>
                <div className="user-profile">
                  <span className="username">{username || 'Usuário'}</span>
                </div>
              </header>

              <div className="main-content">
                <Sidebar />

                <main className="feed-container">
                  {children}
                </main>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Home;

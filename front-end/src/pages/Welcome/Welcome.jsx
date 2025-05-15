import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

function Welcome() {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/home/create-group');
  };

  return (

          <div className="welcome-screen">
            <h2>Bem-vindo!</h2>
            <p>Selecione um grupo para ver postagens ou crie um novo.</p>
            <button onClick={handleClick} className="create-group-btn-welcome">Criar Grupo</button>
          </div>

  );
}

export default Welcome;
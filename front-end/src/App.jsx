import React from 'react';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';
import './App.css';
import AppRoutes from './routes/AppRoutes';

const theme = {
  token: {
    colorPrimary: '#1DA1F2',
    borderRadius: 6,
    fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  components: {
    Button: {
      borderRadius: 20,
    },
    Card: {
      borderRadiusLG: 12,
    },
    Avatar: {
      borderRadius: 50,
    },
  },
};

function App() {
  return (
    <ConfigProvider theme={theme} locale={ptBR}>
        <AppRoutes />
    </ConfigProvider>
  );
}

export default App;
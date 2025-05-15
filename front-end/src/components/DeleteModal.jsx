import React from 'react';
import { Modal, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const DeleteModal = ({ visible, onCancel, onConfirm, item }) => (
  <Modal
    title={
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ExclamationCircleOutlined style={{ color: '#ff4d4f', marginRight: 8 }} />
        Confirmar exclusão
      </div>
    }
    open={visible}
    onCancel={onCancel}
    footer={[
      <Button key="cancel" onClick={onCancel}>
        Cancelar
      </Button>,
      <Button key="delete" danger type="primary" onClick={onConfirm}>
        Excluir
      </Button>,
    ]}
  >
    <p>Tem certeza que deseja excluir este {item || 'item'}?</p>
    <p>Esta ação não poderá ser desfeita.</p>
  </Modal>
);

export default DeleteModal;

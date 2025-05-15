// SuccessModal.jsx
import React from 'react';
import { Modal } from 'antd';

const SuccessModal = ({ visible, onClose, title, message }) => {
  return (
    <Modal
      open={visible}
      onOk={onClose}
      onCancel={onClose}
      title={title}
      okText="OK"
      cancelButtonProps={{ style: { display: 'none' } }}
      centered
    >
      <p>{message}</p>
    </Modal>
  );
};

export default SuccessModal;

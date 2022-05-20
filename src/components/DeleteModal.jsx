import { Modal } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const DeleteModal = () => {
  const { visible, setVisible, type, name } = props;
  const navigate = useNavigate();
  const closeModal = () => {
    setVisible(false);
  };
  return (
    <>
      <Modal
        closeIcon={<></>}
        visible={visible}
        footer={false}
        onCancel={closeModal}
      >
        <h2 className="text-2xl">Delete {type}</h2>
        <p>
          <span className=" text-semibold">
            You are about to permanently delete the{" "}
          </span>
          {type} <span className="text-brand">{name}</span>
        </p>
      </Modal>
    </>
  );
};

export default DeleteModal;

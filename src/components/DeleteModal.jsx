import { Button, Checkbox, Modal } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeleteModal = (props) => {
  const { visible, setVisible, type, name, onOk } = props;
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const closeModal = () => {
    setVisible(false);
  };
  return (
    <>
      <Modal
        className="delete-modal"
        closeIcon={<></>}
        visible={visible}
        footer={false}
        onFinish={onOk}
        onCancel={closeModal}
      >
        <h2 className="text-2xl">Delete {type}</h2>
        <p className="mb-1">
          <span className=" text-semibold">
            You are about to permanently delete the{" "}
          </span>
          {type} <span className="text-brand">{name}</span>
        </p>
        <Checkbox
          checked={checked}
          onChange={() => {
            setChecked((prev) => !prev);
          }}
        >
          <span>
            I am ware that <span className="font-semibold">I can't undo </span>
            this
          </span>
        </Checkbox>
        {type.toLowerCase() === "sublist" && <></>}
        <div className="flex mt-3 items-center justify-end gap-3">
          <Button
            disabled={!checked}
            htmlType="submit"
            className=" danger-btn-pdsm"
            onClick={onOk}
          >
            Delete
          </Button>
          <Button
            onClick={closeModal}
            htmlType="cancel"
            className="default-btn-unfilled"
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModal;

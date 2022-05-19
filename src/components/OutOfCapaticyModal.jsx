import { Button, Modal } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const OutOfCapaticyModal = (props) => {
  const { visible, setVisible, type } = props;
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
        <h2 className="text-2xl">Ooops..! We're sorry.</h2>
        <p className="mt-3 text-secondary">
          We are using firestore for database for this app. And so we have some
          limitations. Currently, you can't create more than{" "}
          <span className=" text-danger">3 {type}</span> because we don't have
          enough flexibility.
        </p>
        <div className="flex items-center justify-end gap-3">
          <Button
            onClick={() => {
              navigate(-1);
            }}
            htmlType="submit"
            className=" danger-btn-pdsm"
          >
            Go Back
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

export default OutOfCapaticyModal;

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
          You have crossed the quota limitations of creating
          <span className=" text-danger"> {type}</span>. To know more about it,
          please contact us. We will look forward to this.
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

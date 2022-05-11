import { Button } from "antd";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetGlobalLoading } from "../../actions";
import { db } from "../../firebase/firebase";
import { generateId } from "../../functions/idGenerator";

const CreateOrganization = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isGlobalLoading = useSelector((state) => {
    return state.isGlobalLoading;
  });
  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name !== "") {
      dispatch(SetGlobalLoading(true));
      setDoc(
        doc(db, "organizations", generateId(name), {
          org_name: name,
          org_id: generateId(name),
          projects: [],
        })
      );
    }
  };
  return (
    <div className=" flex h-screen justify-center flex-col px-32 w-full">
      <h1 className="text-4xl">Create Organization</h1>
      <form onSubmit={handleSubmit} className="mt-16 w-full">
        <div className="label-inp w-full">
          <input
            className="w-full"
            value={name}
            onChange={handleChange}
            required
            id="name"
            name="name"
            type="text"
          />
          <label htmlFor="email">Organization Name</label>
        </div>
        <div className="button-wrapper w-full justify-end flex gap-5">
          <Button htmlType="submit" className=" primary-btn-unfilled">
            Create
          </Button>
          <Button
            onClick={() => {
              navigate(-1);
            }}
            htmlType="cancel"
            className="default-btn-unfilled"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateOrganization;

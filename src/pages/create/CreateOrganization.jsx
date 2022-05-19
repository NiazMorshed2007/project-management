import { Button } from "antd";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebase";
import { generateId } from "../../functions/idGenerator";
import { generateLogoText } from "../../functions/LogoText";
import { SetGlobalLoading } from "../../actions/index";
import { getTime } from "../../functions/Time";
import OutOfCapaticyModal from "../../components/OutOfCapaticyModal";

const CreateOrganization = () => {
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => {
    return state.userProfile;
  });
  const handleChange = (e) => {
    setName(e.target.value);
    console.log(name);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name !== "") {
      if (userProfile.organizations.length > 2) {
        setVisible(true);
      } else {
        dispatch(SetGlobalLoading(true));
        const org_data = {
          org_name: name,
          org_id: generateId(name),
          org_logoText: generateLogoText(name),
          owner_id: userProfile.uid,
        };
        await addDoc(collection(db, "organizations"), {
          ...org_data,
          createdOn: getTime("m/d/y"),
          org_avatar: null,
          projects: [],
        });
        await updateDoc(doc(db, "users", userProfile.uid), {
          organizations: arrayUnion({
            ...org_data,
          }),
        });
        navigate(`/w/o/overview?orgId=${org_data.org_id}`);
        dispatch(SetGlobalLoading(false));
      }
    }
  };
  return (
    <>
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
      <OutOfCapaticyModal
        type={"organizations"}
        visible={visible}
        setVisible={setVisible}
      />
    </>
  );
};

export default CreateOrganization;

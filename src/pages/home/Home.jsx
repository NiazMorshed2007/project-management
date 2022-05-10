import React from "react";
import Layout from "../../layout/Layout";
import HeaderHome from "./HeaderHome";

const Home = () => {
  return (
    <Layout>
      <HeaderHome />
      <div className="p-7">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore,
        accusantium! Totam, deserunt! Placeat, error, quibusdam tenetur quia,
        cupiditate distinctio accusantium incidunt doloremque excepturi nostrum
        exercitationem est aperiam corporis et earum.
      </div>
    </Layout>
  );
};

export default Home;

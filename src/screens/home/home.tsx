import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import HomeTransparent from "./home-transparent";
import HomeNormal from "./home-normal";
import { useGlobalState } from "../../context/globalStateContext";

const Home: React.FC = () => {
  const { isTransparent } = useGlobalState();

  if (isTransparent) {
    return <HomeTransparent />;
  } else {
    return <HomeNormal />;
  }
};

export default Home;

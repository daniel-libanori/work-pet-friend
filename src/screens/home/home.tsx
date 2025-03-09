import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import HomeTransparent from "./home-transparent";
import HomeNormal from "./home-normal";
import { useSystemState } from "../../context/systemStateContext";

const Home: React.FC = () => {
  const { isTransparent } = useSystemState();

  if (isTransparent) {
    return <HomeTransparent />;
  } else {
    return <HomeNormal />;
  }
};

export default Home;

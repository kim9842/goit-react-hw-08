import React from "react";
import s from "./Home.module.css";

const Home = () => {
  return (
    <div className={s.homeWrapper}>
      <h1 className={s.homeTitle}>Welcome to the Contacts App</h1>
    </div>
  );
};

export default Home;

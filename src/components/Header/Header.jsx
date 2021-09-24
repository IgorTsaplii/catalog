import React from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./Header.module.css";
import { getAuth, signOut } from "firebase/auth";
import { setUserEmail } from "../../redux/auth-reducer";

const Header = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.auth.userEmail);

  const logOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      dispatch(setUserEmail(""));
    });
  };

  return (
    <div className={classes.header}>
      <h1>Каталог товаров</h1>

      <div className={classes.logOut_block}>
        <p>{userEmail}</p>
        <button onClick={logOut}>выйти</button>
      </div>
    </div>
  );
};

export default Header;

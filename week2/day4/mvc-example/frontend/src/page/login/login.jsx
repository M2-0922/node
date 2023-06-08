import React from "react";
import styles from "./login.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(login(userInfo));
    navigate("/dashboard");
  }

  return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className={styles.formGroup}>
          <label className={styles.customLabel} htmlFor="email">Email</label>
          <input onChange={handleChange} className={styles.customInput} type="text" id="email" name="email" placeholder="asd@example.com"/>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.customLabel} htmlFor="password">Password</label>
          <input onChange={handleChange} className={styles.customInput} type="text" name="password" id="password"/>
        </div>
        <div className={styles.formGroup}>
          <button className={styles.customButton}>Login</button>
        </div>
      </form>
  );
};

export default Login;

import React from "react";
import styles from "./register.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../redux/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
  }, [dispatch, user]);

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(register(userInfo));
    // setUserInfo({});
    navigate("/login");
  }

  return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className={styles.formGroup}>
          <label className={styles.customLabel} htmlFor="username">Username</label>
          <input onChange={handleChange} className={styles.customInput} type="text" id="username" name="username" placeholder="joedoe"/>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.customLabel} htmlFor="email">Email</label>
          <input onChange={handleChange} className={styles.customInput} type="text" id="email" name="email" placeholder="asd@example.com"/>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.customLabel} htmlFor="password">Password</label>
          <input onChange={handleChange} className={styles.customInput} type="text" name="password" id="password"/>
        </div>
        <div className={styles.formGroup}>
          <button className={styles.customButton}>Register</button>
        </div>
      </form>
  );
};

export default Register;

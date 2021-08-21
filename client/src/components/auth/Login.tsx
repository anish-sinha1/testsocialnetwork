import React, { Fragment, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Login: React.FC = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const fieldChangeHandler = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e: any) => {
    e.preventDefault();
    console.log("success");
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Sign in</h1>
      <p className="lead">
        <i className="fas fa-user"></i>Sign in to your account
      </p>
      <form className="form" onSubmit={submitHandler}>
        <div className="form-group">
          <input
            type="email"
            placeholder="example@email.com"
            name="email"
            value={email}
            onChange={fieldChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={fieldChangeHandler}
            required
          />
        </div>

        <input type="submit" value="Login" className="btn btn-primary" />
      </form>
      <p className="my-1">
        Don't have an account?<Link to="/register.html">Sign up</Link>
      </p>
    </Fragment>
  );
};

export default Login;

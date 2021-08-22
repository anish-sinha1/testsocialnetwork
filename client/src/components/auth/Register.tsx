import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { setAlert } from "../../actions/alert";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Register: React.FC<{
  setAlert: (alert: string, alertType: string) => void;
}> = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const { name, email, password, passwordConfirm } = formData;
  const fieldChangeHandler = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      props.setAlert("Passwords do not match", "danger");
    } else {
      const newUser = {
        name,
        email,
        password,
        passwordConfirm,
      };
      try {
        const config = {
          headers: { "Content-Type": "application/json" },
        };
        const body = JSON.stringify(newUser);
        const res = await axios.post("/api/users", body, config);
        console.log(res.data);
      } catch (e) {
        console.error(e.response.data);
      }
    }
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Sign up</h1>
      <p className="lead">
        <i className="fas fa-user"></i>Create your account
      </p>
      <form className="form" onSubmit={submitHandler}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={fieldChangeHandler}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="example@email.com"
            name="email"
            value={email}
            onChange={fieldChangeHandler}
            required
          />
          <small>This site uses Gravatar for profile images</small>
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
        <div className="form-group">
          <input
            type="password"
            placeholder="confirm password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={fieldChangeHandler}
            required
          />
        </div>
        <input type="submit" value="Register" className="btn btn-primary" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="login.html">Sign in</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(Register);

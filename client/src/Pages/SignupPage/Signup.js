import React, { Component } from "react";
import Button from "../../Components/Button/Button";
import "./Signup.css";
import PropTypes from "prop-types";

export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }
  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleRedirect = () => {
    this.props.history.push("/login");
  };

  handleSignup = (e) => {
    e.preventDefault();
    const formData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
    };
    this.props.signup(formData, this.props.history);
  };
  render() {
    const { name, email, password, confirmPassword } = this.state;
    return (
      <>
        <form className="form" onSubmit={this.handleSignup}>
          <div className="input-element">
            <label className="label">Name</label>
            <input
              required
              name="name"
              onChange={this.handleInputChange}
              value={name}
              className="input"
              type="text"
            />
          </div>
          <div className="input-element">
            <label className="label">Email</label>
            <input
              required
              name="email"
              onChange={this.handleInputChange}
              value={email}
              className="input"
              type="email"
            />
          </div>
          <div className="input-element">
            <label className="label">Password</label>
            <input
              required
              name="password"
              className="input"
              onChange={this.handleInputChange}
              value={password}
              type="password"
            />
          </div>
          <div className="input-element">
            <label className="label">Confirm Password</label>
            <input
              required
              name="confirmPassword"
              onChange={this.handleInputChange}
              value={confirmPassword}
              className="input"
              type="password"
            />
          </div>
          <div className="form-btn">
            <Button>Sign Up</Button>
          </div>
          <div onClick={this.handleRedirect} className="redirect">
            Already have an account? Click here to sign in
          </div>
        </form>
      </>
    );
  }
}

Signup.propTypes = {
  signup: PropTypes.func.isRequired,
};

export default Signup;

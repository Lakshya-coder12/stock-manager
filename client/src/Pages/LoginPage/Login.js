import React, { Component } from "react";
import Button from "../../Components/Button/Button";
import PropTypes from "prop-types";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleRedirect = () => {
    this.props.history.push("/signup");
  };

  handleLogin = (e) => {
    e.preventDefault();
    const formData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.login(formData, this.props.history);
  };
  render() {
    const { email, password } = this.state;
    return (
      <>
        <form className="form" onSubmit={this.handleLogin}>
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
          <div className="form-btn">
            <Button>Log In</Button>
          </div>
          <div onClick={this.handleRedirect} className="redirect">
            Don't have an account? Click here to create one
          </div>
        </form>
      </>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default Login;

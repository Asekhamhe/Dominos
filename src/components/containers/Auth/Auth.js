import React, { Component } from "react";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import classes from "./Auth.module.css";
import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";

export class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email address",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup: true,
  };

  componentDidMount() {
    if (!this.props.building && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }

  checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    // if (rules.minLength) {
    //   isValid = value.length >= rules.minLength;
    // }
    return isValid;
  };

  inputChangedHandler = (e, controlName) => {
    const updatedForm = {
      ...this.state.controls,
    };
    const updatedFormElement = {
      ...updatedForm[controlName],
    };
    updatedFormElement.value = e.target.value;

    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedForm[controlName] = updatedFormElement;
    this.setState({
      controls: updatedForm,
    });
  };

  submitHandler = (e) => {
    e.preventDefault();
    const { email, password } = this.state.controls;
    // console.log(email.value, password.value);
    this.props.onAuth(email.value, password.value, this.state.isSignup);
  };

  switchAuthModeHandler = () => {
    this.setState((prevState) => ({
      isSignup: !prevState.isSignup,
    }));
  };
  render() {
    const formElements = Object.keys(this.state.controls).map((key) => ({
      value: this.state.controls[key],
      key,
    }));

    let form = formElements.map((formElement, id) => (
      <Input
        key={id}
        elementtype={formElement.value.elementType}
        elementconfig={formElement.value.elementConfig}
        value={formElement.value.value}
        changed={(e) => this.inputChangedHandler(e, formElement.key)}
        invalid={!formElement.value.valid}
        shouldValidate={formElement.value.validation}
        touched={formElement.value.touched}
      />
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    if (this.props.isAuthenticated) {
      return <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className={classes.Auth}>
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
          <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
            SWITCH TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"}
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  building: state.burgerBuilder.building,
  authRedirectPath: state.auth.authRedirectPath,
});

const mapDispatchToProps = (dispatch) => ({
  onAuth: (email, password, isSignup) =>
    dispatch(actions.auth(email, password, isSignup)),

  onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import classnames from "classnames";
import styles from "./Forgot.module.css";
import {
    renderOutlinedSelectField,
  renderOutlinedTextField,
  renderTextField,
} from "../../libs/redux-material.utils";
import {
  CircularProgress,
  MenuItem,
} from "@material-ui/core";
import { Button, withStyles, ButtonBase } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import {serviceForgotPassword, serviceLoginSupport} from "../../services/index.services";
import DashboardSnackbar from "../../components/Snackbar.component";
import { Link } from "react-router-dom";

import EventEmitter from "../../libs/Events.utils";
import { updateTitle } from "../../libs/general.utils";
import SnackbarUtils from "../../libs/SnackbarUtils";
import historyUtils from "../../libs/history.utils";
import RouteName from "../../routes/Route.name";

const validate = (values) => {
  const errors = {};
  const requiredFields = ["emp_id",'name','reason'];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  return errors;
};

const useStyles = {
  btnColor: {
    backgroundColor: "white",
    marginTop: "20px",
    paddingLeft: "20px",
    color: "#2196F3",
    marginRight: "15px",
    paddingRight: "20px",
    "&:hover": {
      backgroundColor: "white",
    },
  },
  btnBottom: {
    backgroundColor: "white",
    paddingLeft: "20px",
    color: "#2196F3",
    marginRight: "10px",
    marginLeft: "15px",
    paddingRight: "20px",
    "&:hover": {
      backgroundColor: "white",
    },
  },
  dialog: {
    padding: "10px 25px",
  },
};

class ForgotPasswordHelpView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: false,
      open: false,
      is_sent: false,
      is_calling: false,
    };
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleLoginClick = this._handleLoginClick.bind(this);
    this._handleClose = this._handleClose.bind(this);
    this._handleReturn = this._handleReturn.bind(this);
    this._handleBack = this._handleBack.bind(this);
  }

  async componentDidMount() {
    updateTitle("Forgot Password");
  }

  _handleLoginClick() {
    this.props.history.push("/login");
  }

  _handleBack() {
    this.props.history.goBack();
  }

  _handleSubmit(data) {
    if (!this.state.is_calling) {
      this.setState({
        is_calling: true,
      });
      serviceLoginSupport(data).then((val) => {
        if (!val.error) {
          SnackbarUtils.success("Password Reset Email Sent");
          this.setState({
            is_sent: true,
            is_calling: false,
          });
          historyUtils.push(RouteName.LOGIN)
        } else {
          this.setState({
            is_calling: false,
          });
          SnackbarUtils.error(val.message);
        }
      });
    }
  }

  _handleClose() {
    this.setState({
      open: !this.state.open,
    });
  }

  _handleReturn() {
    this.props.history.push("/login");
  }

  _renderForm() {
    const { handleSubmit } = this.props;
    const { is_sent } = this.state;
    if (is_sent) {
      return (
        <>
          <div></div>
          <div className={styles.signContainer}>
            <div>
              <div
                className={styles.loginSignupText}
                style={{ fontWeight: "700", fontSize: "24px" }}
              >
                Reset Email Sent.
              </div>
              <p className={styles.bottomLine} style={{ lineHeight: "18px" }}>
                Check your email for a link to reset your password. If it
                doesn’t appear within a few minutes, check your spam folder.
              </p>
              <div>
                <br />
                <ButtonBase
                  className={styles.login}
                  onClick={this._handleReturn}
                >
                  Return to sign in
                </ButtonBase>
              </div>
            </div>
          </div>
          <div></div>
        </>
      );
    } else {
      return (
        <>
          <div></div>
          <div className={styles.signContainer}>
            <div className={styles.logoImg}>
              <img
                src={require("../../assets/img/login logo@2x.png")}
                className={styles.sky}
              />
            </div>
            <form onSubmit={handleSubmit(this._handleSubmit)}>
              <div className={styles.loginSignupText}>
                <h1 className={styles.headingText}>Support Request</h1>
                <div className={styles.newLine} />
              </div>
              <div>
                <br />
                <div>
                  <Field
                    fullWidth={true}
                    margin={"dense"}
                    name="name"
                    component={renderOutlinedTextField}
                    label="Name"
                  />
                </div>
                <div>
                  <Field
                    fullWidth={true}
                    margin={"dense"}
                    name="emp_id"
                    component={renderOutlinedTextField}
                    label="Employee ID"
                  />
                </div>
                 <div>
                  <Field
                  fullWidth={true}
                  margin={"dense"}
                  name="reason"
                  component={renderOutlinedSelectField}
                  label="Reason"
                >
                    <MenuItem value='1'>abc</MenuItem>
                    <MenuItem value='2'>xyz</MenuItem>
                    <MenuItem value='3'>123</MenuItem>
                </Field>
                </div>
                <br />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <ButtonBase
                    disabled={this.state.is_calling}
                    variant={"contained"}
                    type="submit"
                    className={styles.login}
                  >
                    {this.state.is_calling ? (
                      <div style={{ padding: "5px 20px", display: "flex" }}>
                        <CircularProgress size={"18px"} color={"primary"} />
                      </div>
                    ) : (
                      "Raise Request "
                    )}
                  </ButtonBase>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#2896e9",
                    fontSize: "14px",
                    cursor: "pointer",
                    marginTop:"25px"
                  }}
                >
                    <a href="/login">Login Now</a>
                </div>
              </div>
            </form>
          </div>
        </>
      );
    }
  }

  render() {
    const { handleSubmit, classes } = this.props;
    return (
      <div className={styles.mainLoginView}>
        <div className={styles.loginFlex1}>
          <div className={styles.heading}>
            Success is always a <br />
            learning process
          </div>
        </div>
        <div className={styles.loginFlex2}>{this._renderForm()}</div>
        <DashboardSnackbar />
      </div>
    );
  }
}

ForgotPasswordHelpView = reduxForm({
  form: "LoginPage", // a unique identifier for this form
  validate,
  onSubmitFail: (errors) => {
    if (errors) {
      const tempErrors = Object.keys(errors);
      if (tempErrors.length > 1) {
        EventEmitter.dispatch(EventEmitter.THROW_ERROR, {
          error: "Please Enter Required Parameters",
          type: "error",
        });
      } else if (tempErrors.length == 1) {
        console.log(errors[tempErrors[0]]);
        const temp = errors[tempErrors[0]];
        // EventEmitter.dispatch(EventEmitter.THROW_ERROR, {error: temp, type: 'error' });
      } else {
      }
    } else {
    }
  },
})(ForgotPasswordHelpView);

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(withStyles(useStyles)(ForgotPasswordHelpView));

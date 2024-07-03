import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Menu as MenuIcon, MoreVert as OptionIcon } from "@material-ui/icons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  withStyles,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Switch,
} from "@material-ui/core";
import cx from "classnames";

import headerStyle from "../../assets/jss/material-dashboard-react/headerStyle.jsx";
import { actionLogoutUser } from "../../actions/auth_index.action";
import { actionChangeTheme } from "../../actions/AppSettings.action";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Popover from "@material-ui/core/Popover";
import historyUtils from "../../libs/history.utils";
import RouteName from "../../routes/Route.name";
import styles from "./Header.module.css";
import notificationIcon from "../../assets/img/ic_notification_data.png";
import notificationUnread from "../../assets/img/newNotificationIcon.png";
import homePage from "../../assets/img/home_black.png";

import {
  useLocation,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min.js";

import {serviceNotificationCountData} from "../../services/Notification.services.js"

const Header = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [note, setNote] = useState(null);
  const [unseen,setUnseen] = useState();

  const location = useLocation();

  const activeRoute = (routeName, otherData) => {
    if (!otherData.should_regex) {
      return routeName === props.location.pathname;
    }
    return (
      routeName === props.location.pathname ||
      props.location.pathname.indexOf(routeName) > -1
    );
  };

  const makeBrand = () => {
    let name = "";
    props.routes.map((prop, key) => {
      if (activeRoute(prop.path, prop)) {
        name = prop.navbarName;
      }
      return null;
    });
    return name;
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotification = (event) => {
    setNote(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNoteClose = () => {
    setNote(null);
  };

  const handleLogout = () => {
    props.actionLogoutUser();
    setAnchorEl(null);
  };

  const handleChangeTheme = () => {
    const { themeType } = props;
    props.actionChangeTheme(themeType === "dark" ? "light" : "dark");
  };

  const handleResetPassword = () => {
    historyUtils.push(RouteName.RESET_PASSWORD_FIRST);
    setAnchorEl(null);
  };

  const handlePushNotification = () => {
    if (location.pathname !== "/notification") {
      historyUtils.push(RouteName.NOTIFICATION);
    } else {
      historyUtils.goBack();
      window. location. reload();
    }
  };

  const handleHomePage = () => {
      historyUtils.push(RouteName.HOMEPAGE_MOBILE);

  };
  const dataCountNotifiication =()=>{
    serviceNotificationCountData().then((res)=>{setUnseen(res?.data)})
  }

  useEffect(()=>{
    dataCountNotifiication()
  }, []);


  const handleMyProfile = () => {
    historyUtils.push(RouteName.MY_PROFILE);
  };
  const { classes, color, themeType, userData } = props;

  return (
    <AppBar
      position="static"
      className={`${classes.appBar} ${color && classes[color]}`}
    >
      <Toolbar className={classes.container}>
        <IconButton
          className={classes.menuButton}
          onClick={props.handleHeaderClick}
          color="inherit"
          aria-label="Menu"
        >
          <img
            src={require("../../assets/img/ic_hamburger.png")}
            height={15}
            alt="menu icon"
          />
        </IconButton>
        <Button href="#" className={classes.title}>
          {/*{makeBrand()}*/}
        </Button>

        <div className={classes.flexGrow}>
          {/*<Switch checked={themeType === 'dark'} onChange={handleChangeTheme}/>*/}
        </div>
        <div>
          <Popover
            open={Boolean(note)}
            anchorEl={note}
            onClose={handleNoteClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <div className={classes.innercontent}>James sent you a message</div>
          </Popover>
        </div>
        <div className={styles.imageTagHome}>
          <img
            className={styles.imgClassHome}
            src={homePage}
            alt="HomePage Img"
            onClick={() => handleHomePage()}
          /></div>
        <div className={classes.logoImage}>
          <img
            src={userData?.image}
            height={30}
            width={30}
            style={{ borderRadius: "50%" }}
            alt="user avatar"
            onClick={() => handleMyProfile()}
          />
        </div>
        <div className={styles.imageTag}>
          {
            unseen !== "0" ?
            <img
            src={notificationUnread}
            alt="default Img"
            onClick={() => handlePushNotification()}
          />: <img
            src={notificationIcon}
            alt="default Img"
            onClick={() => handlePushNotification()}
          />
          }

        </div>
        <div>
          <Button
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            style={{ color: "black" }}
          >
            <OptionIcon />
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {/*<MenuItem onClick={handleClose}>Profile</MenuItem>*/}
            <MenuItem onClick={handleResetPassword}>Reset Password</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>

      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
};

const StyledHeader = withStyles(headerStyle)(Header);

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      actionLogoutUser: actionLogoutUser,
      actionChangeTheme: actionChangeTheme,
    },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    themeType: state.app_setting.theme,
    userData: state?.auth?.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StyledHeader);

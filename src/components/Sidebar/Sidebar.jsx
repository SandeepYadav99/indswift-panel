import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import cx from "classnames";
import clsx from "clsx";
import {
  withStyles,
  Drawer,
  SwipeableDrawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import CloseIcon from "@material-ui/icons/Close";
import sidebarStyle from "../../assets/jss/material-dashboard-react/sidebarStyle.jsx";
import FilterComponent from "../Filter/Filter.component.js";
import { getNullPaths } from "../../helper/helper.js";

class CustomListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick() {
    this.setState({
      open: !this.state.open,
    });
  }

  _renderLinks() {}

  _renderNavLink(prop, nested) {
    const { classes, color, key, activeRoute, toggleSideBar } = this.props;

    const listItemClasses = cx({
      [" " + classes[color]]: activeRoute(prop.path, prop),
      [" " + classes["nested"]]: nested,
    });
    const whiteFontClasses = cx({
      [" " + classes.whiteFont]: activeRoute(prop.path, prop),
    });
    return (
      <NavLink
        to={prop?.is_external ? { pathname: prop.path } : prop.path}
        className={classes.item}
        activeClassName="active"
        target={prop?.is_external ? "_blank" : "_self"}
        onClick={toggleSideBar}
        // key={key}
      >
        <ListItem button className={classes.itemLink + listItemClasses}>
          <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
            <prop.icon className={classes.sidebarIcon} />
          </ListItemIcon>
          <ListItemText
            primary={prop.sidebarName}
            className={classes.itemText + whiteFontClasses}
            disableTypography={true}
          />
        </ListItem>
      </NavLink>
    );
  }

  _renderNestedLinks(slug, nested = false) {
    const { routes } = this.props;
    const links = [];
    routes.forEach((val, index) => {
      if (val.parent == slug && val.is_sidebar) {
        links.push(this._renderNavLink(val, nested));
      }
    });
    return links;
  }

  render() {
    const { prop, classes, color, key, activeRoute } = this.props;
    if (!prop.is_sidebar) return null;
    if (prop.redirect) return null;
    if (!prop.parent && !prop.is_parent) {
      return <>{this._renderNavLink(prop)}</>;
    } else if (prop.is_parent) {
      const listItemClasses = cx({
        [" " + classes[color]]: activeRoute(prop.path, prop),
      });
      const whiteFontClasses = cx({
        [" " + classes.whiteFont]: activeRoute(prop.path, prop),
      });
      return (
        <>
          <ListItem
            button
            className={classes.itemLink + listItemClasses}
            onClick={this._handleClick}
          >
            <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
              <prop.icon className={classes.sidebarIcon} />
            </ListItemIcon>
            <ListItemText
              primary={prop.sidebarName}
              className={classes.itemText + whiteFontClasses}
              disableTypography={true}
            />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {this._renderNestedLinks(prop.slug, true)}
            </List>
          </Collapse>
        </>
      );
    }
    return null;
  }
}

class CustomLink extends React.Component {
  constructor(props) {
    super(props);
  }

  _renderLinks() {
    const { routes, classes, color, activeRoute, toggleSideBar } = this.props;
    const links = [];
    routes.forEach((prop, key) => {
      links.push(
        <CustomListItem
          routes={routes}
          key={key}
          prop={prop}
          classes={classes}
          activeRoute={activeRoute}
          color={color}
          toggleSideBar={toggleSideBar}
        />
      );
    });
    return links;
  }

  render() {
    const { routes, classes } = this.props;
    return <List className={classes.list}>{this._renderLinks()}</List>;
  }
}

const Sidebar = ({ ...props }) => {
  const [data, setData] = useState([]);
  const [parentRoute, setParentRoute] = useState([]);
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName, otherData) {
    if (!otherData.should_regex) {
      return routeName == props.location.pathname;
    }
    return routeName == props.location.pathname ||
      props.location.pathname.indexOf(routeName) > -1
      ? true
      : false;
    // return props.location.pathname.indexOf(routeName) > -1 ? true : false;
  }

  const { classes, color, logo, image, logoText, routes, toggleSideBar } =
    props;

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      const filteredMobileRoute = routes?.filter((val) => !val?.hideMobileView);
      setData(filteredMobileRoute);
    } else {
      setData(routes);
    }
    const filteredRoute = routes?.filter((item) => item?.is_parent);
    setParentRoute(filteredRoute);
  }, [routes]);

  const handleSearchValueChange = useCallback(
    (value) => {
      const isMobile = window.innerWidth <= 768;
      if (value) {
        const tempData = routes?.filter((val) => {
          if (
            val?.sidebarName?.match(new RegExp(value, "ig")) &&
            val?.is_sidebar
          ) {
            return val;
          }
        });

        const checkParentRoute = tempData
          ?.filter((val) => val?.is_parent)
          ?.map((item) => item?.slug);
        const getChildRoute = routes?.filter((item) => {
          if (item?.is_sidebar && !item?.is_parent) {
            return checkParentRoute?.includes(item?.parent);
          }
        });
        const parentValues = [
          ...new Set(
            tempData
              ?.filter((item) => item?.parent)
              ?.map((item) => item?.parent)
          ),
        ];
        let uniqueValuesInArr2 = parentValues.filter(
          (value) => !checkParentRoute.includes(value)
        );

        const filteredParentRoute = parentRoute?.filter((item) =>
          uniqueValuesInArr2?.includes(item?.slug)
        );
        const getValues = [
          ...tempData,
          ...filteredParentRoute,
          ...getChildRoute,
        ];
        const { nullPathObjects, uniquePathObjects } = getNullPaths(getValues);
        console.log("tempData", {
          tempData,
          parentRoute,
          filteredParentRoute,
          parentValues,
          checkParentRoute,
          getChildRoute,
          uniqueValuesInArr2,
        });
        if (isMobile) {
          const uniqueRoute = [
            ...uniquePathObjects,
            ...nullPathObjects,
          ]?.filter((item) => !item.hideMobileView);
          setData([...uniqueRoute]);
        } else {
          setData([...uniquePathObjects, ...nullPathObjects]);
        }
      } else {
        if (isMobile) {
          const filteredMobileRoute = routes?.filter(
            (val) => !val?.hideMobileView
          );
          setData(filteredMobileRoute);
        } else {
          setData(routes);
        }
      }
    },
    [routes, setData, parentRoute]
  );

  var brand = (
    <div className={classes.logo}>
      <div className={classes.logoImage}>
        <img src={logo} alt="logo" className={classes.img} />
        <div className={classes.newText}>SkyNet</div>
      </div>
      {logoText}
    </div>
  );
  var brandMobile = (
    <div className={classes.logo}>
      <div className={classes.logoImageMobile}>
        <div>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        <div className={classes.newText}>SkyNet</div>
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={toggleSideBar}
        >
          <CloseIcon className={classes.icon} style={{ color: "#919BB0" }} />
        </IconButton>
      </div>
    </div>
  );
  console.log("props.open", logoText);
  return (
    <div>
      <Hidden mdUp>
        <Drawer
          variant="permanent"
          // anchor="right"
          open={props.open}
          className={clsx(classes.drawer, {
            [classes.drawerOpenMob]: props.open,
            [classes.drawerClose]: !props.open,
          })}
          classes={{
            // paper: classes.drawerPaper
            paper: clsx({
              [classes.drawerOpenMob]: props.open,
              [classes.drawerClose]: !props.open,
            }),
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {brandMobile}
          <div className={classes.filterWrap}>
            <FilterComponent
              filters={[]}
              handleSearchValueChange={handleSearchValueChange}
              // handleFilterDataChange={handleFilterDataChange}
            />
          </div>

          <div className={classes.sidebarWrapperMobile}>
            {/*<HeaderLinks />*/}
            {data?.length > 0 ? (
              <CustomLink
                routes={data}
                classes={classes}
                color={color}
                activeRoute={activeRoute}
                toggleSideBar={toggleSideBar}
              />
            ) : (
              <p className={classes.notext}>No Match Found ...</p>
            )}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown>
        <Drawer
          // anchor="left"
          variant="permanent"
          open={props.open}
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: props.open,
            [classes.drawerClose]: !props.open,
          })}
          classes={{
            // paper: classes.drawerPaper
            paper: clsx({
              [classes.drawerOpen]: props.open,
              [classes.drawerClose]: !props.open,
            }),
          }}
        >
          {brand}
          <FilterComponent
            filters={[]}
            handleSearchValueChange={handleSearchValueChange}
            // handleFilterDataChange={handleFilterDataChange}
          />
          <div className={classes.sidebarWrapper}>
            {data?.length > 0 ? (
              <CustomLink
                routes={data}
                classes={classes}
                color={color}
                activeRoute={activeRoute}
              />
            ) : (
              <p className={classes.notext}>No Match Found ...</p>
            )}
          </div>
        </Drawer>
      </Hidden>
    </div>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(sidebarStyle)(Sidebar);

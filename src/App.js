import React, {useMemo} from 'react';
import {Router, Route, Switch} from "react-router-dom";
import {MuiThemeProvider, createTheme} from '@material-ui/core/styles';
import RouteComponent from './routes/index.route';
import './App.css';
import themes, {overrides} from './themes';
import history from './libs/history.utils';
import {connect, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {isIosSafari} from "./libs/general.utils";

// const history = createBrowserHistory();



const App = ({}) => {
    const { theme: themeType } = useSelector(state => state.app_setting);
    const themeDefault = themeType == 'dark' ? themes.dark : themes.default;

// themeDefault['palette']['type'] = 'dark';
    const theme = createTheme({...themeDefault, ...overrides});

    const iosAddButton = useMemo(() => {
        const iOSIsInstalled = window?.navigator?.standalone;
        const isIos = isIosSafari();
        if (isIos && !iOSIsInstalled) {
            return (<div className={'installDiv'} style={{display: 'flex'}}>
                <div>
                    Add To Home Screen
                </div>
                <button>Add +</button>
            </div>);
        }
    }, []);

    return (
        <MuiThemeProvider theme={theme}>
            <Router history={history}>
                <RouteComponent/>
            </Router>
            <div id={'installPopUp'} className={'installDiv'}>
                <div>
                    Add To Home Screen
                </div>
                <button id="install">Add +</button>

            </div>
            {iosAddButton}
        </MuiThemeProvider>
    );
}

export default (App);

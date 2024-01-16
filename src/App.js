import React, {Suspense, useCallback, useMemo, useRef, useState} from 'react';
import {Router} from "react-router-dom";
import {MuiThemeProvider, createTheme} from '@material-ui/core/styles';
import RouteComponent from './routes/index.route';
import './App.css';
import themes, {overrides} from './themes';
import history from './libs/history.utils';
import {useSelector} from "react-redux";
import {isIosSafari} from "./libs/general.utils";
import InstructDialog from "./components/InstructDialog/InstructDialog.view";

// const history = createBrowserHistory();


const App = ({}) => {
    const { theme: themeType } = useSelector(state => state.app_setting);
    const themeDefault = themeType == 'dark' ? themes.dark : themes.default;
    const [isDialog, setIsDialog] = useState(false);

    const toggleDialog = useCallback(() => {

        setIsDialog((e) => !e);
    }, [isDialog]);
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
                <button onClick={toggleDialog}>Add +</button>
            </div>);
        } return null;
    }, [toggleDialog]);


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
            <Suspense fallback={<div></div>}>
                <InstructDialog  isOpen={isDialog} handleToggle={toggleDialog} />
            </Suspense>
        </MuiThemeProvider>
    );
}

export default (App);

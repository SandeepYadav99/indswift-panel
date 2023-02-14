import React, {useMemo} from 'react';
import useVersionDetails from "./VersionDetail.hook";
import {WaitingComponent} from "../../../../components/index.component";
import styles from './Style.module.css';
import EmployeeInfoComponent from "./EmployeeInfo.component";
import ChangeLogInfoTextComponent from "./ChangeLogInfoText.component";
import {ButtonBase, makeStyles} from "@material-ui/core";
import MuiStyle from "../../../../libs/MuiStyle";
import csx from 'classnames';

const useStyle = makeStyles(MuiStyle);

const VersionDetailView = ({id, isOpen, handleClose}) => {
    const { isLoading, data, handleApprove, handleReject, isSubmitting } = useVersionDetails({id, isOpen, handleClose});
    const classes = useStyle();
    const changeLog = useMemo(() => {
        const views = [];
        data?.data?.forEach((data) => {
            views.push(<ChangeLogInfoTextComponent data={data} />);
        });
        return views;
    }, [data]);

    if (isLoading) {
        return (<WaitingComponent />);
    }

    return (
        <div className={styles.panelCont}>
            <EmployeeInfoComponent data={data?.employee} />
            <h4>Change Log</h4>
            {changeLog}
            <div>
                {data?.status === 'PENDING' && (<>
                    <ButtonBase disabled={isSubmitting}
                        className={csx(classes.btnBorder, styles.rejectBtn)}
                        onClick={handleReject}>
                        Reject
                    </ButtonBase>
                    <ButtonBase  disabled={isSubmitting} onClick={handleApprove} className={classes.btnBorder}>Approve</ButtonBase>
                </>)}
            </div>
        </div>
    )
};

export default VersionDetailView;

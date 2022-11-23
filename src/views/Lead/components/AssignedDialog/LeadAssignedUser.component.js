import React, {useCallback, useMemo, useState} from 'react';
import styles from "../LeadDetail/Style.module.css";
import {ButtonBase} from "@material-ui/core";
import AssignedDialog from "./AssignedDialog.view";
import {useDispatch, useSelector} from "react-redux";
import handleSubmit from "redux-form/lib/handleSubmit";
import {actionAssignLead} from "../../../../actions/Lead.action";

const LeadAssignedUser = ({leadId}) => {
    const [open, setOpen] = useState(false);
    const { lead_detail: leadDetail } = useSelector(state => state.lead);
    // console.log(leadDetail)
    const dispatch = useDispatch();
    const _handleClose = useCallback(() => {
        setOpen(e => !e);
    }, [setOpen]);

    const handleSubmit = useCallback((data) => {
        dispatch(actionAssignLead(leadDetail.lead_id ? leadDetail.lead_id : leadId, data.user_id));
        setOpen(false);
    }, [leadDetail, setOpen, leadId]);

    const renderAssigned = useMemo(() => {
        if (leadDetail?.assigned_to) {

            return (
                <div className={styles.assignedTo}>
                    <img src={leadDetail.assigned.image ? leadDetail.assigned.image : require('../../../../assets/img/profile.png')} alt="" height={30} style={{borderRadius:"30px"}}/>
                    <div className={styles.assignee}>
                        <div className={styles.assign}>{leadDetail.assigned.name}</div>
                        <div>{leadDetail.assignment_date}</div>
                    </div>
                </div>
            )
        }
        return (
            <div className={styles.assignedTo}>
                N/A
            </div>
        )
    }, [leadDetail]);

    return (
        <div>
            <div className={styles.cases}>
                <div className={styles.assign}>Assigned to</div>
                <ButtonBase className={styles.change} onClick={_handleClose}>Change</ButtonBase>
            </div>
            {renderAssigned}
            <AssignedDialog handleSubmitProps={handleSubmit} open={open} handleClose={_handleClose}/>
        </div>
    );
};

export default LeadAssignedUser;

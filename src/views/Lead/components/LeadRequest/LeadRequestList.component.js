import React, {useMemo} from 'react';
import {useSelector} from "react-redux";
import WaitingComponent from "../../../../components/Waiting.component";
import LeadRequest from "./LeadRequest.component";
import styles from './Style.module.css';

const LeadRequestList = ({handleLeadId}) => {
    const {is_lead_requests, lead_requests} = useSelector(state => state.lead);

    const list = useMemo(() => {
        if (is_lead_requests || lead_requests.length === 0) {
            return null;
        }
        return lead_requests.map((val) => {
          return (
              <LeadRequest key={val.id} data={val} handleLeadId={handleLeadId}/>
          );
        });
    }, [lead_requests, is_lead_requests,]);

    if (is_lead_requests) {
        return (<WaitingComponent></WaitingComponent>);
    }


    return (
        <div className={styles.plainCont}>
            <div className={styles.request}>REQUESTS {lead_requests.length > 0 ? '(' + (lead_requests.length) + ')' : ''}</div>
            {list}
        </div>
    )
};

export default LeadRequestList;

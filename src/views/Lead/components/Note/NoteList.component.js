import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useSelector} from "react-redux";
import Note from "./Note.component";
import {WaitingComponent} from "../../../../components/index.component";
import {Button} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import styles from './Style.module.css';
import NoteDialog from "./NoteDialog.view";

const LeadNoteList = ({requestLeadId}) => {
    const [isNote, setIsNote] = useState(false);
    const {is_lead_notes, lead_notes, lead_detail} = useSelector(state => state.lead);

    useEffect(() => {
        console.log('LeadNoteList requestLEadId', requestLeadId);
    }, [requestLeadId]);

    const list = useMemo(() => {
        if (is_lead_notes || lead_notes.length === 0) {
            return null;
        }
        return lead_notes.map((val) => {
            return (<Note key={val.id} data={val}/>);
        });
    }, [lead_notes]);

    const _handleNote = useCallback(() => {
        setIsNote(e => !e);
    }, [setIsNote]);

    if (is_lead_notes) {
        return (<WaitingComponent/>);
    }


    return (
        <div className={styles.plainCont}>
            <div className={styles.actionBtn}>
                <div>Notes</div>
                <Button onClick={_handleNote} variant={'contained'} color={'primary'} className={'leadBtn'}>
                    <Add></Add> Add Note
                </Button>
            </div>
            <br/>
            {list}
            <NoteDialog leadId={lead_detail ? lead_detail.lead_id : ''} requestLeadId={null} open={isNote} handleClose={_handleNote}/>
        </div>
    )
};

export default LeadNoteList;

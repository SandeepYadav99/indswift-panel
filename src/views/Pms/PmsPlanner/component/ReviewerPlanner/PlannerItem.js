import styles from "./Style.module.css";
import DefaultImg from "../../../../../assets/img/download.png";
import React, {useCallback} from "react";
import {ButtonBase} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import Constants from "../../../../../config/constants";
import StatusPill from "../../../../../components/Status/StatusPill.component";
import RouteName from "../../../../../routes/Route.name";

const ProfileView = ({ isSelf, isError, data, handleDelete, type, dtIndex, canEdit }) => {
    return (
        <div>
            <div className={styles.mappedCard} key={`SummaryView}`}>
                <div className={styles.imageNameContainer}>
                    <div className={styles.imageContainer}>
                        <img src={data?.image} />
                    </div>

                    <div className={styles.nameContainer}>
                        <span>{data?.name}</span>
                        <div className={styles.date}>{data?.code}</div>
                        {data?.status === Constants.PMS_4B_BATCH_STATUS.REVIEW_SUBMITTED && (<a href={`${RouteName.PMS_4B_REVIEW_DETAIL}${data.review_id}`} target={'_blank'}>
                            <label>View Form</label>
                        </a>)}
                    </div>
                    <div className={styles.errorCont}>
                        {isError && (<span className={styles.errorText}>Error! Already Added</span>)}
                    </div>
                </div>
                {(!isSelf && canEdit) && (
                    <div className={styles.buttonWrapper}>
                        <ButtonBase onClick={() => {
                            handleDelete(type, dtIndex);
                        }} className={styles.removeBtn}>Remove</ButtonBase>
                    </div>
                )}
                {!canEdit && (
                    <div className={styles.buttonWrapper}>
                        <StatusPill status={data?.status} />
                    </div>
                )}
            </div>
        </div>
    );
};
const PlannerItem = ({type, data, handleAdd, handleDelete, errors, indexes, canEdit }) => {
    const handleClick = useCallback(() => {
        handleAdd(type);
    }, [handleAdd, type]);

    return (
        <div className={styles.peerWrap}>
            <div className={styles.addWrap}>
                <div className={styles.title}>{type}</div>
                {(type !== Constants.PLANNER_TYPES.SELF && canEdit) && (<ButtonBase
                    className={styles.edit}
                    onClick={handleClick}
                >
                    <Add fontSize={"small"}></Add>
                    ADD
                </ButtonBase>)}
            </div>
            {data[type].map((dt, index) => {
                const key = `${indexes[type]}_${index}`;
                const isError = errors.indexOf(key) >= 0;
                return (<ProfileView canEdit={canEdit} type={type} isError={isError} dtIndex={index} handleDelete={handleDelete} key={dt?.id} data={dt} isSelf={type === Constants.PLANNER_TYPES.SELF} />);
            })}
        </div>
    )
};

export default PlannerItem;

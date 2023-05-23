import styles from "./Style.module.css";
import DefaultImg from "../../../../../assets/img/download.png";
import React, {useCallback} from "react";
import {ButtonBase} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import Constants from "../../../../../config/constants";

const ProfileView = ({ isSelf, isError, data, handleDelete, type, dtIndex }) => {
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
                    </div>
                    <div className={styles.errorCont}>
                        {isError && (<span className={styles.errorText}>Error! Already Added</span>)}
                    </div>
                </div>
                {!isSelf && (
                    <div className={styles.buttonWrapper}>
                        <ButtonBase onClick={() => {
                            handleDelete(type, dtIndex);
                        }} className={styles.removeBtn}>Remove</ButtonBase>
                    </div>
                )}
            </div>
        </div>
    );
};
const PlannerItem = ({type, data, handleAdd, handleDelete, errors, indexes}) => {
    const handleClick = useCallback(() => {
        handleAdd(type);
    }, [handleAdd, type]);

    return (
        <div className={styles.peerWrap}>
            <div className={styles.addWrap}>
                <div className={styles.title}>{type}</div>
                {type !== Constants.PLANNER_TYPES.SELF && (<ButtonBase
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
                return (<ProfileView type={type} isError={isError} dtIndex={index} handleDelete={handleDelete} key={dt?.id} data={dt} isSelf={type === Constants.PLANNER_TYPES.SELF} />);
            })}
        </div>
    )
};

export default PlannerItem;

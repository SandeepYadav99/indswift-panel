import React, {useMemo} from 'react';
import styles from './Style.module.css';
import csx from 'classnames';
import ChildrenListComponent from "./ChildrenList.component";

const ChangeLogInfoTextComponent = ({data}) => {
    const removeUnderScore = (value) => {
        return value ? value.replace(/_/g, " ") : "";
      };
    const oldValue = useMemo(() => {
        if (data.key === 'children') {
            if (data?.old_value) {
                return (<ChildrenListComponent data={(data?.old_value)} />)
            } return (<div>-</div>);
        } else {
            return (<div>{data?.old_value ? data?.old_value : 'N/A'}</div>);
        }
    }, [data]);

    const newValue = useMemo(() => {
        if (data?.key === 'children') {
            return (<ChildrenListComponent data={(data?.new_value)} />)
        } else {
            return (<div>{data?.new_value}</div>);
        }
    }, [data]);
    return (
        <div className={csx('plainPaper', styles.infoContainer)}>
            <div className={styles.titleText}>{removeUnderScore(data?.key)}</div>
            <label className={styles.infoLabel}>Old</label>
            {oldValue}
            <br/>
            <label className={styles.infoLabel}>New</label>
            {newValue}
        </div>
    )
};

export default ChangeLogInfoTextComponent;

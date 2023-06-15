import styles from "./Style.module.css";
import { ButtonBase, Menu, MenuItem } from "@material-ui/core";
import React from "react";
import useImprestList from "./ImprestList.hook";
import { Add } from "@material-ui/icons";
import ImprestUpperTable from "./Component/ImprestUpperTable/ImprestUpperTable.view";

const ImprestList = ({ jobId }) => {
  const { handleAddCandidate, candidateEl ,handleCreate} = useImprestList({ jobId });
  return (
    <div className={styles.plainPaper}>
      <div className={styles.btmFlex}>
        <div style={{ flex: "1" }}>
          <div className={styles.heading}>My Imprest Requests</div>
          <div className={styles.newLine} />
        </div>
        <div style={{ marginLeft: "20px" }}>
          <ButtonBase
            className={styles.createBtn}
            aria-owns={candidateEl ? "candidateEl" : undefined}
            aria-haspopup="true"
            onClick={handleCreate}
          >
            New Request
            <Add fontSize={"small"} className={'plusIcon'}></Add>
          </ButtonBase>
        </div>
      </div>
      <ImprestUpperTable/>
    </div>
  );
};

export default ImprestList;

import React from "react";
import styles from "./Style.module.css";
import { ButtonBase } from "@material-ui/core";

const BottomIncActionView = ({
  isSubmitting,
  handleSend,
    handleFreeze
}) => {
  return (
    <div className={styles.stickyBtnWrap}>
      <div className={styles.WrapOuter}>
        <div className={styles.upperWrap}>
          <span>
            NOTE: IF A USER DOES NOT QUALIFY IN RANGE, FIRST RANGE INCREMENT
            WILL BE APPLIED.
          </span>
          <span>Slab 1 will be applied on grade if a grade is not mapped.</span>
        </div>
        <div className={styles.btnWrap}>
          <ButtonBase
            disabled={isSubmitting}
            aria-haspopup="true"
            onClick={handleSend}
            className={"createBtn"}
          >
            Save Increment
          </ButtonBase>
          &nbsp;&nbsp;
          <ButtonBase
              disabled={isSubmitting}
              aria-haspopup="true"
              onClick={handleFreeze}
              className={"createBtn"}
          >
            Freeze
          </ButtonBase>
        </div>
      </div>
    </div>
  );
};

export default BottomIncActionView;

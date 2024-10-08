import React, { useMemo } from "react";
import styles from "./Style.module.css";

const ChildDetail = ({ data }) => {
  return (
    <div className={styles.mainFlex1}>
      <div className={styles.left}>
        <div className={styles.key}>
          <span className={styles.value1}>Name:</span>
          <span className={styles.valueWrap12}>{data?.name}</span>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.key}>
          <span className={styles.value1}>DOB:</span>
          <span className={styles.valueWrap1}>{data?.dob}</span>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.key}>
          <span className={styles.value1}>Gender:</span>
          <span className={styles.valueWrap12}>{data?.gender}</span>
        </div>
      </div>
    </div>
  );
};

const PersonalInfo = ({ data }) => {
  const childDetails = useMemo(() => {
    return data?.children?.map((dT) => {
      return <ChildDetail data={dT} />;
    });
  }, [data]);
  const getValues = (value) => {
    if (value) {
      if (value === "N/A") {
        return "-";
      } else {
        return value;
      }
    } else return "-";
  };
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainerPersonal}>
          <div className={styles.heading}>Personal Information</div>

          <div className={styles.mainFlex2}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>DOB:</span>
                <span className={styles.valueWrap}>{data?.dob}</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Gender:</span>
                <span className={styles.valueWrap}>{data?.gender}</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Domicile State:</span>
                <span className={styles.valueWrap}>{data?.state}</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Father's Name:</span>
                <span className={styles.valueWrapCaps}>
                  {data?.family?.father_name}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Father's DOB:</span>
                <span className={styles.valueWrap}>
                  {getValues(data?.family?.father_dob)}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Father's State:</span>
                <span className={styles.valueWrap}>
                  {getValues(data?.family?.father_state)}
                </span>
              </div>
              {data?.family?.father_state === "EXPIRED" && (
                <div className={styles.key}>
                  <span className={styles.value}>
                    Fathers Passing Away Date::
                  </span>
                  <span className={styles.valueWrap}>
                    {getValues(data?.family?.father_dod)}
                  </span>
                </div>
              )}

              <div className={styles.key}>
                <span className={styles.value}>Mother's Name:</span>
                <span className={styles.valueWrapCaps}>
                  {data?.family?.mother_name}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Mother's DOB:</span>
                <span className={styles.valueWrap}>
                  {getValues(data?.family?.mother_dob)}
                </span>
              </div>
             

              
              <div className={styles.key}>
                <span className={styles.value}>Qualification:</span>
                <span className={styles.valueWrap}>
                  {data?.higher_education}
                </span>
              </div>
            </div>
            <div className={styles.vertical}></div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>Marital Status:</span>
                <span className={styles.valueWrap}>
                  {data?.family?.martial_status}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>DOM:</span>
                <span className={styles.valueWrap}>{data?.dom}</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Spouse Name:</span>
                <span className={styles.valueWrapCaps}>
                  {data?.family?.spouse_name}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Spouse DOB:</span>
                <span className={styles.valueWrap}>
                  {data?.family?.spouse_dob}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Spouse Gender:</span>
                <span className={styles.valueWrap}>
                  {data?.family?.spouse_gender}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>No of Children:</span>
                <span className={styles.valueWrap}>
                  {data?.children?.length}
                </span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Blood Group:</span>
                <span className={styles.valueWrap}>{data?.blood_group}</span>
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Mother's State:</span>
                <span className={styles.valueWrap}>
                  {getValues(data?.family?.mother_state)}
                </span>
              </div>
              {data?.family?.mother_state === "EXPIRED" && (
                <div className={styles.key}>
                  <span className={styles.value}>
                    Mother Passing Away Date:
                  </span>
                  <span className={styles.valueWrap}>
                    {getValues(data?.family?.mother_dod)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.childrenWrapper}>
          <div className={styles.heading}>Children Details</div>
          {childDetails}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;

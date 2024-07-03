import React from "react";
import styles from "./Style.module.css";
import useSuccessionHistory from "./SuccessionHistory.hook";
import StatusPill from "../../../../../components/Status/StatusPill.component";
const SuccessionHistory = ({ handleToggleSidePannel, isSidePanel, empId }) => {
  const { employeeDetails } = useSuccessionHistory({
    handleToggleSidePannel,
    isSidePanel,
    empId,
  });
  
  return (
    <div className={styles.successContainer}>
      <div>
        <div className={styles.employ}>
          <div>
            <div className={styles.title}>Employee Name:</div>
            <span>{empId?.name}</span>
          </div>
          <div className={styles.empCode}>
            <div className={styles.title}>Employee Code:</div>
            <span>{empId?.emp_code}</span>
          </div>
        </div>
        <div className={styles.employ}>
          <div className={styles.title}>Annual Salary:</div>
          <span>{empId?.annual_salary && `₹ ${empId?.annual_salary}`}</span>
        </div>
      </div>{" "}
      <br />
      {employeeDetails?.length > 0 ? (
        employeeDetails?.map((item, index) => (
          <div key={`History_${index}`}>
            <div className={styles.container}>
              <div className={styles.leftColumn}>
                <p style={{ textAlign: "end" }}>
                  {/* Employee Continuing With Company:{" "}
                  <b> {item?.is_continuing ? "Yes" : "No"}</b> */}
                  <span>{<StatusPill status={item?.succession} />}</span>
                </p>
                <p>
                  Intimated for Exit:
                  <b style={{ marginLeft: "10px" }}>
                    {item?.is_intimated_for_exit ? "Yes" : "No"}
                  </b>
                </p>
                <p>
                  Applied for R/E :
                  <b style={{ marginLeft: "10px" }}>
                    {item?.is_applied_for_re ? "Yes" : "No"}
                  </b>
                </p>
                <p>
                  Medical Condition :
                  <b style={{ marginLeft: "10px" }}>
                    {item?.medical_condition ? item?.medical_condition : "-"}
                  </b>
                  {item?.employee_form?.document && (
                    <a
                      href={item?.employee_form?.document}
                      // style={{ marginLeft: "30%" }}
                      target="_blank"
                    >
                      View certificate
                    </a>
                  )}
                </p>
                <p className={styles.datesValue}>
                  <span>Extension/Retention Dates:{" "}</span>
                  <b>
                    {item?.extensionStartAt ? item?.extensionStartAt : "N/A"} -{" "}
                    {item?.extensionEndAt ? item?.extensionEndAt : "N/A"}
                  </b>
                </p>
                <p>
                  Annual Salary: <b>{item?.ctc ? `₹ ${item?.ctc}` : "-"}</b>
                </p>
                <p>
                  Succession Status: <b>{item?.nature_of_succession}</b>

                </p>
                <p className={styles.datesValue}>
                 <span> Replacing Person:{" "}</span>
                  <b>
                    {item?.replacing_employee_name ? (
                      <>
                        {" "}
                        {item?.replacing_employee_name} (
                        {item?.replacing_employee_code})
                      </>
                    ) : (
                      "-"
                    )}
                  </b>
                </p>
              </div>
              <div className={styles.rightColumn}>
                <p>
                  Salary:{" "}
                  <b>
                    {item?.replacing_employee_ctc &&
                      `₹ ${item?.replacing_employee_ctc}`}
                  </b>
                </p>
                <p>
                  Nature of Succession:{" "}
                  {/* <b>{item?.extension_status ? item?.extension_status : "-"}</b> */}
                  {item?.extension_status ? (
                    <b>{item?.extension_status}</b>
                  ) : (
                    <b>- </b>
                  )}
                </p>
                <p>
                  Succession's Cost WRT employee: <b>{item?.wrt}</b>
                </p>
                <p>
                  Pending Dues:{" "}
                  <b>{item?.pending_dues ? item?.pending_dues : "-"}</b>
                </p>
                <p>
                  Decision from MD Office:{" "}
                  {/* <b>{item?.extension_status ? item?.extension_status : "-"}</b> */}
                  {( ["MD_APPROVED", "MD_REJECTED", "CORPORATE_HR_REJECTED", "HOD_REJECTED"].indexOf(item?.status) >= 0) ? (
                    <b>{item?.extension_status}</b>
                  ) : (
                    <b>"PENDING" </b>
                  )}
                </p>
                <p>
                  Notes: <b>{item?.notes ? item?.notes : "-"}</b>
                </p>
              </div>
              <hr />
              {item?.comments && (
                <div className={styles.newContainer}>
                  <div className={styles.heading}>Comments/Notes</div>
                  <div className={styles.commentContainer}>
                    {item?.comments?.map((items) => (
                      <div className={styles.commentwrap}>
                        <div>{items.comment}</div>
                        <div className={styles.commentDate}>
                          {`${items?.actioned_by?.name} | ${items?.actionedAt}`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* <div className={styles.avator}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img src="" className={styles.image} alt="" />
                  <p>Sahil Munjal</p>
                </div>
                <div>10/06/2021 11:10:00</div>
              </div> */}
            </div>
          </div>
        ))
      ) : (
        <div className={styles.nofount}> No Data Found....</div>
      )}
    </div>
  );
};

export default SuccessionHistory;

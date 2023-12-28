import React from "react";
import useEmpTravelDetail from "./EmpTravelDetail.hook";
import styles from "./Style.module.css";
import StatusPill from "../../../../../../components/Status/StatusPill.component";
import UpperClaimInfo from "../../../../../AdminClaimManagement/ClaimListDetail/Component/UpperClaimInfo/UpperClaimInfo";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import history from "../../../../../../libs/history.utils";
import { ButtonBase } from "@material-ui/core";
import { getCurrency, removeUnderScore } from "../../../../../../helper/helper";
import LodgingView from "./component/Lodge/Lodging.view";
import TravelView from "./component/Lodge/TravelCard";
import DaView from "./component/Lodge/DaFields";
import EntertainmentView from "./component/Lodge/Entertainment";
import OtherView from "./component/Lodge/Other";

function EmpTravelDetail() {
  const { id, employeeDetail } = useEmpTravelDetail({});
  return (
    <div>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={"capitalize"}>
              <b>Claim Details</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <UpperClaimInfo data={employeeDetail} isLoc={true} />

      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Travel Details</div>
          <div className={styles.commentContainer}>
            <div className={styles.otherWrap}>
              <div className={styles.mainFlex}>
                <div className={styles.left}>
                  <div className={styles.key}>
                    <span className={styles.value}>TAP No. :</span>
                    {employeeDetail?.imprest?.travelPlanner?.code}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>Tour Type:</span>
                    {employeeDetail?.imprest?.tour_type}
                  </div>
                </div>
                <div className={styles.right}>
                  <div className={styles.key}>
                    <span className={styles.value}>Tour Dates:</span>
                    {
                      employeeDetail?.imprest?.travelPlanner?.startDateText
                    } - {employeeDetail?.imprest?.travelPlanner?.endDateText}
                  </div>

                  <div className={styles.key}>
                    <span className={styles.value}>Status:</span>
                    {
                      <StatusPill
                        status={employeeDetail?.imprest?.travelPlanner?.status}
                        style={{ border: "none" }}
                      />
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {employeeDetail?.lodging_expenses?.length > 0 && (
        <div className={styles.plainPaper}>
          <div className={styles.newContainer}>
            <div className={styles.heading}>Part A: Lodging Expense</div>
            {employeeDetail?.lodging_expenses?.map((item, index) => (
              <LodgingView data={item} key={`lodge_${index}`} />
            ))}
            <div className={styles.totalWrap}>
              <div className={styles.inner}>
                Total Claim Amount:{" "}
                <span>
                  {employeeDetail?.lodging_expenses_amount ||
                  employeeDetail?.lodging_expenses_amount === 0
                    ? `₹ ${employeeDetail?.lodging_expenses_amount}`
                    : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {employeeDetail?.travel_expenses?.length > 0 && (
        <div className={styles.plainPaper}>
          <div className={styles.newContainer}>
            <div className={styles.heading}>Part B: Travel Expense</div>
            {employeeDetail?.travel_expenses?.map((item, index) => (
              <TravelView data={item} key={`travel_${index}`} />
            ))}
            <div className={styles.totalWrap}>
              <div className={styles.inner}>
                Total Claim Amount:{" "}
                <span>
                  {employeeDetail?.travel_expenses_amount ||
                  employeeDetail?.travel_expenses_amount === 0
                    ? `₹ ${employeeDetail?.travel_expenses_amount}`
                    : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {employeeDetail?.da_ie_expenses?.length > 0 && (
        <div className={styles.plainPaper}>
          <div className={styles.newContainer}>
            <div className={styles.heading}>Part C: DA & IE Expenses</div>
            {employeeDetail?.da_ie_expenses?.map((item, index) => (
              <DaView data={item} key={`da_${index}`} />
            ))}
            <div className={styles.totalWrap}>
              <div className={styles.inner}>
                Total Claim Amount:{" "}
                <span>
                  {employeeDetail?.da_ie_expenses_amount ||
                  employeeDetail?.da_ie_expenses_amount === 0
                    ? `₹ ${employeeDetail?.da_ie_expenses_amount}`
                    : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {employeeDetail?.entertainment_expenses?.length > 0 && (
        <div className={styles.plainPaper}>
          <div className={styles.newContainer}>
            <div className={styles.heading}>Part D: Entertainment Expenses</div>
            {employeeDetail?.entertainment_expenses?.map((item, index) => (
              <EntertainmentView data={item} key={`entertainment_${index}`} />
            ))}
            <div className={styles.totalWrap}>
              <div className={styles.inner}>
                Total Claim Amount:{" "}
                <span>
                  {employeeDetail?.entertainment_expenses_amount ||
                  employeeDetail?.entertainment_expenses_amount === 0
                    ? `₹ ${employeeDetail?.entertainment_expenses_amount}`
                    : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {employeeDetail?.other_expenses?.length > 0 && (
        <div className={styles.plainPaper}>
          <div className={styles.newContainer}>
            <div className={styles.heading}>Part D: Entertainment Expenses</div>
            {employeeDetail?.other_expenses?.map((item, index) => (
              <OtherView data={item} key={`other_${index}`} />
            ))}
            <div className={styles.totalWrap}>
              <div className={styles.inner}>
                Total Claim Amount:{" "}
                <span>
                  {employeeDetail?.other_expenses_amount ||
                  employeeDetail?.other_expenses_amount === 0
                    ? `₹ ${employeeDetail?.other_expenses_amount}`
                    : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Imprest Details</div>
          <div className={styles.commentContainer}>
            <div className={styles.otherWrap}>
              <div className={styles.mainFlex}>
                <div className={styles.left}>
                  <div className={styles.key}>
                    <span className={styles.value}>Imprest for tour:</span>
                    {employeeDetail?.imprest?.code
                      ? employeeDetail?.imprest?.code
                      : "N/A"}
                  </div>
                </div>
                <div className={styles.right}>
                  <div className={styles.key}>
                    <span className={styles.value}>Imprest Amount:</span>
                    {employeeDetail?.imprest?.amount ? (
                      <>
                        {getCurrency(employeeDetail?.imprest?.currency)}
                        {employeeDetail?.imprest?.amount}
                      </>
                    ) : (
                      "N/A"
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.heading}>Reimbursable Expense</div>
        <div className={styles.lowerWrapImprest}>
          <div className={styles.headingWrap}>
            Total Expense (self + office):
            <span>
              {employeeDetail?.total_expense
                ? ` ₹ ${employeeDetail?.total_expense}`
                : 0}
            </span>
          </div>
          <div className={styles.headingWrap}>
            Self Borne Expense::
            <span>₹ {employeeDetail?.self_expense}</span>
          </div>
          <div className={styles.headingWrap}>
            Office Borne Expense:
            <span>₹ {employeeDetail?.office_expense}</span>
          </div>
        </div>
        <div className={styles.totalWrap} style={{ marginTop: "20px" }}>
          <div className={styles.inner}>
            Amount to be Refunded:{" "}
            <span>
              {employeeDetail?.claim_amount
                ? `₹ ${employeeDetail?.claim_amount}`
                : 0}
            </span>
          </div>
          {/* <div className={styles.inner32}>
            <CustomTextField
             disabled={!statusCheck}
              type="number"
              label={"Final Amount"}
              value={refundData}
              onTextChange={(text) => {
                setRefundData(text);
              }}
            />
          </div> */}
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Comments/Notes</div>
          <div className={styles.commentContainer}>
            {employeeDetail?.comments &&
              employeeDetail?.comments?.map((item) => (
                <div className={styles.commentwrap}>
                  {(item?.status || item?.panelist_role) && (
                    <div style={{ marginTop: "5px", marginBottom: "5px" }}>
                      <span style={{ fontWeight: "600" }}>
                        {removeUnderScore(item?.panelist_role)}
                      </span>
                      <span style={{ marginLeft: "10px" }}>
                        {
                          <StatusPill
                            status={item?.status}
                            style={{ border: "none" }}
                          />
                        }
                      </span>
                    </div>
                  )}
                  {item?.status !== "WAITING" && item?.status !== "PENDING" && (
                    <>
                      <div>{item?.comment}</div>
                      <div className={styles.commentDate}>
                        {`${item?.employee?.name} (${item?.employee?.code}) | ${item?.updatedAtText}`}
                      </div>
                    </>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>
            Travel Planner Closing Remarks of Employee
          </div>
          <div className={styles.det}>{employeeDetail?.imprest?.comment}</div>
        </div>
      </div>
    </div>
  );
}

export default EmpTravelDetail;

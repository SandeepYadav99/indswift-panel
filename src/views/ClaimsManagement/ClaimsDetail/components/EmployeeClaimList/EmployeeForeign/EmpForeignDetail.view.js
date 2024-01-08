import React from "react";
import useEmpForeignDetail from "./EmpForeignDetail.hook";
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

function EmpForeignDetail() {
  const { id, employeeDetail } = useEmpForeignDetail({});
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
                  Total USD Used:{" "}
                  <span>
                    {employeeDetail?.lodging_expenses_amount_usd ||
                    employeeDetail?.lodging_expenses_amount_usd === 0
                      ? `$ ${employeeDetail?.lodging_expenses_amount_usd}`
                      : "0"}
                  </span>
                </div>
                <div className={styles.inner}>
                  Total Euro Used:{" "}
                  <span>
                    {employeeDetail?.lodging_expenses_amount_eur ||
                    employeeDetail?.lodging_expenses_amount_eur === 0
                      ? `€ ${employeeDetail?.lodging_expenses_amount_eur}`
                      : "0"}
                  </span>
                </div>
                <div className={styles.inner}>
                  Total INR Used:{" "}
                  <span>
                    {employeeDetail?.lodging_expenses_amount ||
                    employeeDetail?.lodging_expenses_amount === 0
                      ? `₹ ${employeeDetail?.lodging_expenses_amount}`
                      : "0"}
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
                  Total USD Used:{" "}
                  <span>
                    {employeeDetail?.travel_expenses_amount_usd ||
                    employeeDetail?.travel_expenses_amount_usd === 0
                      ? `$ ${employeeDetail?.travel_expenses_amount_usd}`
                      : "0"}
                  </span>
                </div>
                <div className={styles.inner}>
                  Total Euro Used:{" "}
                  <span>
                    {employeeDetail?.travel_expenses_amount_eur ||
                    employeeDetail?.travel_expenses_amount_eur === 0
                      ? `€ ${employeeDetail?.travel_expenses_amount_eur}`
                      : "0"}
                  </span>
                </div>
                <div className={styles.inner}>
                  Total INR Used:{" "}
                  <span>
                    {employeeDetail?.travel_expenses_amount ||
                    employeeDetail?.travel_expenses_amount === 0
                      ? `₹ ${employeeDetail?.travel_expenses_amount}`
                      : "0"}
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
                  Total USD Used:{" "}
                  <span>
                    {employeeDetail?.da_ie_expenses_amount_usd ||
                    employeeDetail?.da_ie_expenses_amount_usd === 0
                      ? `$ ${employeeDetail?.da_ie_expenses_amount_usd}`
                      : "0"}
                  </span>
                </div>
                <div className={styles.inner}>
                  Total Euro Used:{" "}
                  <span>
                    {employeeDetail?.da_ie_expenses_amount_eur ||
                    employeeDetail?.da_ie_expenses_amount_eur === 0
                      ? `€ ${employeeDetail?.da_ie_expenses_amount_eur}`
                      : "0"}
                  </span>
                </div>
                <div className={styles.inner}>
                  Total INR Used:{" "}
                  <span>
                    {employeeDetail?.da_ie_expenses_amount ||
                    employeeDetail?.da_ie_expenses_amount === 0
                      ? `₹ ${employeeDetail?.da_ie_expenses_amount}`
                      : "0"}
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
                  Total USD Used:{" "}
                  <span>
                    {employeeDetail?.entertainment_expenses_amount_usd ||
                    employeeDetail?.entertainment_expenses_amount_usd === 0
                      ? `$ ${employeeDetail?.entertainment_expenses_amount_usd}`
                      : "0"}
                  </span>
                </div>
                <div className={styles.inner}>
                  Total Euro Used:{" "}
                  <span>
                    {employeeDetail?.entertainment_expenses_amount_eur ||
                    employeeDetail?.entertainment_expenses_amount_eur === 0
                      ? `€ ${employeeDetail?.entertainment_expenses_amount_eur}`
                      : "0"}
                  </span>
                </div>
                <div className={styles.inner}>
                  Total INR Used:{" "}
                  <span>
                    {employeeDetail?.entertainment_expenses_amount ||
                    employeeDetail?.entertainment_expenses_amount === 0
                      ? `₹ ${employeeDetail?.entertainment_expenses_amount}`
                      : "0"}
                  </span>
                </div>
              </div>
          </div>
        </div>
      )}
      {employeeDetail?.tap_other_expenses?.length > 0 && (
        <div className={styles.plainPaper}>
          <div className={styles.newContainer}>
            <div className={styles.heading}>Part E: Other Expenses</div>
            {employeeDetail?.tap_other_expenses?.map((item, index) => (
              <OtherView data={item} key={`other_${index}`} />
            ))}
              <div className={styles.totalWrap}>
                <div className={styles.inner}>
                  Total USD Used:{" "}
                  <span>
                    {employeeDetail?.tap_other_expenses_amount_usd ||
                    employeeDetail?.tap_other_expenses_amount_usd === 0
                      ? `$ ${employeeDetail?.tap_other_expenses_amount_usd}`
                      : "0"}
                  </span>
                </div>
                <div className={styles.inner}>
                  Total Euro Used:{" "}
                  <span>
                    {employeeDetail?.tap_other_expenses_amount_eur ||
                    employeeDetail?.tap_other_expenses_amount_eur === 0
                      ? `€ ${employeeDetail?.tap_other_expenses_amount_eur}`
                      : "0"}
                  </span>
                </div>
                <div className={styles.inner}>
                  Total INR Used:{" "}
                  <span>
                    {employeeDetail?.tap_other_expenses_amount ||
                    employeeDetail?.tap_other_expenses_amount === 0
                      ? `₹ ${employeeDetail?.tap_other_expenses_amount}`
                      : "0"}
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
        <div className={styles.heading}>Summary</div>
        {/* <div className={styles.lowerWrapImprest}>
          <div className={styles.headingWrap} style={{ marginBottom: "20px" }}>
            Imprest for tour:
            <span>
              {employeeDetail?.imprest?.code
                ? employeeDetail?.imprest?.code
                : "N/A"}
            </span>
          </div>
          <div className={styles.headingWrap}>
            Amount:
            <span>
              {employeeDetail?.imprest?.amount ? (
                <>
                  {getCurrency(employeeDetail?.imprest?.currency)}
                  {employeeDetail?.imprest?.amount}
                </>
              ) : (
                "N/A"
              )}
            </span>
          </div>
        </div> */}
        <div className={styles.lowerWrapImprest}>
          <div className={styles.headingWrap}>
            Currency Used:
            <span>USD</span>
          </div>
          <div className={styles.headingWrap}>
            Amount:
            <span>
              {getCurrency("USD")}
              {employeeDetail?.imprest_summary?.amount_usd
                ? employeeDetail?.imprest_summary?.amount_usd
                : 0}
            </span>
          </div>
          <div className={styles.headingWrap}>
            Conversion Rate:
            <span>
              {employeeDetail?.imprest_summary?.conversion_rate_usd
                ? employeeDetail?.imprest_summary?.conversion_rate_usd
                : "-"}
            </span>
          </div>
          <div className={styles.headingWrap}>
            Amount after conversion:
            <span>
              {getCurrency("INR")}
              {employeeDetail?.imprest_summary?.converted_amount_usd
                ? employeeDetail?.imprest_summary?.converted_amount_usd
                : 0}
            </span>
          </div>
        </div>
        <div className={styles.lowerWrapImprest2}>
          <div className={styles.headingWrap}>
            Currency Used:
            <span>EURO</span>
          </div>
          <div className={styles.headingWrap}>
            Amount:
            <span>
              {getCurrency("EUR")}
              {employeeDetail?.imprest_summary?.amount_eur
                ? employeeDetail?.imprest_summary?.amount_eur
                : 0}
            </span>
          </div>
          <div className={styles.headingWrap}>
            Conversion Rate:
            <span>
              {" "}
              {employeeDetail?.imprest_summary?.conversion_rate_eur
                ? employeeDetail?.imprest_summary?.conversion_rate_eur
                : "-"}
            </span>
          </div>
          <div className={styles.headingWrap}>
            Amount after conversion:
            <span>
              {getCurrency("INR")}
              {employeeDetail?.imprest_summary?.converted_amount_eur
                ? employeeDetail?.imprest_summary?.converted_amount_eur
                : 0}
            </span>
          </div>
        </div>
        <div className={styles.lowerWrapImprest2}>
          <div className={styles.headingWrap}>
            Currency Used:
            <span>INR</span>
          </div>
          <div className={styles.headingWrap}>
            Amount:
            <span>
              {getCurrency("INR")}
              {employeeDetail?.imprest_summary?.converted_amount
                ? employeeDetail?.imprest_summary?.converted_amount
                : 0}
            </span>
          </div>
          <div className={styles.headingWrap}>
            Conversion Rate:
            <span>1</span>
          </div>
          <div className={styles.headingWrap}>
            Amount after conversion:
            <span>
              {getCurrency("INR")}
              {employeeDetail?.imprest_summary?.converted_amount
                ? employeeDetail?.imprest_summary?.converted_amount
                : 0}
            </span>
          </div>
        </div>
        <div className={styles.totalWrap2}>
          <div className={styles.inner}>
            Total Amount in INR:
            <span>
              {employeeDetail?.total_expense
                ? `₹ ${employeeDetail?.total_expense}`
                : 0}
            </span>
          </div>
          <div className={styles.inner} style={{ marginRight: "30px" }}>
            Imprest amount INR conversion:
            <span>
              {employeeDetail?.imprest_converted_amount
                ? `₹ ${employeeDetail?.imprest_converted_amount}`
                : 0}
            </span>
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
                            status={removeUnderScore(item?.status)}
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

export default EmpForeignDetail;

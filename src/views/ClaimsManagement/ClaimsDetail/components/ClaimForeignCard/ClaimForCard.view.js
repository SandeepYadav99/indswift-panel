import React from "react";
import useClaimForCard from "./ClaimForCard.hook";
import styles from "./Style.module.css";
import { ButtonBase, CircularProgress } from "@material-ui/core";
import history from "../../../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ClaimUpperCard from "../ClaimUpperCard/ClaimUpperCard";
import CustomAutoComplete from "../../../../../components/FormFields/AutoCompleteText/CustomAutoComplete";
import StatusPill from "../../../../../components/Status/StatusPill.component";
import { getCurrency, removeUnderScore } from "../../../../../helper/helper";
import LodgingIncludeForm from "./component/Lodgingincludes/LodgingIncludes.component";
import ExpenseIncludeForm from "./component/Expenseincludes/ExpenseIncludes.component";
import DAIncludeForm from "./component/DAincludes/DAIncludes.component";
import OtherDetailsIncludeForm from "./component/OtherDetailsincludes/OtherDetailsIncludes.component";
import OtherIncludeForm from "./component/Otherincludes/OtherIncludes.component";

function ClaimForCard() {
  const {
    employeeDetails,
    employees,
    form,
    changeTextData,
    handleSubmit,
    isLoading,
    errorData,
    declaration,
    setDeclaration,
    travelRef,
    otherRef,
    lodgeRef,
    daRef,
    enterRef,
    startDate,
    endDate,
    CoPass,
    tourType,
    changeAmount,
    setCurrency,
    getTotalValue,
    setOfficeAmount,
    officeAmount,
    getRefundAmount,
    setOfficeAmount2,
    officeAmount2,
    imprestAmount,
    isCP,
    InrAmount,
    EuroAmount,
    USDAmount,
    curr,
    USDtoINR,
    EurotoINR,
    imprestINRAmount,
    getOfficeAmount,
    setOfficeAmount3,
    setOfficeAmount4,
  } = useClaimForCard({});

  console.log("form", form);
  return (
    <>
      <div className={styles.outerFlex}>
        <div>
          <ButtonBase onClick={() => history.goBack()}>
            <ArrowBackIosIcon fontSize={"small"} />{" "}
            <span className={"capitalize"}>
              <b>Travel Claim Form</b>
            </span>
          </ButtonBase>
          <div className={styles.newLine} />
        </div>
      </div>
      <ClaimUpperCard data={employeeDetails} />
      <div className={styles.plainPaper}>
        <b className={"capitalize"}>Travel Plan Details</b>
        <div className={styles.AutoWrap}>
          <div className={styles.tapWrap}>
            {/* {listData?.length > 0 && ( */}
            <div className="formGroup" style={{ paddingLeft: "0" }}>
              <CustomAutoComplete
                autoCompleteProps={{
                  freeSolo: false,
                  getOptionLabel: (option) => option.code,
                }}
                dataset={employees ? employees : []}
                datasetKey={"code"}
                onTextChange={(text, value) => {
                  changeTextData(text, "travel_planner_id");
                }}
                variant={"outlined"}
                label={"Choose your Travel Plan Application (TAP)"}
                name={"travel_planner_id"}
                isError={errorData?.travel_planner_id}
                value={form?.travel_planner_id}
              />
            </div>
            {/* )} */}
          </div>
          {typeof form?.travel_planner_id === "object" && (
            <div className={styles.write}>
              <div className={styles.key}>
                <span className={styles.wrap}>Tour Date</span>
                {form?.travel_planner_id?.startDateText} -
                {form?.travel_planner_id?.endDateText}
              </div>
              <div className={styles.key}>
                <span className={styles.wrap}>Status:</span>
                <StatusPill
                  status={removeUnderScore(form?.travel_planner_id?.status)}
                  style={{ background: "transparent", border: "none" }}
                />
              </div>
              <div className={styles.key}>
                <span className={styles.wrap}>Tour Type:</span>
                {form?.travel_planner_id?.tour_type}
              </div>
            </div>
          )}
        </div>
        {typeof form?.travel_planner_id === "object" && (
          <>
            <div className={styles.verti}></div>
            <div className={styles.heading}>Co- traveller Details</div>
            {form?.travel_planner_id?.co_passengers?.map((item) => (
              <div className={styles.nameWrap}>
                <div className={styles.key} style={{ marginBottom: "3px" }}>
                  {`${item?.name} ( ${item?.emp_code})`}{" "}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Travel Details</div>
          <div>
            <LodgingIncludeForm
              startDate={startDate}
              endDate={endDate}
              CoPass={CoPass}
              ref={lodgeRef}
              grade={employeeDetails?.grade?.code}
              changeAmount={changeAmount}
              tourType={tourType}
              setCurrency={setCurrency}
              setOfficeAmount={setOfficeAmount}
              curr={curr}
            />
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Part B: Travel Expense</div>
          <div>
            <ExpenseIncludeForm
              startDate={startDate}
              endDate={endDate}
              CoPass={CoPass}
              ref={travelRef}
              grade={employeeDetails?.grade?.code}
              changeAmount={changeAmount}
              setOfficeAmount2={setOfficeAmount2}
              curr={curr}
            />
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Part C: DA & IE Expenses</div>
          <div>
            <DAIncludeForm
              startDate={startDate}
              endDate={endDate}
              CoPass={CoPass}
              ref={daRef}
              grade={employeeDetails?.grade?.code}
              changeAmount={changeAmount}
              isCP={isCP}
            />
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Part D: Entertainment Expenses</div>
          <div>
            <OtherDetailsIncludeForm
              ref={enterRef}
              grade={employeeDetails?.grade?.code}
              startDate={startDate}
              endDate={endDate}
              changeAmount={changeAmount}
              setOfficeAmount3={setOfficeAmount3}
              curr={curr}
            />
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Part E: Other Expenses</div>
          <div>
            <OtherIncludeForm
              ref={otherRef}
              grade={employeeDetails?.grade?.code}
              startDate={startDate}
              endDate={endDate}
              changeAmount={changeAmount}
              setOfficeAmount4={setOfficeAmount4}
              curr={curr}
            />
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.heading}>Summary</div>
        <div className={styles.lowerWrapImprest}>
          <div className={styles.headingWrap}>
            Imprest for tour:
            <span>{form?.travel_planner_id?.myImprest?.code}</span>
          </div>
          <div className={styles.headingWrap}>
            Amount:
            <span>
              {getCurrency(form?.travel_planner_id?.myImprest?.currency)}
              {imprestAmount ? imprestAmount : 0}
            </span>
          </div>
        </div>
        <div className={styles.Vertiva}></div>
        <div className={styles.lowerWrapImprest}>
          <div className={styles.headingWrap}>
            Currency Used:
            <span>USD</span>
          </div>
          <div className={styles.headingWrap}>
            Amount:
            <span>
              {getCurrency("USD")}
              {USDAmount ? USDAmount : 0}
            </span>
          </div>
          <div className={styles.headingWrap}>
            Conversion Rate:
            <span>{curr?.length > 0 ? curr[1]?.conversion_rate : "-"}</span>
          </div>
          <div className={styles.headingWrap}>
            Amount after conversion:
            <span>
              {getCurrency("INR")}
              {USDtoINR ? USDtoINR : 0}
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
              {EuroAmount ? EuroAmount : 0}
            </span>
          </div>
          <div className={styles.headingWrap}>
            Conversion Rate:
            <span>{curr?.length > 0 ? curr[0]?.conversion_rate : "-"}</span>
          </div>
          <div className={styles.headingWrap}>
            Amount after conversion:
            <span>
              {getCurrency("INR")}
              {EurotoINR ? EurotoINR : 0}
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
              {InrAmount ? InrAmount : 0}
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
              {InrAmount ? InrAmount : 0}
            </span>
          </div>
        </div>
        <div className={styles.totalWrap}>
          <div className={styles.inner}>
            Total Amount in INR:
            <span>{getTotalValue ? `₹ ${getTotalValue}` : 0}</span>
          </div>
          <div className={styles.inner} style={{ marginRight: "30px" }}>
            Imprest amount INR conversion:
            <span>{imprestINRAmount ? `₹ ${imprestINRAmount}` : 0}</span>
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.heading}>Reimbursable Expense</div>
        <div className={styles.lowerWrapImprest}>
          <div className={styles.headingWrap}>
            Total Expense (self + office):
            <span>{getTotalValue ? ` ₹ ${getTotalValue}` : 0}</span>
          </div>
          <div className={styles.headingWrap}>
            Self Borne Expense:
            <span>
              ₹{" "}
              {Number(getTotalValue) -
                (Number(getOfficeAmount))}
            </span>
          </div>
          <div className={styles.headingWrap}>
            Office Borne Expense:
            <span>₹ {Number(getOfficeAmount)}</span>
          </div>
        </div>
        <div className={styles.totalWrap}>
          <div className={styles.inner}>
            Amount to be Refunded:{" "}
            <span>{getRefundAmount ? `₹ ${getRefundAmount}` : 0}</span>
          </div>
        </div>
      </div>
      <div className={styles.cleckboxWrapper}>
        <div className={styles.checkBox}>
          <input
            checked={declaration}
            type="checkbox"
            id="confirmation"
            name="confirmation"
            onChange={() => {
              setDeclaration((s) => !s);
            }}
          />
          <label htmlFor="confirmation">
            {" "}
            I confirm that all the details and attachments are true and no
            duplicate claim for any documents is made by me or my travel plan
            co-travellers.
          </label>
          <br />
        </div>
      </div>
      <div className={styles.btnCont}>
        <ButtonBase
          type={"button"}
          disabled={!declaration || isLoading ? true : false}
          className={declaration ? styles.createBtn : styles.disabledCreatebtn}
          onClick={handleSubmit}
        >
          {isLoading ? (
            <CircularProgress color="success" size="20px" />
          ) : (
            "Submit"
          )}
        </ButtonBase>
      </div>
    </>
  );
}

export default ClaimForCard;

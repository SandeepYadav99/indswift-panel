import React from "react";
import styles from "./Style.module.css";
import constants from "../../../../../config/constants";

function TaxData({ employeeDetail }) {
  console.log("data", employeeDetail);
  const getUrl = (data) => {
    if (data?.length > 0) {
      return (
        <div className={styles.urlWrap}>
          {data?.map((item, index) => (
            <a
              key={`Image_show_${index}`}
              href={constants?.UPLOADER_URL + item}
              target="_blank"
            >
              <div className={styles.hyperlinkText}>
                View Evidence {index + 1}
              </div>
            </a>
          ))}
        </div>
      );
    }
    return "-";
  };
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.heading}>House Rent Allowance</div>
        <div>
          {employeeDetail?.house_rent?.length > 0 &&
            employeeDetail?.house_rent?.map((item, key) => (
              <div className={styles.mainFlex} key={`upper_${key}`}>
                <div className={styles.left}>
                  <div className={styles.key}>
                    <span className={styles.value}>Landlord Name:</span>
                    {item?.landlord_name}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>Address of Landlord:</span>
                    {item?.landlord_address}
                  </div>
                  <div className={styles.key}>
                    {getUrl(item?.house_rent_evidence)}
                  </div>
                </div>
                <div className={styles.right}>
                  <div className={styles.key}>
                    <span className={styles.value}>Rent Paid:</span>
                    {item?.rent && `₹ ${item?.rent}`}
                  </div>
                  <div className={styles.key}>
                    <span className={styles.value}>Landlord PAN:</span>
                    {item?.landlord_pan}
                  </div>
                </div>
              </div>
            ))}
        </div>
        {/* <div className={styles.verticalLine}></div> */}
        <div className={styles.totalWrap}>
          <div className={styles.inner}>
            Total Amount :
            <span>
              {employeeDetail?.house_rent_total
                ? `₹ ${employeeDetail?.house_rent_total}`
                : 0}
            </span>
          </div>
          <div className={styles.inner} style={{ marginRight: "30px" }}>
            Permitted HRA Allowance:
            <span>
              {employeeDetail?.hra_permitted
                ? `₹ ${employeeDetail?.hra_permitted}`
                : 0}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.heading}>Deduction of Interest on Borrowing</div>
        <div className={styles.mainFlex}>
          <div className={styles.left}>
            <div className={styles.key}>
              <span className={styles.value}>Lender Name:</span>
              {employeeDetail?.lender_name}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Address of Lender:</span>
              {employeeDetail?.lender_address}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>
                Financial Institutions (if available):
              </span>
              {employeeDetail?.financial_institutions}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Others:</span>
              {employeeDetail?.others}
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.key}>
              <span className={styles.value}>
                Interest payable/paid to the lender:
              </span>
              {employeeDetail?.interest_paid &&
                `₹ ${employeeDetail?.interest_paid}`}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Lender PAN:</span>
              {employeeDetail?.lender_pan}
            </div>

            <div className={styles.key}>
              <span className={styles.value}>Employer (if available):</span>
              {employeeDetail?.employer}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>
                {getUrl(employeeDetail?.deduction_borrowing_evidences)}
              </span>
            </div>
          </div>
        </div>
        {/* <div className={"formFlex"}>
          <TotalSum
            firstName="Total Dues to be Paid : "
            firstAmount={
              employeeDetail?.total_dues ? `₹ ${employeeDetail?.total_dues}` : 0
            }
          />
        </div> */}
      </div>

      <div className={styles.plainPaper}>
        <div className={styles.heading}>Deduction under Chapter VI-A</div>
        <div className={styles.headingLast}>(i) Section 80C</div>
        <div className={styles.mainFlex}>
          <div className={styles.left}>
            <div className={styles.key}>
              <span className={styles.value}>Life Insurance Amount:</span>
              {employeeDetail?.life_insurance &&
                `₹ ${employeeDetail?.life_insurance}`}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Term Insurance Amount:</span>
              {employeeDetail?.term_insurance &&
                `₹ ${employeeDetail?.term_insurance}`}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Mutual Funds Amount:</span>
              {employeeDetail?.mutual_funds &&
                `₹ ${employeeDetail?.mutual_funds}`}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>
                Sukanya Samriddhi Scheme Amount:
              </span>
              {employeeDetail?.sukanya_samriddhi &&
                `₹ ${employeeDetail?.sukanya_samriddhi}`}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>
                Tuition Fees of Child (max. 2):
              </span>
              {employeeDetail?.car_maintenance_recovery &&
                `₹ ${employeeDetail?.car_maintenance_recovery}`}
            </div>
            {employeeDetail?.child_fees?.length > 0 &&
              employeeDetail?.child_fees?.map((item, index) => (
                <div className={styles.key} key={`child_${index}`}>
                  <span className={styles.value}>Amount :</span>
                  {item?.amount && `₹ ${item?.amount}`}
                </div>
              ))}
            <div className={styles.key}>
              <span className={styles.value}>
                Employee Provident Fund Amount :
              </span>
              {employeeDetail?.epf && `₹ ${employeeDetail?.epf}`}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>PPF Amount:</span>
              {employeeDetail?.ppf && `₹ ${employeeDetail?.ppf}`}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>
                Principle of Housing Loan Repayment Amount:
              </span>
              {employeeDetail?.house_loan_principle &&
                `₹ ${employeeDetail?.house_loan_principle}`}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>
                Five year Fixed Deposit Amount:
              </span>
              {employeeDetail?.fd_five_year &&
                `₹ ${employeeDetail?.fd_five_year}`}
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.key}>
              <span className={styles.value}>
                {getUrl(employeeDetail?.life_insurance_evidence)}
              </span>
            </div>
            <div className={styles.key}>
              <span className={styles.value}>
                {getUrl(employeeDetail?.term_insurance_evidence)}
              </span>
            </div>
            <div className={styles.key}>
              <span className={styles.value}>
                {getUrl(employeeDetail?.mutual_funds_evidence)}
              </span>
            </div>
            <div className={styles.key}>
              <span className={styles.value}>
                {getUrl(employeeDetail?.sukanya_samriddhi_evidence)}
              </span>
            </div>
            {employeeDetail?.child_fees?.length > 0 &&
              employeeDetail?.child_fees?.map((item, index) => (
                <div className={styles.key} key={`child_URL${index}`}>
                  {getUrl(item?.child_fees_evidence)}
                </div>
              ))}
            <div className={styles.key}>
              <span className={styles.value}>
                {getUrl(employeeDetail?.epf_evidence)}
              </span>
            </div>
            <div className={styles.key}>
              <span className={styles.value}>
                {getUrl(employeeDetail?.ppf_evidence)}
              </span>
            </div>
            <div className={styles.key}>
              <span className={styles.value}>
                {getUrl(employeeDetail?.house_loan_principle_evidence)}
              </span>
            </div>
            <div className={styles.key}>
              <span className={styles.value}>
                {getUrl(employeeDetail?.fd_five_year_evidence)}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.verticalLine}></div>
        <div className={styles.headingLast}>(ii) Section 80CCC</div>
        <div className={styles.mainFlex}>
          <div className={styles.left}>
            <div className={styles.key}>
              <span className={styles.value}>Amount:</span>
              {employeeDetail?.eighty_ccc && `₹ ${employeeDetail?.eighty_ccc}`}
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.key}>
              <span className={styles.value}>
                {getUrl(employeeDetail?.eighty_ccc_evidence)}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.verticalLine}></div>
        <div className={styles.headingLast}>(iii) Section 80CCD</div>
        <div className={styles.mainFlex}>
          <div className={styles.left}>
            <div className={styles.key}>
              <span className={styles.value}>Amount:</span>
              {employeeDetail?.eighty_ccd && `₹ ${employeeDetail?.eighty_ccd}`}
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.key}>
              <span className={styles.value}>
                {getUrl(employeeDetail?.eighty_ccd_evidence)}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.totalWrap}>
          <div className={styles.inner}>
            Total Amount under (A):
            <span>
              {employeeDetail?.total_eighty_c
                ? `₹ ${employeeDetail?.total_eighty_c}`
                : 0}
            </span>
          </div>
          <div className={styles.inner} style={{ marginRight: "30px" }}>
            Note: Maximum of (A) is 1.5 lacs
          </div>
        </div>
        <div className={styles.heading} style={{ marginTop: "10px" }}>
          (B) Section 80D
        </div>
        <div className={styles.mainFlex}>
          <div className={styles.left}>
            <div className={styles.key}>
              <span className={styles.value}>Self Insurance Amount:</span>
              {employeeDetail?.family_insurance &&
                `₹ ${employeeDetail?.family_insurance}`}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Preventive Health Check Up :</span>
              {employeeDetail?.family_phc && `₹ ${employeeDetail?.family_phc}`}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Medical Expenditure</span>
              {employeeDetail?.family_medical_expenditure &&
                `₹ ${employeeDetail?.family_medical_expenditure}`}
            </div>

            <div className={styles.key}>
              <span className={styles.value}>
                Parents are Senior Citizens?:
              </span>
              {employeeDetail?.is_parents_senior_citizen ? "YES" : "NO"}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>
                Parents medical Insurance Amount:
              </span>
              {employeeDetail?.parents_insurance &&
                `₹ ${employeeDetail?.parents_insurance}`}
            </div>

            <div className={styles.key}>
              <span className={styles.value}>
                Preventive Health Check Up Amount:
              </span>
              {employeeDetail?.parents_phc &&
                `₹ ${employeeDetail?.parents_phc}`}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Medical Expenditure Amount:</span>
              {employeeDetail?.parents_medical_expenditure &&
                `₹ ${employeeDetail?.parents_medical_expenditure}`}
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.key}>
              <span className={styles.value}>
                {getUrl(employeeDetail?.family_insurance_evidence)}
              </span>
            </div>
            <div className={styles.key}>
              <span className={styles.value}>
                {getUrl(employeeDetail?.family_phc_evidence)}
              </span>
            </div>
            <div className={styles.key}>
              <span className={styles.value}>
                {getUrl(employeeDetail?.family_medical_expenditure_evidence)}
              </span>
            </div>
            <div className={styles.key}>
              <span className={styles.value}>
                {/* {getUrl(nya_samriddhi_evidence)} */}
              </span>
            </div>
            <div className={styles.key}>
              <span className={styles.value}>
                {getUrl(employeeDetail?.parents_insurance_evidence)}
              </span>
            </div>
            <div className={styles.key}>
              <span className={styles.value}>
                {getUrl(employeeDetail?.parents_phc_evidence)}
              </span>
            </div>
            <div className={styles.key}>
              <span className={styles.value}>
                {getUrl(employeeDetail?.parents_medical_expenditure_evidence)}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.totalWrap}>
          <div className={styles.inner}>
            Total Amount for Self under (B):
            <span>
              {employeeDetail?.total_eighty_d
                ? `₹ ${employeeDetail?.total_eighty_d}`
                : 0}
            </span>
          </div>
          <div className={styles.inner}>
            Total Amount for Family under (B):
            <span>
              {employeeDetail?.total_family_amount
                ? `₹ ${employeeDetail?.total_family_amount}`
                : 0}
            </span>
          </div>
          <div className={styles.inner} style={{ marginRight: "30px" }}>
            Note: Maximum of (B) is for individual 25,000 & parents 50,000 per
            annum
          </div>
        </div>
        <div className={styles.heading} style={{ marginTop: "10px" }}>
          (C) Other sections
        </div>
        <div className={styles.mainFlex}>
          <div className={styles.left}>
            <div className={styles.key}>
              <span className={styles.value}>
                Section 80CCD(1B) Additional Employee Contribution Amount:
              </span>
              {employeeDetail?.employee_contribution
                ? `₹ ${employeeDetail?.employee_contribution}`
                : "-"}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>
                Section 80E Education Loan for Studies Amount:
              </span>
              {employeeDetail?.education_loan
                ? `₹ ${employeeDetail?.education_loan}`
                : "-"}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>
                Section 80G Donations Paid Amount
              </span>
              {employeeDetail?.donations
                ? `₹ ${employeeDetail?.donations}`
                : "-"}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>
                Section 80U Person with Disability Amount:
              </span>
              {employeeDetail?.disability
                ? `₹ ${employeeDetail?.disability}`
                : "-"}
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.key}>
              <span className={styles.value}>
                {getUrl(employeeDetail?.employee_contribution_evidence)}
              </span>
            </div>
            <div className={styles.key}>
              <span className={styles.value}>
                {getUrl(employeeDetail?.education_loan_evidence)}
              </span>
            </div>
            <div className={styles.key}>
              <span className={styles.value}>
                {getUrl(employeeDetail?.donations_evidence)}
              </span>
            </div>
            <div className={styles.key}>
              <span className={styles.value}>
                {getUrl(employeeDetail?.disability_evidence)}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.totalWrap}>
          <div className={styles.inner}>
            Total Amount under (C) :
            <span>
              {employeeDetail?.total_other
                ? `₹ ${employeeDetail?.total_other}`
                : 0}
            </span>
          </div>
          <div className={styles.inner} style={{ marginRight: "30px" }}>
            Total Amount under Deduction under Chapter VI-A: ₹80,000
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaxData;

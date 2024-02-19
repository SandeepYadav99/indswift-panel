import React from "react";
import styles from "./Style.module.css";
import StatusPill from "../../../../../components/Status/StatusPill.component";
import TotalSum from "../../../../EmployeeEdit/components/TotalSum/TotalSum";

function PayData({ employeeDetail }) {
  return (
    <div>
      <div className={styles.plainPaper}>
        <div className={styles.heading}>Part 2 : Dues to be Paid</div>
        <div className={styles.heading}>Payroll 1</div>
        <div>
          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value221}>Month:</span>
                {employeeDetail?.payroll_one_month}
              </div>
              <div className={styles.key}>
                <span className={styles.value221}>Value:</span>
                {employeeDetail?.payroll_one_value &&
                  `₹ ${employeeDetail?.payroll_one_value}`}
              </div>
              <div className={styles.key}>
                <a
                  href={employeeDetail?.payroll_one_salary_slip}
                  target="_blank"
                >
                  <div className={styles.hyperlinkText}>View Salary Slip</div>
                </a>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value221}>Paid Days:</span>
                {employeeDetail?.payroll_one_paid_days}
              </div>
              <div className={styles.key}>
                <span className={styles.value221}>Status:</span>
                {
                  <StatusPill
                    status={employeeDetail?.payroll_one_status}
                    style={{ border: "none" }}
                  />
                }
              </div>
            </div>
          </div>
        </div>
        <div className={styles.heading}>Payroll 2</div>
        <div>
          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value221}>Month:</span>
                {employeeDetail?.payroll_two_month}
              </div>
              <div className={styles.key}>
                <span className={styles.value221}>Value:</span>
                {employeeDetail?.payroll_two_value &&
                  `₹ ${employeeDetail?.payroll_two_value}`}
              </div>
              <div className={styles.key}>
                <a
                  href={employeeDetail?.payroll_two_salary_slip}
                  target="_blank"
                >
                  <div className={styles.hyperlinkText}>View Salary Slip</div>
                </a>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value221}>Paid Days:</span>
                {employeeDetail?.payroll_two_paid_days}
              </div>
              <div className={styles.key}>
                <span className={styles.value221}>Status:</span>
                {
                  <StatusPill
                    status={employeeDetail?.payroll_two_status}
                    style={{ border: "none" }}
                  />
                }
              </div>
            </div>
          </div>
        </div>
        <div className={styles.heading}>Payroll 3</div>
        <div>
          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value221}>Month:</span>
                {employeeDetail?.payroll_three_month}
              </div>
              <div className={styles.key}>
                <span className={styles.value221}>Value:</span>
                {employeeDetail?.payroll_three_value &&
                  `₹ ${employeeDetail?.payroll_three_value}`}
              </div>
              <div className={styles.key}>
                <a
                  href={employeeDetail?.payroll_three_salary_slip}
                  target="_blank"
                >
                  <div className={styles.hyperlinkText}>View Salary Slip</div>
                </a>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value221}>Paid Days:</span>
                {employeeDetail?.payroll_three_paid_days}
              </div>
              <div className={styles.key}>
                <span className={styles.value221}>Status:</span>
                {
                  <StatusPill
                    status={employeeDetail?.payroll_three_status}
                    style={{ border: "none" }}
                  />
                }
              </div>
            </div>
          </div>
          <div className={styles.verticalLine}></div>
          <div className={styles.mainFlex}>
            <div className={styles.left}>
              <div className={styles.key}>
                <span className={styles.value}>Statuory Bonus:</span>
                {employeeDetail?.statutory_bonus &&
                  `₹ ${employeeDetail?.statutory_bonus}`}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Gratuity:</span>
                {employeeDetail?.gratuity && `₹ ${employeeDetail?.gratuity}`}
              </div>{" "}
              <div className={styles.key}>
                <span className={styles.value}>Declared PLI:</span>
                {employeeDetail?.declared_pli &&
                  `₹ ${employeeDetail?.declared_pli}`}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Un-Declared PLI:</span>
                {employeeDetail?.un_declared_pli &&
                  `₹ ${employeeDetail?.un_declared_pli}`}
              </div>{" "}
              <div className={styles.key}>
                <span className={styles.value}>Professional Upgradation:</span>
                {employeeDetail?.professional_upgradation &&
                  `₹ ${employeeDetail?.professional_upgradation}`}
              </div>{" "}
              <div className={styles.key}>
                <span className={styles.value}>Helper Allowance:</span>
                {employeeDetail?.helper_allowance &&
                  `₹ ${employeeDetail?.helper_allowance}`}
              </div>{" "}
              <div className={styles.key}>
                <span className={styles.value}>Food Coupens :</span>
                {employeeDetail?.food_coupon &&
                  `₹ ${employeeDetail?.food_coupon}`}
              </div>{" "}
              <div className={styles.key}>
                <span className={styles.value}>Gift Coupens:</span>
                {employeeDetail?.gift_coupon_bonus &&
                  `₹ ${employeeDetail?.gift_coupon_bonus}`}
              </div>{" "}
              <div className={styles.key}>
                <span className={styles.value}>LTA:</span>
                {employeeDetail?.lta && `₹ ${employeeDetail?.lta}`}
              </div>{" "}
              <div className={styles.key}>
                <span className={styles.value}>Supperannuation:</span>
                {employeeDetail?.superannuation &&
                  `₹ ${employeeDetail?.superannuation}`}
              </div>{" "}
              <div className={styles.key}>
                <span className={styles.value}>Incentive (SI/PI/RI):</span>
                {employeeDetail?.incentive && `₹ ${employeeDetail?.incentive}`}
              </div>{" "}
              <div className={styles.key}>
                <span className={styles.value}>Car Maint:</span>
                {employeeDetail?.car_maintenance &&
                  `₹ ${employeeDetail?.car_maintenance}`}
              </div>{" "}
              <div className={styles.key}>
                <span className={styles.value}>Fuel:</span>
                {employeeDetail?.fuel && `₹ ${employeeDetail?.fuel}`}
              </div>{" "}
              <div className={styles.key}>
                <span className={styles.value}>VPF:</span>
                {employeeDetail?.vpf && `₹ ${employeeDetail?.vpf}`}
              </div>{" "}
            </div>
            <div className={styles.right}>
              <div className={styles.key}>
                <span className={styles.value}>Statuory Bonus Comments:</span>
                {employeeDetail?.statutory_bonus_comment}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Gratuity Comments:</span>
                {employeeDetail?.gratuity_comment}
              </div>{" "}
              <div className={styles.key}>
                <span className={styles.value}>Declared PLI Comments:</span>
                {employeeDetail?.declared_pli_comment}
              </div>
              <div className={styles.key}>
                <span className={styles.value}>Un-Declared PLI Comments:</span>
                {employeeDetail?.un_declared_pli_comment}
              </div>{" "}
              <div className={styles.key}>
                <span className={styles.value}>
                  Professional Upgradation Comments:
                </span>
                {employeeDetail?.professional_upgradation_comment}
              </div>{" "}
              <div className={styles.key}>
                <span className={styles.value}>Helper Allowance Comments:</span>
                {employeeDetail?.helper_allowance_comment}
              </div>{" "}
              <div className={styles.key}>
                <span className={styles.value}>Food Coupens Comments:</span>
                {employeeDetail?.food_coupon_comment}
              </div>{" "}
              <div className={styles.key}>
                <span className={styles.value}>Gift Coupens Comments:</span>
                {employeeDetail?.gift_coupon_bonus_comment}
              </div>{" "}
              <div className={styles.key}>
                <span className={styles.value}>LTA Comments:</span>
                {employeeDetail?.lta_comment}
              </div>{" "}
              <div className={styles.key}>
                <span className={styles.value}>Supperannuation Comments:</span>
                {employeeDetail?.superannuation_comment}
              </div>{" "}
              <div className={styles.key}>
                <span className={styles.value}>
                  Incentive (SI/PI/RI) Comments:
                </span>
                {employeeDetail?.incentive_comment}
              </div>{" "}
              <div className={styles.key}>
                <span className={styles.value}>Car Maint Comments:</span>
                {employeeDetail?.car_maintenance_comment}
              </div>{" "}
              <div className={styles.key}>
                <span className={styles.value}>Fuel Comments:</span>
                {employeeDetail?.fuel_comment}
              </div>{" "}
              <div className={styles.key}>
                <span className={styles.value}>VPF Comments:</span>
                {employeeDetail?.vpf_comment}
              </div>{" "}
            </div>
          </div>
        </div>
        <div className={styles.verticalLine}></div>
        <div className={styles.mainFlex}>
          <div className={styles.left}>
            <div className={styles.key}>
              <span className={styles.value}>
                EL Balance (Opening-Consumed):
              </span>
              {employeeDetail?.el_balance}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Comments:</span>
              {employeeDetail?.el_balance_comment}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>EL of Current Service Year:</span>
              {employeeDetail?.el_currnet_service_year}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Comments:</span>
              {employeeDetail?.el_currnet_service_year_comment}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>FEL (Freezed Earned Leave):</span>
              {employeeDetail?.fel}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Comments:</span>
              {employeeDetail?.fel_comment}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>
                RBL (Retirement Bank Leave) :
              </span>
              {employeeDetail?.rbl}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Comments:</span>
              {employeeDetail?.rbl_comment}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>NFH or OT Payout Value:</span>
              {employeeDetail?.nfh}
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.key}>
              <span className={styles.value}>Value:</span>
              {employeeDetail?.el_balance_value &&
                `₹ ${employeeDetail?.el_balance_value}`}
            </div>
            <div className={styles.key}>
              <span className={styles.value}></span>
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Value:</span>
              {employeeDetail?.el_currnet_service_year_value &&
                `₹ ${employeeDetail?.el_currnet_service_year_value}`}
            </div>
            <div className={styles.key}>
              <span className={styles.value}></span>
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Value:</span>
              {employeeDetail?.fel_value && `₹ ${employeeDetail?.fel_value}`}
            </div>
            <div className={styles.key}>
              <span className={styles.value}></span>
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Value:</span>
              {employeeDetail?.rbl_value && `₹ ${employeeDetail?.rbl_value}`}
            </div>
            <div className={styles.key}>
              <span className={styles.value}></span>
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Comments:</span>
              {employeeDetail?.nfh_comment}
            </div>
          </div>
        </div>
        <div className={"formFlex"}>
          <TotalSum
            firstName="Total Dues to be Paid : "
            firstAmount={
              employeeDetail?.total_dues ? `₹ ${employeeDetail?.total_dues}` : 0
            }
          />
        </div>
      </div>

      <div className={styles.plainPaper}>
        <div className={styles.heading}>Part 3 : Dues to be Recovered</div>
        <div className={styles.mainFlex}>
          <div className={styles.left}>
            <div className={styles.key}>
              <span className={styles.value}>Employee PF:</span>
              {employeeDetail?.pf && `₹ ${employeeDetail?.pf}`}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Employee ESI:</span>
              {employeeDetail?.esi && `₹ ${employeeDetail?.esi}`}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>Labour Welfare Fund:</span>
              {employeeDetail?.labour_welfare_fund &&
                `₹ ${employeeDetail?.labour_welfare_fund}`}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>Mobile Device Recovery:</span>
              {employeeDetail?.mobile_device_recovery &&
                `₹ ${employeeDetail?.mobile_device_recovery}`}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>Car Maint:</span>
              {employeeDetail?.car_maintenance_recovery &&
                `₹ ${employeeDetail?.car_maintenance_recovery}`}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>Notice Period Recovery :</span>
              {employeeDetail?.notice_period_recovery &&
                `₹ ${employeeDetail?.notice_period_recovery}`}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>BGV Recovery:</span>
              {employeeDetail?.bgv &&
                `₹ ${employeeDetail?.bgv}`}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>
                Relocation Recovery / Paid Notice:
              </span>
              {employeeDetail?.relocation_recovery &&
                `₹ ${employeeDetail?.relocation_recovery}`}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>Transportation Deduction:</span>
              {employeeDetail?.transportation_deduction &&
                `₹ ${employeeDetail?.transportation_deduction}`}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>Safety Gadget Recovery:</span>
              {employeeDetail?.safety_gadget_recovery &&
                `₹ ${employeeDetail?.safety_gadget_recovery}`}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>IT Asset Recovery:</span>
              {employeeDetail?.it_asset_recovery &&
                `₹ ${employeeDetail?.it_asset_recovery}`}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>Canteen Recovery:</span>
              {employeeDetail?.canteen_recovery &&
                `₹ ${employeeDetail?.canteen_recovery}`}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>Imprest Recovery:</span>
              {employeeDetail?.imprest_recovery &&
                `₹ ${employeeDetail?.imprest_recovery}`}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>Petro Card Recovery:</span>
              {employeeDetail?.petro_card_recovery &&
                `₹ ${employeeDetail?.petro_card_recovery}`}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Smart Card Recovery:</span>
              {employeeDetail?.smart_card_recovery &&
                `₹ ${employeeDetail?.smart_card_recovery}`}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Loan Final Recovery:</span>
              {employeeDetail?.loan_final_recovery &&
                `₹ ${employeeDetail?.loan_final_recovery}`}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>Advance Salary Recovery:</span>
              {employeeDetail?.adv_salary_recovery &&
                `₹ ${employeeDetail?.adv_salary_recovery}`}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>I-Card Recovery:</span>
              {employeeDetail?.i_card_recovery &&
                `₹ ${employeeDetail?.i_card_recovery}`}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>Any Other Recovery:</span>
              {employeeDetail?.other_recovery &&
                `₹ ${employeeDetail?.other_recovery}`}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>TDS:</span>
              {employeeDetail?.tds && `₹ ${employeeDetail?.tds}`}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Professional Tax:</span>
              {employeeDetail?.professional_tax &&
                `₹ ${employeeDetail?.professional_tax}`}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>Car Status:</span>
              {employeeDetail?.car_status && `₹ ${employeeDetail?.car_status}`}
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.key}>
              <span className={styles.value}>Employee PF Comment :</span>
              {employeeDetail?.pf_comment}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Employee ESI Comment:</span>
              {employeeDetail?.esi_comment}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>Labour Welfare Fund Comment:</span>
              {employeeDetail?.labour_welfare_fund_comment}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>
                Mobile Device Recovery Comment:
              </span>
              {employeeDetail?.mobile_device_recovery_comment}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>Car Maint Comment:</span>
              {employeeDetail?.car_maintenance_recovery_comment}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>
                Notice Period Recovery Comment:
              </span>
              {employeeDetail?.notice_period_recovery_comment}{" "}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>BGV Recovery Comment:</span>
              {employeeDetail?.bgv_comment}{" "}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>
                Relocation Recovery / Paid Notice: Comment{" "}
              </span>
              {employeeDetail?.relocation_recovery_comment}{" "}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>
                Transportation Deduction Comment:
              </span>
              {employeeDetail?.transportation_deduction_comment}{" "}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>
                Safety Gadget Recovery Comment:
              </span>
              {employeeDetail?.safety_gadget_recovery_comment}{" "}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>IT Asset Recovery Comment:</span>
              {employeeDetail?.it_asset_recovery_comment}{" "}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>Canteen Recovery Comment:</span>
              {employeeDetail?.canteen_recovery_comment}{" "}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>Imprest Recovery Comment:</span>
              {employeeDetail?.imprest_recovery_comment}{" "}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>Petro Card Recovery Comment:</span>
              {employeeDetail?.petro_card_recovery_comment}{" "}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Smart Card Recovery Comment:</span>
              {employeeDetail?.smart_card_recovery_comment}{" "}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Loan Final Recovery Comment:</span>
              {employeeDetail?.loan_final_recovery_comment}{" "}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>
                Advance Salary Recovery Comment:
              </span>
              {employeeDetail?.adv_salary_recovery_comment}{" "}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>I-Card Recovery Comment:</span>
              {employeeDetail?.i_card_recovery_comment}{" "}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>Any Other Recovery Comment:</span>
              {employeeDetail?.other_recovery_comment}{" "}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>TDS Comment:</span>
              {employeeDetail?.tds_comment}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Professional Tax Comment:</span>
              {employeeDetail?.professional_tax_comment}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>Car Status Comment:</span>
              {employeeDetail?.car_status_comment}
            </div>
          </div>
        </div>
        <div className={"formFlex"}>
          <TotalSum
            firstName="Total Dues to be Recovered :"
            reduceAmount={
              employeeDetail?.total_recovery
                ? `₹ ${employeeDetail?.total_recovery}`
                : 0
            }
          />
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.heading}>Part 4 : Uphold Dues</div>
        <div className={styles.mainFlex}>
          <div className={styles.left}>
            <div className={styles.key}>
              <span className={styles.value}>Un-Declared PLI:</span>
              {employeeDetail?.un_declared_pli_uphold &&
                `₹ ${employeeDetail?.un_declared_pli_uphold}`}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Gratuity:</span>
              {employeeDetail?.gratuity_uphold &&
                `₹ ${employeeDetail?.gratuity_uphold}`}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>Statutory Bonus:</span>
              {employeeDetail?.statutory_bonus_uphold &&
                `₹ ${employeeDetail?.statutory_bonus_uphold}`}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>
                EL Balance (Opening-Consumed):
              </span>
              {employeeDetail?.el_balance_uphold &&
                `₹ ${employeeDetail?.el_balance_uphold}`}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>EL of Current Service Year:</span>
              {employeeDetail?.el_currnet_service_year_uphold &&
                `₹ ${employeeDetail?.el_currnet_service_year_uphold}`}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>FEL (Freezed Earned Leave):</span>
              {employeeDetail?.fel_uphold && `₹ ${employeeDetail?.fel_uphold}`}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>RBL (Retirement Bank Leave):</span>
              {employeeDetail?.rbl_uphold && `₹ ${employeeDetail?.rbl_uphold}`}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>Supperannuation:</span>
              {employeeDetail?.superannuation_uphold &&
                `₹ ${employeeDetail?.superannuation_uphold}`}
            </div>{" "}
          </div>
          <div className={styles.right}>
            <div className={styles.key}>
              <span className={styles.value}>Un-Declared PLI Comments:</span>
              {employeeDetail?.un_declared_pli_uphold_comment}{" "}
            </div>
            <div className={styles.key}>
              <span className={styles.value}>Gratuity Comments:</span>
              {employeeDetail?.gratuity_uphold_comment}{" "}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>Statutory Bonus Comments:</span>
              {employeeDetail?.statutory_bonus_uphold_comment}{" "}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>
                EL Balance (Opening-Consumed) Comments:
              </span>
              {employeeDetail?.el_balance_uphold_comment}{" "}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>
                EL of Current Service Year Comments:
              </span>
              {employeeDetail?.el_currnet_service_year_uphold_comment}{" "}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>
                FEL (Freezed Earned Leave) Comments:
              </span>
              {employeeDetail?.fel_uphold_comment}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>
                RBL (Retirement Bank Leave) Comments:
              </span>
              {employeeDetail?.rbl_uphold_comment}
            </div>{" "}
            <div className={styles.key}>
              <span className={styles.value}>Supperannuation Comments:</span>
              {employeeDetail?.superannuation_uphold_comment}
            </div>{" "}
          </div>
        </div>
        <div className={"formFlex"}>
          <TotalSum
            firstName="Total Upload Dues :"
            reduceAmount={
              employeeDetail?.total_uphold_dues
                ? `₹ ${employeeDetail?.total_uphold_dues}`
                : 0
            }
          />
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Part 5 : Net Payable</div>
          <div className={"formFlex"}>
            <TotalSum
              firstName="Total Payable :"
              firstAmount={
                employeeDetail?.net_payable
                  ? `₹ ${employeeDetail?.net_payable}`
                  : 0
              }
            />
          </div>
        </div>
      </div>
      <div className={styles.plainPaper}>
        <div className={styles.newContainer}>
          <div className={styles.heading}>Attachments</div>
          <div className={styles.commentContainer}>
            {employeeDetail?.attachments &&
              employeeDetail?.attachments.map((item, index) => (
                <div className={styles.otherWrap} key={`attachment_${index}`}>
                  <div className={styles.mainFlex}>
                    <div className={styles.left}>
                      <div className={styles.key7}>
                        <a href={item?.document} target="_blank">
                          <div className={styles.hyperlinkText}>
                            {item?.file_name}
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className={styles.right}></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {employeeDetail?.comments && (
        <div className={styles.plainPaper}>
          <div className={styles.newContainer}>
            <div className={styles.heading}>Comments/Notes</div>
            <div className={styles.commentContainer}>
              {employeeDetail?.comments?.map((item) => (
                <div className={styles.commentwrap}>
                  <div>{item.comment}</div>
                  <div className={styles.commentDate}>
                    {`${item?.employee?.name} | ${item?.updatedAtText}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PayData;

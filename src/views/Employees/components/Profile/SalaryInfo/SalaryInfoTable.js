import React from "react";
import SaleryInfoField from "./components/SaleryInfoField";
import SalaryInfoHook from "./SalaryInfoHook";
import styles from "./Style.module.css";
import { getSumValue } from "../../../../../libs/general.utils";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

function SalaryInfoTable({Empid}) {
  const {
    EmployeeSalaryInfo: data,
    totalPages,
    currentPage,
    handlePageChange,
  } = SalaryInfoHook({Empid});

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.salaryInfoWrapper}>
      <div className={styles.pageWrap}>
        <div>
          <span className={styles.title}>
            Universal Salary Structuring & Calculator
          </span>
          <div className={styles.newLine} />
        </div>
        <div className={styles.pageWrapM}>
          <IconButton onClick={handlePreviousPage} disabled={currentPage === 1}>
            <ChevronLeftIcon />
          </IconButton>
          <p>{currentPage}</p>
          <IconButton
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <ChevronRightIcon />
          </IconButton>
        </div>
      </div>
      <div className={styles.headerWrap}>
        <div className={styles.upperWrap}>
          <div className={styles.wrpa}>
            <div className={styles.titleHead}>Designation:</div>
            <div className={styles.titleCont}>{data?.designation?.name}</div>
          </div>
          <div className={styles.wrpa}>
            <div className={styles.titleHead}>Grade:</div>
            <div className={styles.titleCont}>{data?.grade?.code}</div>
          </div>
          <div className={styles.wrpa}>
            <div className={styles.titleHead}>Structure Dates:</div>
            <div className={styles.titleCont}>{data?.effectiveDateText} - {data?.lastEffectiveDateText}</div>
          </div>
        </div>
        <div className={styles.verticalLine}></div>
        <div className={styles.lowerWrap}>
          <div className={styles.titleHead}>Reason of Change:</div>
          <div className={styles.titleCont}>{data?.salary_notes}</div>
        </div>
      </div>
      <div className={styles.salaryTableContainer}>
        <div className={styles.tableWrapper}>
          <div className={styles.tableComponentField}>component</div>
          <div className={styles.salaryWrapper2}>
            <div className={styles.tableAnnualField}>Annual</div>
            <div className={styles.tableMonthlyField}>Monthly</div>
          </div>
        </div>
        <div className={styles.grossWrapper}>
          <SaleryInfoField
            component="Incremental Gross Salary"
            monthly={data?.incremental_gross_salary}
          />
          <SaleryInfoField
            component="Car Component"
            monthly={data?.car_component}
          />
          <SaleryInfoField
            className={styles.grossSalaryGreenWrapper}
            component="Total"
            monthly={getSumValue(
              data?.incremental_gross_salary,
              data?.car_component
            )}
          />
        </div>
        <div className={styles.grossWrapper}>
          <div>
            <p className={styles.salaryHeading}>Part A - Earning 1</p>
          </div>
          <SaleryInfoField component="Basic" monthly={data?.basic_salary} />
          <SaleryInfoField component="HRA" monthly={data?.hra} />
          <SaleryInfoField
            component="Education Allowance"
            monthly={data?.education_allowance}
          />
          <SaleryInfoField
            component="Special Allowance"
            monthly={data?.special_allowance}
          />
          <SaleryInfoField
            className={styles.grossSalaryGreenWrapper}
            component="Total Earning 1"
            monthly={data?.earning_one}
          />
        </div>
        <div className={styles.grossWrapper}>
          <div>
            <p className={styles.salaryHeading}>Part B - Earning 2</p>
          </div>
          <SaleryInfoField
            component="Professional Upgradation - Qtrly"
            monthly={data?.pug}
          />
          <SaleryInfoField
            component="Helper Allowance - Qtrly"
            monthly={data?.helper}
          />{" "}
          <SaleryInfoField
            component="Food Coupons  - Fringe"
            monthly={data?.food_coupons}
          />
          <SaleryInfoField
            component="Gift Coupons - Fringe"
            monthly={data?.gift_coupons}
          />{" "}
          <SaleryInfoField component="LTA - Bimonthly" monthly={data?.lta} />
          <SaleryInfoField
            component="Superannuation - Post Retire"
            monthly={data?.super_annuation}
          />{" "}
          <SaleryInfoField component="NPS" monthly={data?.nps} />
          <SaleryInfoField
            component="Vehicle Maint (CTC) - Fringe"
            monthly={data?.vehicle_maintenance}
          />{" "}
          <SaleryInfoField
            component="Vehicle EMIs (CTC) - Monthly"
            monthly={data?.vehicle_emi}
          />
          <SaleryInfoField
            component="Fuel Availed (CTC) - Fringe"
            monthly={data?.fuel}
          />{" "}
          <SaleryInfoField
            component="VPF - Monthly"
            monthly={data?.earning2_vpf}
          />
          <SaleryInfoField
            className={styles.grossSalaryGreenWrapper}
            component="Total Earning 2"
            monthly={data?.earning_two}
          />
        </div>{" "}
        <div className={styles.grossWrapper}>
          <SaleryInfoField
            className={styles.grossSalaryGreenWrapper}
            component="Gross Salary (Part A + Part B)"
            monthly={getSumValue(data?.earning_one, data?.earning_two)}
          />
        </div>{" "}
        <div className={styles.grossWrapper}>
          <div>
            <p className={styles.salaryHeading}>Part C - Earning 3</p>
          </div>
          <SaleryInfoField
            component="PLI - Qtrly"
            monthly={data?.earning_three_pli}
          />
        </div>
        <div className={styles.grossWrapper}>
          <div>
            <p className={styles.salaryHeading}>Part D - Deduction 1</p>
          </div>
          <SaleryInfoField
            component="Em PF- Deduction Part (Put Yes if give actual Basic's 12 %)"
            monthly={data?.em_pf}
          />
          <SaleryInfoField
            component="Em ESI- Deduction Part"
            monthly={data?.em_esi}
          />
          <SaleryInfoField component={`VPF - ${data?.deduction_vpf_pct} %`} monthly={data?.deduction_vpf} />
          <SaleryInfoField component="Em LWF" monthly={data?.em_lwf} />
          <SaleryInfoField
            className={styles.grossSalaryRedWrapper}
            component="Total Deduction 1"
            monthly={data?.total_deduction}
          />
        </div>{" "}
        <div className={styles.grossWrapper}>
          <div>
            <p className={styles.salaryHeading}>
              Part E (Statutory Components of CTC Paid by Employer) - Earning 4
            </p>
          </div>
          <SaleryInfoField
            component="PF - Er Contribution Part"
            monthly={data?.er_pf}
          />
          <SaleryInfoField
            component="ESI - Er Contribution Part"
            monthly={data?.er_esi}
          />
          <SaleryInfoField component="Er LWF" monthly={data?.er_lwf} />
          <SaleryInfoField
            className={styles.grossSalaryGreenWrapper}
            component="Total Earning 4"
            monthly={data?.earning_four}
          />
        </div>
        <div className={styles.grossWrapper}>
          <div>
            <p className={styles.salaryHeading}>
              Part E (Organizational Components of CTC) - Earning 5
            </p>
          </div>
          <SaleryInfoField component="Gratuity" monthly={data?.gratuity} />
          <SaleryInfoField
            component="Medical Insurance Premium"
            monthly={data?.insurance}
          />{" "}
          <SaleryInfoField
            component="Stability Allowance"
            monthly={data?.stability_incentive}
          />{" "}
          <SaleryInfoField
            component="Retention Allowance"
            monthly={data?.retention_allowance}
          />
          <SaleryInfoField
            component="Performance Allowance"
            monthly={data?.perf_bonus}
          />{" "}
          <SaleryInfoField component="Bonus" monthly={data?.annual_bonus} />
          <SaleryInfoField
            component="Type II Car Maint"
            monthly={data?.two_car_maintenance}
          />
          <SaleryInfoField component="Type II Fuel" monthly={data?.two_fuel} />
          <SaleryInfoField
            className={styles.grossSalaryGreenWrapper}
            component="Total Earning 5"
            monthly={data?.earning_five}
          />
        </div>
        <div className={styles.grossWrapperBg}>
          <SaleryInfoField
            className={styles.grossSalaryGreenWrapper}
            component="Net Composite CTC (Earning 1 + Earning 2 + Earning 3 + Earning 4 + Earning 5)"
            monthly={getSumValue(
              data?.monthly_ctc
            )}
          />
        </div>{" "}
        <div className={styles.grossWrapper}>
          <SaleryInfoField
            component="Net Pay [ (Earning 1) - (Deduction 1) ]"
            monthly={data?.net_pay}
          />
          {/* <SaleryInfoField
            component="Quarterly Payments (Helper + PUG + PLI + Perf Bonus)"
            monthly={getSumValue(
              data?.helper,
              data?.pug,
              data?.perf_bonus,
              data?.earning_three_pli
            )}
          />
          <SaleryInfoField
            component="Fringe Benefits"
            monthly={getSumValue(
              data?.helper,
              data?.food_coupons,
              data?.vehicle_maintenance,
              data?.vehicle_emi,
              data?.fuel
            )}
          />
          <SaleryInfoField
            component="PF"
            monthly={getSumValue(
              data?.earning_four,
              data?.total_deduction,
              data?.earning2_vpf
            )}
          />
          <SaleryInfoField
            component="Tenure Based Earning  (LTA + Stability + Gratuity + Bonus + Retention Allowance + Supperann)"
            monthly={getSumValue(
              data?.lta,
              data?.gratuity,
              data?.annual_bonus,
              data?.retention_allowance,
              data?.stability_incentive,
              data?.super_annuation
            )}
          />
          <SaleryInfoField
            className={styles.grossSalaryGreenWrapper}
            component="Total "
            monthly={getSumValue(
              getSumValue(
                data?.lta,
                data?.gratuity,
                data?.annual_bonus,
                data?.retention_allowance
              ),
              getSumValue(data?.earning_four, data?.total_deduction),
              getSumValue(
                data?.helper,
                data?.food_coupons,
                data?.vehicle_maintenance,
                data?.vehicle_emi,
                data?.fuel
              ),
              getSumValue(data?.helper, data?.pug, data?.perf_bonus),
              netPay()
            )}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default SalaryInfoTable;

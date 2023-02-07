import React from "react";
import SaleryInfoField from "./components/SaleryInfoField";
import SalaryInfoHook from "./SalaryInfoHook";
import styles from "./Style.module.css";

function SalaryInfo() {
  const { EmployeeSalaryInfo: data } = SalaryInfoHook({});
  console.log("====E>", data);
  return (
    <div className={styles.salaryInfoWrapper}>
      <div>
        <span className={styles.title}>
          Universal Salary Structuring & Calculator
        </span>
        <div className={styles.newLine} />
      </div>
      <div className={styles.salaryTableContainer}>
        <div className={styles.tableWrapper}>
          <div className={styles.tableComponentField}>component</div>
          <div className={styles.tableAnnualField}>Annual</div>
          <div className={styles.tableMonthlyField}>Monthly</div>
        </div>
        <div className={styles.grossWrapper}>
          <SaleryInfoField
            component="Incremental Gross Salary"
            annual="-"
            monthly={data?.incremental_gross_salary}
          />
          <SaleryInfoField
            component="Car Component"
            annual="-"
            monthly={data?.car_component}
          />
          <SaleryInfoField
            className={styles.grossSalaryGreenWrapper}
            component="Total"
            annual="-"
            monthly={data?.earning_one}
          />
        </div>
        <div className={styles.grossWrapper}>
          <div>
            <p className={styles.salaryHeading}>Part A - Earning 1</p>
          </div>
          <SaleryInfoField
            component="Basic"
            annual={data?.basic_salary}
            monthly={data?.basic_salary}
          />
          <SaleryInfoField component="HRA" annual="-" monthly={data?.hra} />
          <SaleryInfoField
            component="Education Allowance"
            annual="-"
            monthly={data?.education_allowance}
          />
          <SaleryInfoField
            component="Special Allowance"
            annual="-"
            monthly={data?.special_allowance}
          />
          <SaleryInfoField
            className={styles.grossSalaryGreenWrapper}
            component="Total Earning 1"
            annual="-"
            monthly={data?.earning_one}
          />
        </div>
        <div className={styles.grossWrapper}>
          <div>
            <p className={styles.salaryHeading}>Part B - Earning 2</p>
          </div>
          <SaleryInfoField
            component="Professional Upgradation - Qtrly"
            annual="-"
            monthly={data?.pug}
          />
          <SaleryInfoField
            component="Helper Allowance - Qtrly"
            annual="-"
            monthly={data?.helper}
          />{" "}
          <SaleryInfoField
            component="Food Coupens - Fringe"
            annual="-"
            monthly={data?.food_coupons}
          />
          <SaleryInfoField
            component="Gift Coupens - Fringe"
            annual="-"
            monthly={data?.gift_coupons}
          />{" "}
          <SaleryInfoField
            component="LTA - Biannual"
            annual="-"
            monthly={data?.lta}
          />
          <SaleryInfoField
            component="Supperannuation - Post Retire"
            annual="-"
            monthly={data?.super_annuation}
          />{" "}
          <SaleryInfoField component="NPS" annual="-" monthly={data?.nps} />
          <SaleryInfoField
            component="Vehicle Maint (CTC) - Fringe"
            annual="-"
            monthly={data?.vehicle_maintenance}
          />{" "}
          <SaleryInfoField
            component="Vehicle EMIs (CTC) - Monthly"
            annual="-"
            monthly={data?.vehicle_emi}
          />
          <SaleryInfoField
            component="Fuel Availed (CTC) - Fringe"
            annual="-"
            monthly={data?.fuel}
          />{" "}
          <SaleryInfoField
            component="VPF - Monthly"
            annual="-"
            monthly={data?.vpf}
          />
          <SaleryInfoField
            className={styles.grossSalaryGreenWrapper}
            component="Total Earning 2"
            annual="-"
            monthly={data?.earning_two}
          />
        </div>{" "}
        <div className={styles.grossWrapper}>
          <SaleryInfoField
            className={styles.grossSalaryGreenWrapper}
            component="Gross Salary (Part A + Part B)"
            annual="-"
            monthly={data?.hra}
          />
        </div>{" "}
        <div className={styles.grossWrapper}>
          <div>
            <p className={styles.salaryHeading}>Part C - Earning 3</p>
          </div>
          <SaleryInfoField
            component="PLI - Qtrly"
            annual="-"
            monthly={data?.hra}
          />
        </div>
        <div className={styles.grossWrapper}>
          <div>
            <p className={styles.salaryHeading}>Part D - Deduction 1</p>
          </div>
          <SaleryInfoField
            component="Em PF- Deduction Part (Put Yes if give actual Basic's 12 %)"
            annual="-"
            monthly={data?.em_pf}
          />
          <SaleryInfoField
            component="Em ESI- Deduction Part"
            annual="-"
            monthly={data?.em_esi}
          />
          <SaleryInfoField
            component="VPF - 0%"
            annual="-"
            monthly={data?.vpf}
          />
          <SaleryInfoField
            component="Em LWF"
            annual="-"
            monthly={data?.em_lwf}
          />
          <SaleryInfoField
            className={styles.grossSalaryRedWrapper}
            component="Total Deduction 1"
            annual="-"
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
            annual="-"
            monthly={data?.er_pf}
          />
          <SaleryInfoField
            component="ESI - Er Contribution Part"
            annual="-"
            monthly={data?.er_esi}
          />
          <SaleryInfoField
            component="Er LWF"
            annual="-"
            monthly={data?.er_lwf}
          />
          <SaleryInfoField
            className={styles.grossSalaryGreenWrapper}
            component="Total Earning 4"
            annual="-"
            monthly={data?.earning_four}
          />
        </div>
        <div className={styles.grossWrapper}>
          <div>
            <p className={styles.salaryHeading}>
              Part E (Organizational Components of CTC) - Earning 5
            </p>
          </div>
          <SaleryInfoField
            component="Gratuity"
            annual="-"
            monthly={data?.gratuity}
          />
          <SaleryInfoField
            component="Medical Insurance Premium"
            annual="-"
            monthly={data?.insurance}
          />{" "}
          <SaleryInfoField
            component="Stability Allowance"
            annual="-"
            monthly={data?.hva}
          />{" "}
          <SaleryInfoField
            component="Retention Allowance"
            annual="-"
            monthly={data?.retention_allowance}
          />
          <SaleryInfoField
            component="Performance Allowance"
            annual="-"
            monthly={data?.perf_bonus}
          />{" "}
          <SaleryInfoField
            component="Bonus"
            annual="-"
            monthly={data?.annual_bonus}
          />
          <SaleryInfoField
            component="Type II Car Maint"
            annual="-"
            monthly={data?.two_car_maintenance}
          />
          <SaleryInfoField
            component="Type II Fuel"
            annual="-"
            monthly={data?.two_fuel}
          />
          <SaleryInfoField
            className={styles.grossSalaryGreenWrapper}
            component="Total Earning 5"
            annual="-"
            monthly={data?.earning_five}
          />
        </div>
        <div className={styles.grossWrapperBg}>
          <SaleryInfoField
            className={styles.grossSalaryGreenWrapper}
            component="Net Composite CTC (Earning 1 + Earning 2 + Earning 3 + Earning 4 + Earning 5)"
            annual="-"
            monthly={data?.hva}
          />
        </div>{" "}
        <div className={styles.grossWrapper}>
          <SaleryInfoField
            component="Net Pay [ (Earning 1) - (Deduction 1) ]"
            annual="-"
            monthly={data?.hva}
          />
          <SaleryInfoField
            component="Quarterly Payments (Helper + PUG + PLI + Perf Bonus)"
            annual="-"
            monthly={data?.hva}
          />
          <SaleryInfoField
            component="Fringe Benefits"
            annual="-"
            monthly={data?.hva}
          />
          <SaleryInfoField component="PF" annual="-" monthly={data?.hva} />
          <SaleryInfoField
            component="Tenure Based Earning (LTA + Stabiliy + Gratuity + Bonus + Supperann)"
            annual="-"
            monthly={data?.hva}
          />
          <SaleryInfoField
            className={styles.grossSalaryGreenWrapper}
            component="Total "
            annual="-"
            monthly={data?.hva}
          />
        </div>
      </div>
    </div>
  );
}

export default SalaryInfo;

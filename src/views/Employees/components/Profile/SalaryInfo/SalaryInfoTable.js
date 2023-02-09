import React from "react";
import SaleryInfoField from "./components/SaleryInfoField";
import SalaryInfoHook from "./SalaryInfoHook";
import styles from "./Style.module.css";
function SalaryInfoTable() {
  const { EmployeeSalaryInfo: data } = SalaryInfoHook({});

  const getSumValue = (...numbers) => {
    return numbers ? numbers.reduce((sum, value) => sum + value, 0) : "-";
  };
  const netPay = () => {
    return data ? data?.earning_one - data?.total_deduction : "-";
  };
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
            annual={data?.incremental_gross_salary}
          />
          <SaleryInfoField
            component="Car Component"
            annual={data?.car_component}
          />
          <SaleryInfoField
            className={styles.grossSalaryGreenWrapper}
            component="Total"
            annual={data?.earning_one}
          />
        </div>
        <div className={styles.grossWrapper}>
          <div>
            <p className={styles.salaryHeading}>Part A - Earning 1</p>
          </div>
          <SaleryInfoField component="Basic" annual={data?.basic_salary} />
          <SaleryInfoField component="HRA" annual={data?.hra} />
          <SaleryInfoField
            component="Education Allowance"
            annual={data?.education_allowance}
          />
          <SaleryInfoField
            component="Special Allowance"
            annual={data?.special_allowance}
          />
          <SaleryInfoField
            className={styles.grossSalaryGreenWrapper}
            component="Total Earning 1"
            annual={data?.earning_one}
          />
        </div>
        <div className={styles.grossWrapper}>
          <div>
            <p className={styles.salaryHeading}>Part B - Earning 2</p>
          </div>
          <SaleryInfoField
            component="Professional Upgradation - Qtrly"
            annual={data?.pug}
          />
          <SaleryInfoField
            component="Helper Allowance - Qtrly"
            annual={data?.helper}
          />{" "}
          <SaleryInfoField
            component="Food Coupens - Fringe"
            annual={data?.food_coupons}
          />
          <SaleryInfoField
            component="Gift Coupens - Fringe"
            annual={data?.gift_coupons}
          />{" "}
          <SaleryInfoField component="LTA - Bimonthly" annual={data?.lta} />
          <SaleryInfoField
            component="Supperannuation - Post Retire"
            annual={data?.super_annuation}
          />{" "}
          <SaleryInfoField component="NPS" annual={data?.nps} />
          <SaleryInfoField
            component="Vehicle Maint (CTC) - Fringe"
            annual={data?.vehicle_maintenance}
          />{" "}
          <SaleryInfoField
            component="Vehicle EMIs (CTC) - Monthly"
            annual={data?.vehicle_emi}
          />
          <SaleryInfoField
            component="Fuel Availed (CTC) - Fringe"
            annual={data?.fuel}
          />{" "}
          <SaleryInfoField component="VPF - Monthly" annual={data?.earning2_vpf} />
          <SaleryInfoField
            className={styles.grossSalaryGreenWrapper}
            component="Total Earning 2"
            annual={data?.earning_two}
          />
        </div>{" "}
        <div className={styles.grossWrapper}>
          <SaleryInfoField
            className={styles.grossSalaryGreenWrapper}
            component="Gross Salary (Part A + Part B)"
            annual={getSumValue(
              data?.earning_one,
              data?.earning_two,
            )}
          />
        </div>{" "}
        <div className={styles.grossWrapper}>
          <div>
            <p className={styles.salaryHeading}>Part C - Earning 3</p>
          </div>
          <SaleryInfoField component="PLI - Qtrly" annual={data?.earning_three_pli} />
        </div>
        <div className={styles.grossWrapper}>
          <div>
            <p className={styles.salaryHeading}>Part D - Deduction 1</p>
          </div>
          <SaleryInfoField
            component="Em PF- Deduction Part (Put Yes if give actual Basic's 12 %)"
            annual={data?.em_pf}
          />
          <SaleryInfoField
            component="Em ESI- Deduction Part"
            annual={data?.em_esi}
          />
          <SaleryInfoField component="VPF - 0%" annual={data?.deduction_vpf} />
          <SaleryInfoField component="Em LWF" annual={data?.em_lwf} />
          <SaleryInfoField
            className={styles.grossSalaryRedWrapper}
            component="Total Deduction 1"
            annual={data?.total_deduction}
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
            annual={data?.er_pf}
          />
          <SaleryInfoField
            component="ESI - Er Contribution Part"
            annual={data?.er_esi}
          />
          <SaleryInfoField component="Er LWF" annual={data?.er_lwf} />
          <SaleryInfoField
            className={styles.grossSalaryGreenWrapper}
            component="Total Earning 4"
            annual={data?.earning_four}
          />
        </div>
        <div className={styles.grossWrapper}>
          <div>
            <p className={styles.salaryHeading}>
              Part E (Organizational Components of CTC) - Earning 5
            </p>
          </div>
          <SaleryInfoField component="Gratuity" annual={data?.gratuity} />
          <SaleryInfoField
            component="Medical Insurance Premium"
            annual={data?.insurance}
          />{" "}
          <SaleryInfoField component="Stability Allowance" annual={data?.stability_incentive} />{" "}
          <SaleryInfoField
            component="Retention Allowance"
            annual={data?.retention_allowance}
          />
          <SaleryInfoField
            component="Performance Allowance"
            annual={data?.perf_bonus}
          />{" "}
          <SaleryInfoField component="Bonus" annual={data?.annual_bonus} />
          <SaleryInfoField
            component="Type II Car Maint"
            annual={data?.two_car_maintenance}
          />
          <SaleryInfoField component="Type II Fuel" annual={data?.two_fuel} />
          <SaleryInfoField
            className={styles.grossSalaryGreenWrapper}
            component="Total Earning 5"
            annual={data?.earning_five}
          />
        </div>
        <div className={styles.grossWrapperBg}>
          <SaleryInfoField
            className={styles.grossSalaryGreenWrapper}
            component="Net Composite CTC (Earning 1 + Earning 2 + Earning 3 + Earning 4 + Earning 5)"
            annual={getSumValue(
              data?.earning_one,
              data?.earning_two,
              data?.earning_three_pli,
              data?.earning_four,
              data?.earning_five
            )}
          />
        </div>{" "}
        <div className={styles.grossWrapper}>
          <SaleryInfoField
            component="Net Pay [ (Earning 1) - (Deduction 1) ]"
            annual={netPay()}
          />
          <SaleryInfoField
            component="Quarterly Payments (Helper + PUG + PLI + Perf Bonus)"
            annual={getSumValue(data?.helper, data?.pug, data?.perf_bonus,data?.earning_three_pli)}
          />
          <SaleryInfoField
            component="Fringe Benefits"
            annual={getSumValue(
              data?.helper,
              data?.food_coupons,
              data?.vehicle_maintenance,
              data?.vehicle_emi,
              data?.fuel
            )}
          />
          <SaleryInfoField
            component="PF"
            annual={getSumValue(data?.earning_four, data?.total_deduction,data?.earning2_vpf)}
          />
          <SaleryInfoField
            component="Tenure Based Earning (LTA + Stabiliy + Gratuity + Bonus + Supperann)"
            annual={getSumValue(
              data?.lta,
              data?.gratuity,
              data?.annual_bonus,
              data?.retention_allowance,
              data?.stability_incentive
            )}
          />
          <SaleryInfoField
            className={styles.grossSalaryGreenWrapper}
            component="Total "
            annual={getSumValue(
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
          />
        </div>
      </div>
    </div>
  );
}

export default SalaryInfoTable;

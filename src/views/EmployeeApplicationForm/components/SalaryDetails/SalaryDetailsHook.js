import {useRef, useImperativeHandle} from "react";
import LogUtils from "../../../../libs/LogUtils";


const useSalaryDetails = ({}, ref) => {
    const refMonthly = useRef(null);
    const refQuarterly = useRef(null);
    const refAnnual = useRef(null);
    const refBenefits = useRef(null);

    useImperativeHandle(ref, () => ({
        isValid() {
            const isMonthlyValid = refMonthly?.current?.isValid();
            const isQuarterlyValid = refQuarterly?.current?.isValid();
            const isAnnualValid = refAnnual?.current?.isValid();
            const isBenefitsValid = refBenefits?.current?.isValid();
            return isMonthlyValid && isQuarterlyValid && isAnnualValid && isBenefitsValid;
        },
        setData(data) {
            LogUtils.log('salaryDetails', data);
            refMonthly?.current?.setData(data?.monthly_salary);
            refQuarterly?.current?.setData(data?.quarterly_salary);
            refAnnual?.current?.setData(data?.annual_salary);
            refBenefits?.current?.setData(data?.benefits);
        },
        getData() {
            const monthlyForm = refMonthly?.current?.getData();
            const quarterlyForm = refQuarterly?.current?.getData();
            const annualForm = refAnnual?.current?.getData();
            const benefitsForm = refBenefits?.current?.getData();
            return {
                monthly_salary: monthlyForm,
                quarterly_salary: quarterlyForm,
                annual_salary: annualForm,
                benefits: benefitsForm,
            }
        },
    }));

    return {
        refAnnual,
        refBenefits,
        refMonthly,
        refQuarterly
    }
};

export default useSalaryDetails;

import {useEffect, useMemo, useState} from "react";
import {serviceGetEmployeeProgression} from "../../../../../services/Employee.service";
import {useSelector} from "react-redux";

const useCareerProgression = ({}) => {
    const [history, setHistory] = useState([]);
    const [otherData, setOtherData] = useState({});
    const { employeeData } = useSelector((state) => state.employee);

    useEffect(() => {
        serviceGetEmployeeProgression({ emp_id: employeeData?.id }).then((res) => {
            if (!res.error) {
                const tempData = res?.data;
                setHistory(tempData?.data);
                setOtherData({
                    employee_cagr: tempData?.employee_cagr,
                    cagr: tempData?.cagr,
                    cost_cagr: tempData?.cost_cagr,
                });
            }
        })
    }, [employeeData]);

    const lineStatistics = useMemo(() => {
        return history.map((data) => {
            return { date: data?.headerText, count: data?.ctc };
        })
    }, [history]);

    return {
        history,
        otherData,
        lineStatistics
    }
};

export default useCareerProgression;

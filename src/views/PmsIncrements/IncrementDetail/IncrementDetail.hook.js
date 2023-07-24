import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {serviceGetList} from "../../../services/Common.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import {
    serviceGetIncrementDetailInfo, serviceIncrementPlannerAnalyticsDownload,
    serviceIncrementPlannerDownload,
} from "../../../services/IncrementPlanner.service";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";

const totalShow = 50;
const useIncrementDetail = ({location}) => {
    const {batch, year, planner_type} = location?.state;
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [slabData, setSlabData] = useState([])
    const [isCalling, setIsCalling] = useState(false);
    const [apiData, setApiData] = useState([]);
    const [type, setType] = useState("");
    const [listType, setListType] = useState("");
    const [listData, setListData] = useState({
        LOCATIONS: [],
        DEPARTMENTS: [],
    });

    useEffect(() => {
        serviceGetList(["LOCATIONS", "DEPARTMENTS"]).then((res) => {
            if (!res.error) {
                const locations = res.data?.LOCATIONS;
                const departments = res?.data?.DEPARTMENTS;
                locations.unshift({name: "ALL", label: "ALL", code: "ALL", id: "ALL"});
                departments.unshift({name: "ALL", label: "ALL", code: "ALL", id: "ALL"});
                setListData({DEPARTMENTS: departments, LOCATIONS: locations});
            }
        });
    }, []);

    useEffect(() => {
        if (type) {
            setListType("");
        }
    }, [type]);

    useEffect(() => {
        if (type && listType?.id) {
            resetData();
        }
    }, [type, listType])

    const resetData = useCallback(() => {
        serviceGetIncrementDetailInfo({
            batch: batch,
            year: year,
            type: planner_type,
            filter_type: type,
            filter_id: listType?.id
        }).then((res) => {
            if (!res.error) {
                const data = res.data;
                const {analytics, ...rest} = data
                setApiData([...analytics]);
                setSlabData(rest);
            }
        });
    }, [listType, type, batch, year, planner_type]);

    const calcTotalValues = useCallback((data) => {
        const current = data.reduce((accumulator, item) => {
            return accumulator + item.current_salary;
        }, 0);

        const newSalary = data.reduce((accumulator, item) => {
            return accumulator + item.new_salary;
        }, 0);

        const totalIncrement = data.reduce((accumulator, item) => {
            return accumulator + (item?.new_salary - item?.current_salary);
        }, 0);

        const dT = [...apiData];
        dT.push({
            "current_salary": current,
            "new_salary": newSalary,
            "avg_increment": '-',
            totalIncrement: totalIncrement,
            "total_count": '-',
            "department": {
                "name": "Total",
                "code": "",
            },
            "location": {
                "name": "Total",
                "code": "",
            }
        });
        setData(dT);

    }, [setData, apiData]);

    useEffect(() => {
        setData(apiData);
        setTimeout(() => {
            calcTotalValues(apiData);
        }, 100);
    }, [apiData]);

    const handleDownload = useCallback(() => {
        if (type && listType) {
            serviceIncrementPlannerAnalyticsDownload({
                batch: batch,
                year: year,
                type: planner_type,
                filter_type: type,
                filter_id: listType?.id
            }).then((res) => {
                if (!res.error) {
                    const data = res.data;
                    window.open(data, "_blank");
                }
            });
        } else {
            SnackbarUtils.error("Please Enter listType and Type");
        }
    }, [listType, type, batch, year, planner_type]);

    useEffect(() => {
        _processData();
    }, [data, currentPage]);

    const _processData = useCallback(() => {
        const from = currentPage * totalShow - totalShow;
        let to = currentPage * totalShow;
        if (from <= data?.length) {
            to = to <= data?.length ? to : data?.length;
            setCurrentData(data.slice(from, to));
        }
    }, [setCurrentData, currentPage, data, totalShow]);

    const handlePageChange = useCallback(
        (type) => {
            if (Math.ceil(data?.length / totalShow) >= type + 1) {
                setCurrentPage(type + 1);
                _processData();
            }
        },
        [_processData, setCurrentPage, data]
    );

    const initialApiCall = useCallback(() => {
        if (listType?.id && type) {
            resetData();
        }
    }, [type, listType, setListType]);

    const handleSortOrderChange = useCallback(
        (row, order) => {
            console.log(`handleSortOrderChange key:${row} order: ${order}`);
        },
        [resetData]
    );

    const handleRowSize = (page) => {
        console.log(page);
    };

    const handleViewDetails = useCallback((data) => {
        historyUtils.push(`/employees/details/${data?.emp_code}`);
    }, []);

    return {
        handlePageChange,
        handleRowSize,
        handleSortOrderChange,
        isCalling,
        currentData,
        data: apiData,
        currentPage,
        listType,
        listData,
        type,
        setType,
        initialApiCall,
        handleDownload,
        handleViewDetails,
        setListType,
        slabData,
    };
};

export default useIncrementDetail;

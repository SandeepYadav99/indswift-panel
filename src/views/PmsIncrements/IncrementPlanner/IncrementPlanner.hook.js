import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {serviceGetList} from "../../../services/Common.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import {
    serviceGetIncrementPlanner,
    serviceIncrementPlannerDownload, serviceIncrementPlannerStatus, serviceUpdateIncrementPlanner,
} from "../../../services/IncrementPlanner.service";
import historyUtils from "../../../libs/history.utils";
import LogUtils from "../../../libs/LogUtils";
import {serviceUpdateCandidateStatus} from "../../../services/Candidate.service";
import Constants from "../../../config/constants";
import RouteName from "../../../routes/Route.name";

const totalShow = 50;
const useIncrementPlanner = ({location}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isInfoPanel, setInfoPanel] = useState(false);
    const [isDialog, setIsDialog] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const [isCalling, setIsCalling] = useState(false);
    const [apiData, setApiData] = useState([]);
    const [type, setType] = useState("");
    const [year, setYear] = useState("");
    const [formData, setFormData] = useState({});
    const [changedIds, setChangedIds] = useState([]);
    const [isFreezed, setIsFreezed] = useState(false);

    const [listData, setListData] = useState({
        LOCATIONS: [],
        GRADES: [],
        DEPARTMENTS: []
    });

    const plannerType = useMemo(() => {
        const path = location?.pathname;
        const arr = path.split('/');
        const length = arr.length;
        if (length ===  3) {
            return 'DEFAULT'
        } else if (arr[length-1] === 'red') {
            return 'RED'
        } else {
            return 'NO';
        }
    }, [location]);

    useEffect(() => {
        serviceGetList(["LOCATIONS","DEPARTMENTS","GRADES"]).then((res) => {
            if (!res.error) {
                setListData(res.data);
            }
        });

    }, []);

    const toggleConfirmDialog = useCallback(
        (type) => {
            setIsDialog((e) => !e);
        },
        [setIsDialog]
    );
    const resetData = useCallback(() => {
        serviceGetIncrementPlanner({
            year: year,
            batch: type,
            planner_type: plannerType
        }).then((res) => {
            if (!res.error) {
                const data = res.data;
                setApiData(data);
                const obj = {};
                data.forEach(dt => {
                    obj[dt.id] = {
                        final_percentage: dt?.final_percentage,
                        comments: dt?.comments,
                        overall_hod_is_recommended: dt?.overall_hod_is_recommended,
                    };
                });
                // formData.current = (obj);
                setFormData(obj);
            }
        });

        // serviceIncrementPlannerStatus({
        //     year, batch: type, type: plannerType
        // }).then((res) => {
        //     if(!res.error) {
        //         const status = res?.data;
        //         setIsFreezed(status !== 'PENDING');
        //     }
        // })
    }, [year, type, plannerType]);


    useEffect(() => {
        if (year && type) {
            initialApiCall();
        }
    }, [year, type]);

    useEffect(() => {
        setData(apiData);
    }, [apiData]);

    const handleDownload = useCallback(() => {
        if (type && year) {
            serviceIncrementPlannerDownload({
                year: year,
                batch: type,
                type: plannerType
            }).then((res) => {
                if (!res.error) {
                    const data = res.data?.response;
                    window.open(data, "_blank");
                }
            });
        } else {
            SnackbarUtils.error("Please Enter year and Type");
        }
    }, [year, type, plannerType]);

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

    const queryFilter = useCallback((key, value) => {
        console.log("_queryFilter", key, value);
    }, []);

    const handleFilterDataChange = useCallback(
        (value) => {
            console.log("_handleFilterDataChange", value,{apiData});
            if(value){
                const filteredData = apiData.filter(obj => {
                    for (const filterObj of value) {
                      const { name, value } = filterObj;
                      if (obj.hasOwnProperty(name) && obj[name] === value) {
                        return true;
                      }
                    }
                    return false;
                  });
                  console.log('>>>',filteredData)
            }

            // queryFilter("FILTER_DATA", value);
        },
        [queryFilter,apiData]
    );

    const handleSearchValueChange = useCallback(
        (value) => {
            console.log("_handleSearchValueChange", value);
            queryFilter("SEARCH_TEXT", value);
            if (value) {
                const tempData = apiData?.filter((val) => {
                    if (val?.name?.match(new RegExp(value, "ig")) || val?.code?.match(new RegExp(value, "ig"))) {
                        return val;
                    }
                });
                setData(tempData);
            } else {
                setData(apiData);
            }
        },
        [queryFilter, _processData, data, setData, apiData]
    );

    const initialApiCall = useCallback(() => {
        if (year && type) {
            resetData();
        }
    }, [type, setYear]);

    const handleSortOrderChange = useCallback(
        (row, order) => {
            console.log(`handleSortOrderChange key:${row} order: ${order}`);
        },
        [resetData]
    );

    const handleRowSize = (page) => {
        console.log(page);
    };

    const handleQueryInfo = useCallback((data) => {
        setInfoPanel(true);
    }, []);
    const handleViewDetails = useCallback((data) => {
        historyUtils.push(`/employees/details/${data?.emp_code}`);
    }, []);

    const configFilter = useMemo(() => {
        return [
          ... [
                {
                  label: "Location",
                  name: "location_id",
                  type: "selectObject",
                  custom: { extract: { id: "id", title: "name" } },
                  fields: listData?.LOCATIONS,
                },
              ]
            ,
          {
            label: "Grade",
            name: "grade_id",
            type: "selectObject",
            custom: { extract: { id: "id", title: "label" } },
            fields: listData?.GRADES,
          },
          {
            label: "Department",
            name: "department_id",
            type: "selectObject",
            custom: { extract: { id: "id", title: "name" } },
            fields: listData?.DEPARTMENTS,
          },
          {
            label: "Increment Slab",
            name: "increment_level",
            type: "select",
            fields: ["L1","L2","L3","L4","L5","L6","L7","L8","L9","L10","L11"],
          },
        ];
      }, [listData]);

    const handleValueChange = useCallback((id, name, value) => {
        // const tData = {...formData};
        const tList = [...data];
        const index = data.findIndex(val => val.id === id);
        if (index >= 0) {
            // const dT = tData[id];
            // dT[name] = value;

            // tData[id] = dT;

            const obj = tList[index];
            obj[name] = value;
            if (name === 'final_percentage') {
                obj.increment_amount = Math.ceil((obj.current_incremental_salary * (value / 100)).toFixed(2));
                obj.effective_amount = Math.ceil((((obj.increment_amount / 12) * obj.incr_due_month)).toFixed(2));
                obj.new_salary = Math.ceil((obj.current_incremental_salary + obj.effective_amount).toFixed(2));
            }
            if (name === 'incr_due_month') {
                obj.increment_amount = Math.ceil((obj.current_incremental_salary * (obj.final_percentage / 100)).toFixed(2));
                obj.effective_amount = Math.ceil((((obj.increment_amount / 12) * value)).toFixed(2));
                obj.new_salary = Math.ceil((obj.current_incremental_salary + obj.effective_amount).toFixed(2));
            }
            setData(tList);

            const tChanged = [...changedIds];
            if (tChanged.indexOf(id) < 0) {
                tChanged.push(id);
                setChangedIds(tChanged);
            }
        }
    }, [data, setData, changedIds, setChangedIds]);

    const submitToServer = useCallback(() => {
        const tData = [];
        data.forEach((dT) => {
            // if (changedIds.indexOf(dT.id) >= 0) {
                tData.push({
                    final_percentage: dT.final_percentage,
                    is_promoted: dT.is_promoted,
                    comments: dT?.comments ? dT?.comments : '',
                    increment_amount: dT?.increment_amount,
                    effective_amount: dT?.effective_amount,
                    new_salary: dT?.new_salary,
                    employee_id: dT?.employee_id,
                    incr_due_month: dT?.incr_due_month,
                });
            // }
        });
        if (!isSubmitting) {
            setIsSubmitting(true);
            serviceUpdateIncrementPlanner({data: tData, batch: type, year, type: plannerType}).then((res) => {
                if (!res.error) {
                    SnackbarUtils.success('Data Freezed');
                } else {
                    SnackbarUtils.error(res?.message);
                }
                setIsSubmitting(false);
                toggleConfirmDialog();
                setIsFreezed(true);
            })
        }
    }, [data, isSubmitting, setIsSubmitting, toggleConfirmDialog, changedIds, plannerType, type, year, setIsFreezed]);

    const handleDialogConfirm = useCallback(() => {
        submitToServer();
    }, [submitToServer])

    const handleViewGraph = useCallback(() => {
        historyUtils.push(RouteName.PMS_INCREMENT_PLANNER_GRAPH);
    }, []);



    return {
        handlePageChange,
        handleFilterDataChange,
        handleSearchValueChange,
        handleRowSize,
        handleSortOrderChange,
        isCalling,
        currentData,
        data: apiData,
        currentPage,
        year,
        isInfoPanel,
        handleQueryInfo,
        listData,
        type,
        setType,
        initialApiCall,
        configFilter,
        handleDownload,
        handleViewDetails,
        setYear,
        toggleConfirmDialog,
        isDialog,
        handleValueChange,
        formData,
        handleDialogConfirm,
        isSubmitting,
        handleViewGraph,
        isFreezed
    };
};

export default useIncrementPlanner;

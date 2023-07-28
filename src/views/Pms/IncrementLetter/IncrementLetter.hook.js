import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { serviceGetList } from "../../../services/Common.service";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import {
  serviceFreezeIncrementPlanner,
  serviceIncrementPlannerDownload,
} from "../../../services/IncrementPlanner.service";
import historyUtils from "../../../libs/history.utils";
import { serviceGetIncrementLetter } from "../../../services/incrementLetter.service";

const totalShow = 50;
const useIncrementLetter = ({ location }) => {
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
  const [isFreezing, setIsFreezing] = useState(false);
  const [selected, setSelected] = useState([]);

  const [listData, setListData] = useState({
    LOCATIONS: [],
    GRADES: [],
    DEPARTMENTS: [],
  });

  useEffect(() => {
    serviceGetList(["LOCATIONS", "DEPARTMENTS", "GRADES"]).then((res) => {
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
    setIsCalling(true);
    serviceGetIncrementLetter({
      year: year,
      batch: type,
      // planner_type: "DEFAULT",
    }).then((res) => {
      if (!res.error) {
        const data = res.data;
        setApiData(data);
      }
      setIsCalling(false);
    });
  }, [year, type, setIsCalling]);

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
      }).then((res) => {
        if (!res.error) {
          const data = res.data?.response;
          window.open(data, "_blank");
        }
      });
    } else {
      SnackbarUtils.error("Please Enter year and Type");
    }
  }, [year, type]);

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
      if (value && Array.isArray(value) && value.length > 0) {
        let tData = [...apiData];
        let filteredData = [];
        for (const filterObj of value) {
          const { name, value } = filterObj;
          if (name !== "is_modified") {
            tData = tData.filter((obj) => {
              return obj[name] === value;
            });
          } else {
            tData = tData.filter((obj) => {
              if (value === "YES") {
                return obj.increment_percentage != obj.final_percentage;
              } else {
                return obj.increment_percentage == obj.final_percentage;
              }
            });
          }
        }
        setData(tData);
      } else {
        setData(apiData);
      }
    },
    [queryFilter, apiData, data, setData]
  );

  const handleSearchValueChange = useCallback(
    (value) => {
      console.log("_handleSearchValueChange", value);
      queryFilter("SEARCH_TEXT", value);
      if (value) {
        const tempData = apiData?.filter((val) => {
          if (
            val?.name?.match(new RegExp(value, "ig")) ||
            val?.code?.match(new RegExp(value, "ig"))
          ) {
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
      ...[
        {
          label: "Location",
          name: "loc_id",
          type: "selectObject",
          custom: { extract: { id: "id", title: "name" } },
          fields: listData?.LOCATIONS,
        },
      ],
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
        fields: [
          "L1",
          "L2",
          "L3",
          "L4",
          "L5",
          "L6",
          "L7",
          "L8",
          "L9",
          "L10",
          "L11",
        ],
      },
      {
        label: "Is Modified",
        name: "is_modified",
        type: "select",
        fields: ["YES", "NO"],
      },
    ];
  }, [listData]);

  const handleValueChange = useCallback(
    (id, name, value) => {
      // const tData = {...formData};
      const tList = [...data];
      const index = data.findIndex((val) => val.id === id);
      if (index >= 0) {
        // const dT = tData[id];
        // dT[name] = value;

        // tData[id] = dT;

        const obj = tList[index];
        obj[name] = value;
        if (name === "final_percentage") {
          obj.increment_amount = Math.ceil(
            (obj.current_incremental_salary * (value / 100)).toFixed(2)
          );
          obj.effective_amount = Math.ceil(
            ((obj.increment_amount / 12) * obj.incr_due_month).toFixed(2)
          );
          obj.new_salary = Math.ceil(
            (obj.current_incremental_salary + obj.effective_amount).toFixed(2)
          );
        }
        if (name === "incr_due_month") {
          obj.increment_amount = Math.ceil(
            (
              obj.current_incremental_salary *
              (obj.final_percentage / 100)
            ).toFixed(2)
          );
          obj.effective_amount = Math.ceil(
            ((obj.increment_amount / 12) * value).toFixed(2)
          );
          obj.new_salary = Math.ceil(
            (obj.current_incremental_salary + obj.effective_amount).toFixed(2)
          );
        }
        setData(tList);

        const tChanged = [...changedIds];
        if (tChanged.indexOf(id) < 0) {
          tChanged.push(id);
          setChangedIds(tChanged);
        }
      }
    },
    [data, setData, changedIds, setChangedIds]
  );

  const handleCheckbox = useCallback(
    (data) => {
      const tempSelected = JSON.parse(JSON.stringify(selected));
      const tempIndex = tempSelected.findIndex((sel) => sel.id === data.id);
      if (tempIndex >= 0) {
        tempSelected.splice(tempIndex, 1);
      } else {
        tempSelected.push(data);
      }
      setSelected(tempSelected);
    },
    [selected, setSelected]
  );
  const selectedEmps = useMemo(() => {
    let total = 0;
    selected.forEach((val) => {
      total += val?.total_employees;
    });
    return total;
  }, [selected]);

  const submitToServer = useCallback(() => {
    const tData = [];
    if (!isSubmitting) {
      setIsSubmitting(true);
      // const batchIds = selected.map((val) => val.id);
      // serviceAlignPmsBatch(batchIds).then((res) => {
      //   if (!res.error) {
      //     SnackbarUtils.success("Reviews Aligned SuccessFully");
      //     setSelected([]);
      //     dispatch(actionAlignPmsReview(batchIds));
      //   } else {
      //     SnackbarUtils.error(res?.message);
      //   }
      //   setIsSending(false);
      // });
    }
  }, [
    data,
    isSubmitting,
    setIsSubmitting,
    toggleConfirmDialog,
    changedIds,
    type,
    year,
    setIsFreezed,
    resetData,
  ]);

  const handleDialogConfirm = useCallback(() => {
    submitToServer();
  }, [submitToServer]);

  const freezeIncrementPlanner = useCallback(() => {
    if (!isFreezing) {
      setIsFreezing(true);
      serviceFreezeIncrementPlanner({ batch: type, year }).then((res) => {
        if (!res.error) {
          window.location.reload();
        } else {
          SnackbarUtils.error(res?.message);
        }
        setIsFreezing(false);
      });
    }
  }, [type, year, isFreezing, setIsFreezing]);

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
    isFreezed,
    freezeIncrementPlanner,
    isFreezing,
    selectedEmps,
    selected,
    handleCheckbox,
  };
};

export default useIncrementLetter;

import React, {useEffect} from "react";
import {useCallback} from "react";
import {useState} from "react";
import {serviceGetList} from "../../../../../services/Common.service";
import LogUtils from "../../../../../libs/LogUtils";

const PLANNER_INDEX = {
    SELF: 0,
    PEERS: 1,
    SUBORDINATES: 2,
    SUPERVISORS: 3
};

function useReviewerPlanner() {
    const [isEmployeeDialog, setIsEmployeeDialog] = useState(false);
    const [selectedType, setSelectedType] = useState(null);
    const [listData, setListData] = useState({
        EMPLOYEES: [],
    });
    const [errors, setErrors] = useState([]);
    const [planner, setPlanner] = useState({
        SELF: [],
        PEERS: [],
        SUBORDINATES: [],
        SUPERVISORS: [],
    });
    useEffect(() => {
        serviceGetList(['EMPLOYEES']).then(res => {
            if (!res.error) {
                setListData(res.data);
            }
        });
    }, []);

    useEffect(() => {
        const arr = [];
        Object.keys(planner).forEach((key) => {
            arr.push(planner[key]);
        });
        const availability = new Map();
        for (let i = 0; i < arr.length; i++) {
            const empArr = arr[i];
            for (let j = 0; j < empArr.length; j++) {
                const emp = empArr[j];
                if (!(availability.has(emp.id))) {
                    availability.set(emp.id, `${i}_${j}`);
                } else {

                }
            }
        }
    }, [planner]);

    const toggleEmployeeDialog = useCallback(() => {
        setIsEmployeeDialog((e) => !e);
    }, [setIsEmployeeDialog]);

    const handleDialogSelect = useCallback((data) => {
        const p = {...planner};
        p[selectedType].push(data);
        setPlanner(p);
        setSelectedType(null);
        setIsEmployeeDialog(false);
    }, [setSelectedType, selectedType, setIsEmployeeDialog, planner, setPlanner]);

    const handleAddClick = useCallback((type) => {
        setSelectedType(type);
        setIsEmployeeDialog(true);
    }, [setSelectedType, setIsEmployeeDialog]);

    const handleDeleteClick = useCallback((type, index) => {
        const p = {...planner};
        p[type].splice(index, 1);
        setPlanner(p);
    }, [planner, setPlanner]);

    return {
        toggleEmployeeDialog,
        isEmployeeDialog,
        listData,
        handleDialogSelect,
        planner,
        handleAddClick,
        selectedType,
        handleDeleteClick
    };
}

export default useReviewerPlanner;

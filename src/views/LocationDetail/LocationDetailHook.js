import {useCallback, useEffect, useRef, useState} from "react";
import {
    serviceGetLocationDetails,
    serviceLocationDepartments,
    serviceLocationDepartmentUpdate
} from "../../services/Location.service";
import {useParams} from "react-router";
import Constants from "../../config/constants";
import {serviceGetList} from "../../services/Common.service";
import LogUtils from "../../libs/LogUtils";
import SnackbarUtils from "../../libs/SnackbarUtils";
import historyUtils from "../../libs/history.utils";
import RouteName from "../../routes/Route.name";


const useLocationDetail = ({}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [data, setData] = useState(null);
    const [isHeadDialog, setIsHeadDialog] = useState(false);
    const [isDetails, setIsDetails] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);

    const includeRef = useRef(null);
    const { id } = useParams();

    useEffect(() => {
        serviceGetList(['EMPLOYEES', 'DEPARTMENTS']).then((res) => {
            if (!res.error) {
                setEmployees(res?.data?.EMPLOYEES);
                setDepartments(res?.data?.DEPARTMENTS)
            }
        });
    }, []);

    const toggleHeadDialog = useCallback((data) => {
        setIsHeadDialog(e => !e);
    }, [setIsHeadDialog]);

    const initData = useCallback(() => {
        if (id && !isSubmitting) {
            setIsSubmitting(true);
            const req = serviceGetLocationDetails({ id: id });
            req.then((res) => {
               if (!res.error) {
                   const data = res?.data?.details;
                   setData(data);
                   setIsActive(data?.status === Constants.GENERAL_STATUS.ACTIVE);
               }
               setIsSubmitting(false)
            });
        }
    }, [id, isSubmitting, setIsSubmitting, setIsActive]);

    useEffect(() => {
        initData();
    }, [id]);

    const handleSwitchChange = useCallback(() => {
        setIsActive(e => !e);
    }, [setIsActive]);

    const handleHeadUpdate = useCallback((data) => {
        toggleHeadDialog();
        setData(data)
    }, [toggleHeadDialog, setData]);

    const handleDepartmentUpdate = useCallback(() => {

    }, []);

    const handleUpdateClick = useCallback(() => {
        if (includeRef.current) {
            const isValid = includeRef.current.isValid();
            if (isValid && !isUpdating) {
                setIsUpdating(true);
                const data = includeRef.current.getData();
                const reqData = data.map(val => {
                    return {
                        department_id: val?.department_id,
                        employee_id: val?.employee?.id,
                    };
                });
                serviceLocationDepartmentUpdate({
                    location_id: id,
                    data: reqData
                }).then(res => {
                    if (!res.error) {
                        SnackbarUtils.success('Departments updated successfully');
                    } else {
                        SnackbarUtils.error(res?.message);
                    }
                    setIsUpdating(false);
                })
            }
        }
    }, [id, isUpdating, setIsUpdating]);

    const handleEditBtn = useCallback(() => {
        historyUtils.push(RouteName.LOCATIONS_UPDATE+id);
    }, [id]);

    return {
        isSubmitting,
        data,
        toggleHeadDialog,
        isHeadDialog,
        isDetails,
        setIsDetails,
        isActive,
        handleSwitchChange,
        employees,
        id,
        handleHeadUpdate,
        departments,
        includeRef,
        handleDepartmentUpdate,
        handleUpdateClick,
        handleEditBtn
    };
};

export default useLocationDetail;

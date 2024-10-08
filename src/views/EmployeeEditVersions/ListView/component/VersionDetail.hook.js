import {useCallback, useEffect, useState} from "react";
import {
    serviceGetVersionDetail,
    serviceVersionApprove,
    serviceVersionReject
} from "../../../../services/EmployeeEdit.service";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
import {useDispatch} from "react-redux";
import {actionUpdateEmployeeVersion} from "../../../../actions/EmployeeEditVersions.action";


const useVersionDetails = ({id, isOpen, handleClose}) => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
       if (isOpen && id) {
           serviceGetVersionDetail({id: id}).then((res) => {
               setIsLoading(true);
               if (!res?.error) {
                   setData(res?.data);
               }
               setIsLoading(false);
           });
       }
    }, [isOpen, id]);

    const handleApprove = useCallback(() => {
        if (!isSubmitting) {
            serviceVersionApprove({id: id}).then((res) => {
                if (!res.error) {
                    SnackbarUtils.success('Approved');
                    dispatch(actionUpdateEmployeeVersion(res?.data));
                    handleClose();
                } else {
                    SnackbarUtils.error(res?.message);
                }
                setIsSubmitting(false);
            });
        }
    }, [id, isSubmitting, setIsSubmitting, handleClose, dispatch]);

    const handleReject = useCallback(() => {
        if (!isSubmitting) {
            serviceVersionReject({id: id}).then((res) => {
                if (!res.error) {
                    SnackbarUtils.success('Rejected');
                    dispatch(actionUpdateEmployeeVersion(res?.data));
                    handleClose();
                } else {
                    SnackbarUtils.error(res?.message);
                }
                setIsSubmitting(false);
            });
        }
    }, [id, isSubmitting, setIsSubmitting, handleClose, dispatch]);

    return {
        isLoading,
        data,
        handleReject,
        handleApprove,
        isSubmitting
    };
};

export default useVersionDetails;

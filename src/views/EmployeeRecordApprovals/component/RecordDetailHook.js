import { useCallback, useEffect, useState } from "react";
import { serviceGetVersionDetails } from "../../../services/EmployeeEdit.service";

const useRecordDetail = ({ id, isOpen }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting] = useState(false);
  const [isApprovalPopUp, setIsApprovalPopUp] = useState(false);
  const [isRejectPopUp, setIsRejectPopUp] = useState(false);

  useEffect(() => {
    if (isOpen && id) {
      serviceGetVersionDetails({ id: id }).then((res) => {
        setIsLoading(true);

        if (!res?.error) {
          setData(res?.data);
        }

        setIsLoading(false);
      });
    }
  }, [isOpen, id]);

  const toggleApprovalDialog = useCallback(() => {
    setIsApprovalPopUp((e) => !e);

  }, [isApprovalPopUp]);

  const toggleRejectDialog = useCallback(() => {
    setIsRejectPopUp((e) => !e);
    
  }, [isRejectPopUp]);

  return {
    isLoading,
    data,
    isSubmitting,
    toggleApprovalDialog,
    isApprovalPopUp,
    isRejectPopUp,
    toggleRejectDialog,
  };
};

export default useRecordDetail;

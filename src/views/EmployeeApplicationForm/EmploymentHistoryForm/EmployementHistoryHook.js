import {useCallback, useEffect, useRef, useState} from "react";
import handleSubmit from "redux-form/lib/handleSubmit";
import LogUtils from "../../../libs/LogUtils";
import {
  serviceCandidateEAFUpdateEmployment,
  serviceCandidateEafUpdatePersonal, serviceGetCandidateEAFEmployment
} from "../../../services/CandidateEAF.service";
import historyUtils from "../../../libs/history.utils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
import useEAFSession from "../EAFSessionHook";
import RouteName from "../../../routes/Route.name";

const useEmploymentHistory = ({}) => {
  const { candidateId } = useEAFSession();
  const [isTermChecked, setIsTermChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFresher, setIsFresher] = useState(true);
  const refEmpHistory = useRef(null);
  const refSalary = useRef(null);
  const refAdditional = useRef(null);

  useEffect(() => {
    if (candidateId) {
      serviceGetCandidateEAFEmployment({candidate_id: candidateId}).then((res) => {
        if (!res.error) {
          const tempData = res?.data?.details;
          if (tempData) {
            const { employment_history, additional_data, is_employment, ...rest } = tempData;
            refEmpHistory.current?.setData(employment_history);
            if (employment_history?.length > 0) {
              setIsFresher(false);
            }
            refSalary.current?.setData(rest);
            refAdditional.current?.setData(additional_data);
          }
        }
      });
    }
  }, [candidateId]);

  const handleSubmit = useCallback(() => {
    if (!isSubmitting) {
      const isEmpHistoryValid = isFresher ? true : refEmpHistory.current.isValid();
      const isSalaryValid = refSalary.current.isValid();
      const isAdditionalValid = refAdditional.current.isValid();
      LogUtils.log('isPerosnalValid', isEmpHistoryValid, isSalaryValid, isAdditionalValid);
      if ((isEmpHistoryValid) && isSalaryValid && isAdditionalValid) {
        setIsSubmitting(true);
        const empHistoryData = refEmpHistory.current.getData();
        const salaryData = refSalary.current.getData();
        const additionalData = refAdditional.current.getData();
        serviceCandidateEAFUpdateEmployment({
          candidate_id: candidateId,
          employment_history: isFresher ? [] : empHistoryData,
          ...salaryData,
          additional_data: additionalData,
        }).then((res) => {
          if (!res.error) {
            historyUtils.push(RouteName.EAF_SUCCESS);
          } else {
            SnackbarUtils.error(res?.message);
          }
          setIsSubmitting(false);
        });
      }
    }
  }, [isSubmitting, setIsSubmitting, isFresher, candidateId]);

  return {
    refEmpHistory,
    handleSubmit,
    refSalary,
    refAdditional,
    isSubmitting,
    isFresher,
    setIsFresher,
    isTermChecked,
    setIsTermChecked
  }
};

export default useEmploymentHistory;

import React from "react";
import {
  serviceGetCadreEntitlementDetails,
  serviceGetCadreFormDetails,
} from "../../services/CadreDetail.service";
import { useState } from "react";
import SnackbarUtils from "../../libs/SnackbarUtils";
import historyUtils from "../../libs/history.utils";
import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useCallback } from "react";
import LogUtils from "../../libs/LogUtils";
import { useRef } from "react";
import RouteName from "../../routes/Route.name";

const initialForm = {
  max_salary: 0,
  min_salary: 0,
  mdn_salary: 0,
};

function useCadreDetailsList() {
  const [employeeDetail, setEmployeeDetail] = useState({});
  const [form, setForm] = useState({ ...initialForm });
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const refMarrige = useRef(null);
  const refCar = useRef(null);
  const refMobile = useRef(null);
  const refHealth = useRef(null);
  const reftravel = useRef(null);
  const refLoc = useRef(null);
  const refImp = useRef(null);

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      serviceGetCadreFormDetails({ id: id }).then((res) => {
        if (!res.error) {
          const tempData = res?.data?.details;
          if (tempData) {
            const {
              marriage_gift_claim,
              car_maintenance_claim,
              mobile_reimbursement_claim,
              phc_claim,
              local_travel_claim,
              relocation_claim,
              imprest,
              salary_component,
              ...rest
            } = tempData;
            setEmployeeDetail({ ...rest });
            refMarrige.current?.setData(marriage_gift_claim);
            refCar.current?.setData(car_maintenance_claim);
            refMobile.current?.setData(mobile_reimbursement_claim);
            refHealth.current?.setData(phc_claim);
            reftravel.current?.setData(local_travel_claim);
            refLoc.current?.setData(relocation_claim);
            refImp.current?.setData(imprest);
            setForm(salary_component)
          }
        }
      });
    }
  }, [id]);
  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    let required = ["max_salary", "min_salary", "mdn_salary"];

    required.forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      }
    });
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData]);

  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );

  const changeTextData = useCallback(
    (text, fieldName) => {
      // LogUtils.log(text, fieldName);
      let shouldRemoveError = true;
      const t = { ...form };
      if(text >=0){
        t[fieldName] = text;
      }
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );
  
  const handleSubmit = useCallback(() => {
    if (!isSubmitting) {
      const errors = checkFormValidation();
      if (Object.keys(errors).length > 0) {
        setErrorData(errors);
        return true;
      }
      const isMarrigeClaimValid = refMarrige.current.isValid();
      const isCarClaimValid = refCar.current.isValid();
      const isMobileClaimValid = refMobile.current.isValid();
      const isHealthClaimValid = refHealth.current.isValid();
      const isTravelClaimValid = reftravel.current.isValid();
      const isLocValid = refLoc?.current?.isValid();
      const isImpValid = refImp?.current?.isValid();
      LogUtils.log(
        "isMarrigeClaimValid",
        isMarrigeClaimValid,
        isCarClaimValid,
        isMobileClaimValid,
        isHealthClaimValid,
        isImpValid,
        errors
        // isTravelClaimValid
      );
      // const isCarClaimValid = refCar.current.isValid();
      // const isMobileValid = refMobile.current.isValid();
      // LogUtils.log(
      //   "isPerosnalValid",
      //   isMarrigeClaimValid,
      //   isCarClaimValid,
      //   isMobileValid
      // );
      if (
        isMarrigeClaimValid &&
        isCarClaimValid &&
        isMobileClaimValid &&
        isHealthClaimValid &&
        isTravelClaimValid &&
        isLocValid &&
        isImpValid &&
        !Object.keys(errors).length
      ) {
        setIsSubmitting(true);
        const marrigeData = refMarrige.current.getData();
        const carData = refCar.current.getData();
        const mobileData = refMobile.current.getData();
        const healthData = refHealth.current.getData();
        const travelData = reftravel.current.getData();
        const locData = refLoc.current.getData();
        const ImpData = refImp.current.getData();
        serviceGetCadreEntitlementDetails({
          id: id,
          marriage_gift_claim: marrigeData?.data,
          car_maintenance_claim: carData?.data,
          mobile_reimbursement_claim: mobileData?.data,
          phc_claim: healthData?.data,
          local_travel_claim: travelData?.data,
          relocation_claim: locData?.data,
          imprest: ImpData?.data,
          salary_component:form
        }).then((res) => {
          if (!res.error) {
            historyUtils.push(
              `${RouteName.CADRES}${employeeDetail?.grade?.code}`
            );
          } else {
            SnackbarUtils.error(res?.message);
          }
          setIsSubmitting(false);
        });
      }
    }
  }, [form,isSubmitting, setIsSubmitting, id, employeeDetail,setErrorData]);

  return {
    form,
    changeTextData,
    onBlurHandler,
    errorData,
    refMarrige,
    refCar,
    refMobile,
    handleSubmit,
    employeeDetail,
    refHealth,
    reftravel,
    refLoc,
    refImp,
  };
}

export default useCadreDetailsList;

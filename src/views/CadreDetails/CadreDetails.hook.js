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

function useCadreDetailsList() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [employeeDetail,setEmployeeDetail]=useState({})
  const [isSubmitting, setIsSubmitting] = useState(false);
  const refMarrige = useRef(null);
  const refCar = useRef(null);
  const refMobile = useRef(null);
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
              ...rest
            } = tempData;
            setEmployeeDetail({...rest})
            refMarrige.current?.setData(marriage_gift_claim);
            refCar.current?.setData(car_maintenance_claim);
            refMobile.current?.setData(mobile_reimbursement_claim);
          }
        }
      });
    }
  }, [id]);

  const handleSubmit = useCallback(() => {
    if (!isSubmitting) {
      const isMarrigeClaimValid = refMarrige.current.isValid();
      const isCarClaimValid = refCar.current.isValid();
      const isMobileClaimValid = refMobile.current.isValid();
      LogUtils.log(
        "isMarrigeClaimValid",
        isMarrigeClaimValid,
        isCarClaimValid,
        isMobileClaimValid
      );
      // const isCarClaimValid = refCar.current.isValid();
      // const isMobileValid = refMobile.current.isValid();
      // LogUtils.log(
      //   "isPerosnalValid",
      //   isMarrigeClaimValid,
      //   isCarClaimValid,
      //   isMobileValid
      // );
      if (isMarrigeClaimValid && isCarClaimValid && isMobileClaimValid) {
        setIsSubmitting(true);
        const marrigeData = refMarrige.current.getData();
        const carData = refCar.current.getData();
        const mobileData = refMobile.current.getData();
        serviceGetCadreEntitlementDetails({
          id: id,
          marriage_gift_claim: marrigeData?.data,
          car_maintenance_claim: carData?.data,
          mobile_reimbursement_claim: mobileData?.data,
        }).then((res) => {
          if (!res.error) {
            historyUtils.push(RouteName.GRADES);
          } else {
            SnackbarUtils.error(res?.message);
          }
          setIsSubmitting(false);
        });
      }
    }
  }, [isSubmitting, setIsSubmitting, id]);


  return {
    refMarrige,
    refCar,
    refMobile,
    handleSubmit,
    employeeDetail,
  };
}

export default useCadreDetailsList;

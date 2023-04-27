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
  const refHealth = useRef(null);
  const reftravel=useRef(null)
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
              ...rest
            } = tempData;
            setEmployeeDetail({...rest})
            refMarrige.current?.setData(marriage_gift_claim);
            refCar.current?.setData(car_maintenance_claim);
            refMobile.current?.setData(mobile_reimbursement_claim);
            refHealth.current?.setData(phc_claim);
            reftravel.current?.setData(local_travel_claim)
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
      const isHealthClaimValid=refHealth.current.isValid()
      const isTravelClaimValid=reftravel.current.isValid()
      LogUtils.log(
        "isMarrigeClaimValid",
        isMarrigeClaimValid,
        isCarClaimValid,
        isMobileClaimValid,
        isHealthClaimValid,
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
      if (isMarrigeClaimValid && isCarClaimValid && isMobileClaimValid && isHealthClaimValid && isTravelClaimValid) {
        setIsSubmitting(true);
        const marrigeData = refMarrige.current.getData();
        const carData = refCar.current.getData();
        const mobileData = refMobile.current.getData();
        const healthData=refHealth.current.getData()
        const travelData=reftravel.current.getData()
        serviceGetCadreEntitlementDetails({
          id: id,
          marriage_gift_claim: marrigeData?.data,
          car_maintenance_claim: carData?.data,
          mobile_reimbursement_claim: mobileData?.data,
          phc_claim:healthData?.data,
          local_travel_claim:travelData?.data
          
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
    refHealth,
    reftravel
  };
}

export default useCadreDetailsList;

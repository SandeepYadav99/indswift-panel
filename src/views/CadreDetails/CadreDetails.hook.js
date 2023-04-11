import React from "react";
import { serviceGetCadreEntitlementDetails } from "../../services/CadreDetail.service";
import { useState } from "react";
import SnackbarUtils from "../../libs/SnackbarUtils";
import historyUtils from "../../libs/history.utils";
import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useCallback } from "react";
const initialForm = {
  marriage_gift_claim: {
    is_show: true,
    max_claim: 2,
    max_value: 21,
  },
};
function useCadreDetailsList() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorData, setErrorData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ ...initialForm });
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  //   useEffect(() => {
  //     if (id) {
  //         serviceGetCadreEntitlementDetails({ id: id }).then((res) => {
  //         if (!res.error) {
  //           const data = res?.data?.details;
  //           setForm({
  //             ...data,
  //           });
  //         } else {
  //           SnackbarUtils.error(res?.message);
  //           historyUtils.goBack();
  //         }
  //       });
  //     }
  //   }, [id]);
   
  return {
    form,
    errorData,
  };
}

export default useCadreDetailsList;

import React, { useCallback, useEffect, useState } from "react";
import { serviceGetPmsList } from "../../services/PmsMaster.service";
import { Snackbar } from "@material-ui/core";

function usePMSMasterAdmin() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getPmsList();
  }, []);

  const getPmsList = useCallback(() => {
    let req = serviceGetPmsList();
    req.then((res) => {
      if (!res?.error) {
        setData(res?.data?.response);
      } else {
        Snackbar.error(res?.error);
      }
    });
  }, [data, setData]);
  return {
    data,
    getPmsList
  };
}

export default usePMSMasterAdmin;

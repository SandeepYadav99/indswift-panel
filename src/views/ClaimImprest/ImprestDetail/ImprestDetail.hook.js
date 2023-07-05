import React, { useEffect, useState } from 'react'
import { useParams } from "react-router";
import { serviceGetmyImprestDetailsCLaim } from '../../../services/ClaimsManagement.service';

function useImprestDetailhook() {
  const [employeeDetail, setEmployeeDetail] = useState({});
  const { id } = useParams();
  useEffect(() => {
    let req = serviceGetmyImprestDetailsCLaim({ id: id });
    req.then((data) => {
      setEmployeeDetail(data?.data?.details);
    });
  }, [id]);
  console.log('employeeDetail',employeeDetail)
  return {
    id,
    employeeDetail,
  };
}

export default useImprestDetailhook
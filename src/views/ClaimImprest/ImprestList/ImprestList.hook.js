import { useEffect, useState } from "react";
import { useCallback } from "react";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";
import { useSelector } from "react-redux";
import { serviceGetImprestType } from "../../../services/ImprestApproval.service";

const useImprestList = ({ jobId }) => {
  const [candidateEl, setCandidateEl] = useState(null);
  const [typeData, setTypeData] = useState({});
  const {
    user: { user_id },
  } = useSelector((state) => state.auth);
  console.log("role", user_id);
  const handleAddCandidate = useCallback(
    (event) => {
      setCandidateEl(event.currentTarget);
    },
    [setCandidateEl]
  );
  useEffect(() => {
    if (user_id) {
      let req = serviceGetImprestType({
        employee_id: user_id,
      });
      req.then((data) => {
        setTypeData(data?.data);
      });
    }
  }, [user_id]);
  const handleCreate = useCallback(() => {
    historyUtils.push(`${RouteName.CLAIMS_IMPREST_CREATE}`);
  }, []);
  return {
    handleAddCandidate,
    candidateEl,
    handleCreate,
    typeData,
    user_id,
  };
};

export default useImprestList;

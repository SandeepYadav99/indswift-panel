import { useState } from "react";
import { useCallback } from "react";
import historyUtils from "../../../libs/history.utils";
import RouteName from "../../../routes/Route.name";

const useImprestList = ({ jobId }) => {
  const [candidateEl, setCandidateEl] = useState(null);

  const handleAddCandidate = useCallback(
    (event) => {
      setCandidateEl(event.currentTarget);
    },
    [setCandidateEl]
  );
  const handleCreate = useCallback(() => {
    historyUtils.push(`${RouteName.CLAIMS_IMPREST_CREATE}`);
}, []);
  return {
    handleAddCandidate,
    candidateEl,
    handleCreate
  };
};

export default useImprestList;

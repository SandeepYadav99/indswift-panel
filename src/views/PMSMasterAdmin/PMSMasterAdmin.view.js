import React, { useMemo } from "react";
import PerformanceTable from "./components/PerformanceTable/PerformanceTable.compoent";
import ReviewerTable from "./components/ReviewerTable/ReviewerTable.compoent";
import usePMSMasterAdmin from "./PMSMasterAdmin.hook";
import TypeFiveTable from "./components/TypeFiveTable/TypeFiveTable.compoent";
import HodBatchTable from "./components/HodBatchTable/HodBatchTable.compoent";
import OverallHodBatchTable from "./components/OverallHodBatchTable/OverallHodBatchTable.compoent";
import FirstNormalizeTable from "./components/FirstNormalizeTable/FirstNormalizeTable.compoent";
import CloseTable from "./components/CloseTable/CloseTable.compoent";

function PMSMasterAdmin() {
  const { data, getPmsList } = usePMSMasterAdmin();
  const firstNormalizeData = useMemo(() => {
    const filteredData = data?.filter((item) => item?.is_reviewer_normalized);
    return filteredData ? filteredData : [];
  }, [data]);
  
  const secondNormalizeData = useMemo(() => {
    const filteredData = data?.filter((item) => item?.is_hod_normalized);
    return filteredData ? filteredData : [];
  }, [data]);

  const batchCloseData = useMemo(() => {
    const filteredData = data?.filter((item) => item?.is_closed);
    return filteredData ? filteredData : [];
  }, [data]);

  return (
    <div>
      <PerformanceTable Renderdata={data} getPmsList={getPmsList} />
      <ReviewerTable Renderdata={data} getPmsList={getPmsList} />
      <TypeFiveTable Renderdata={data} getPmsList={getPmsList} />
      <FirstNormalizeTable
        Renderdata={firstNormalizeData}
        getPmsList={getPmsList}
        normalizeType="REVIEWER"
        placeholder="First Normalization - APMS"
      />
      <HodBatchTable Renderdata={data} getPmsList={getPmsList} />
      <OverallHodBatchTable Renderdata={data} getPmsList={getPmsList} />
      <FirstNormalizeTable
        Renderdata={secondNormalizeData}
        getPmsList={getPmsList}
        normalizeType="HOD"
        placeholder="Second Normalization - APMS"
      />
      <CloseTable
        Renderdata={batchCloseData}
        getPmsList={getPmsList}
        normalizeType="HOD"
      />
    </div>
  );
}

export default PMSMasterAdmin;

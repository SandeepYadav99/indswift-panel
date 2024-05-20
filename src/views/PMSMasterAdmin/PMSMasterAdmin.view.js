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

  const currentBatch = useMemo(() => {
    return data?.length > 0 ? data[0]?.batch : "";
  }, [data]);

  console.log("data",data)
  return (
    <div>
      <PerformanceTable Renderdata={data} getPmsList={getPmsList} />
      {data[0]?.batch && (
        <ReviewerTable
          Renderdata={data}
          getPmsList={getPmsList}
          currentBatch={currentBatch}
        />
      )}
      {data[0]?.reviewer_batch?.is_freezed && (
        <TypeFiveTable
          Renderdata={data}
          getPmsList={getPmsList}
          currentBatch={currentBatch}
        />
      )}
      {data[0]?.type_five_batch?.is_freezed && (
        <FirstNormalizeTable
          Renderdata={firstNormalizeData}
          getPmsList={getPmsList}
          normalizeType="REVIEWER"
          placeholder={`First Normalization - ${currentBatch}`}
        />
      )}
      {data[0]?.is_reviewer_normalized && (
        <HodBatchTable
          Renderdata={data}
          getPmsList={getPmsList}
          currentBatch={currentBatch}
        />
      )}
      {data[0]?.hod_batch?.is_freezed && (
        <OverallHodBatchTable
          Renderdata={data}
          getPmsList={getPmsList}
          currentBatch={currentBatch}
        />
      )}
      {data[0]?.overall_hod_batch?.is_freezed && (
        <FirstNormalizeTable
          Renderdata={secondNormalizeData}
          getPmsList={getPmsList}
          normalizeType="HOD"
          placeholder={`Second Normalization - ${currentBatch}`}
        />
      )}
      {data[0]?.is_hod_normalized && (
        <CloseTable
          Renderdata={batchCloseData}
          getPmsList={getPmsList}
          normalizeType="HOD"
          currentBatch={currentBatch}
        />
      )}
    </div>
  );
}

export default PMSMasterAdmin;

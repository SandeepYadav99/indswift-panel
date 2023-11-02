import React from "react";
import { serviceGetExitInterviewDetails } from "../../../services/ExitInterview.service";
import { useParams } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";

function useExitDetail() {
  const [employeeDetail, setEmployeeDetail] = useState({});
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      serviceGetExitInterviewDetails({ id: id }).then((res) => {
        if (!res.error) {
          const tempData = res?.data?.details;
          setEmployeeDetail(tempData);
        }
      });
    }
  }, [id]);

  const UpperTable = useMemo(() => {
    if (employeeDetail?.id) {
      return [
        {
          level:
            "Discharge family responsibilities or attend personal problems",
          percentage: employeeDetail?.discharge_family_responsibility,
        },
        {
          level: "Get closer to your home town",
          percentage: employeeDetail?.get_closer_to_your_home_town,
        },
        {
          level: "Get more basic salary/take home salary",
          percentage: employeeDetail?.get_more_basic_salary,
        },
        {
          level: "Get more perks and Employee benefits",
          percentage: employeeDetail?.get_more_perks_and_employee_benefits,
        },
        {
          level: "Have more job responsibilities and exposure",
          percentage:
            employeeDetail?.have_more_job_responsibilities_and_exposure,
        },
        {
          level: "Have better career prospects (growth and development)",
          percentage: employeeDetail?.have_better_carreer_prospects,
        },
        {
          level:
            "Get more challenging, innovative & dynamic working environment",
          percentage:
            employeeDetail?.get_more_challenging_innovative_dynamic_working_env,
        },
        {
          level: "Due to some health problem",
          percentage: employeeDetail?.due_to_some_health_problem,
        },
        {
          level:
            "Due to my Supervisor or other work relations with Colleagues etc",
          percentage:
            employeeDetail?.due_to_my_supervisor_work_relations_with_colleagues,
        },
      ];
    } else {
      return [];
    }
  }, [employeeDetail]);

  const LowerTable = useMemo(() => {
    if (employeeDetail?.id) {
      return [
        {
          level: "Growth and Development",
          count: employeeDetail?.growth_development_status,
          percentage: employeeDetail?.growth_development_rank,
        },
        {
          level: "Salary & Perks",
          count: employeeDetail?.salary_perks_status,
          percentage: employeeDetail?.salary_perks_rank,
        },
        {
          level: "Working condition",
          count: employeeDetail?.working_condition_status,
          percentage: employeeDetail?.working_condition_rank,
        },
        {
          level: "Job related responsibilities",
          count: employeeDetail?.job_responsibilities_status,
          percentage: employeeDetail?.job_responsibilities_rank,
        },
        {
          level: "Working culture",
          count: employeeDetail?.working_culture_status,
          percentage: employeeDetail?.working_culture_rank,
        },
      ];
    } else {
      return [];
    }
  }, [employeeDetail]);
  return {
    employeeDetail,
    UpperTable,
    LowerTable,
  };
}

export default useExitDetail;

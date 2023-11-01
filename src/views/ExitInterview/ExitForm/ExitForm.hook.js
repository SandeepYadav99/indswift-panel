import { useCallback, useEffect, useState } from "react";
import { serviceApproveCLaim } from "../../../services/Claims.service";
import RouteName from "../../../routes/Route.name";
import historyUtils from "../../../libs/history.utils";
import SnackbarUtils from "../../../libs/SnackbarUtils";
// import useEAFSession from "../../EmployeeApplicationForm/EAFSessionHook";

const Ratingkeys = [
  "get_closer_to_your_home_town",
  "discharge_family_responsibility",
  "get_more_basic_salary",
  "get_more_perks_and_employee_benefits",
  "have_more_job_responsibilities_and_exposure",
  "have_better_carreer_prospects",
  "get_more_challenging_innovative_dynamic_working_env",
  "due_to_my_supervisor_work_relations_with_colleagues",
  "due_to_some_health_problem",
];
const perksKeys = [
  "salary_perks_rank",
  "growth_development_rank",
  "working_condition_rank",
  "job_responsibilities_rank",
  "working_culture_rank",
];
const organisedKeys = [
  "organization",
  "area_of_organization",
  "deographic_location_of_organization",
  "how_much_salary_growth",
];
const initialForm = {
  get_closer_to_your_home_town: "",
  discharge_family_responsibility: "",
  get_more_basic_salary: "",
  get_more_perks_and_employee_benefits: "",
  have_more_job_responsibilities_and_exposure: "",
  have_better_carreer_prospects: "",
  get_more_challenging_innovative_dynamic_working_env: "",
  due_to_my_supervisor_work_relations_with_colleagues: "",
  due_to_some_health_problem: "",
  salary_perks_rank: "",
  salary_perks_status: "",
  growth_development_rank: "",
  growth_development_status: "",
  working_condition_rank: "",
  working_condition_status: "",
  job_responsibilities_rank: "",
  job_responsibilities_status: "",
  working_culture_rank: "",
  working_culture_status: "",
  strengths_of_company: "",
  weaknesses_of_company: "",
  suggestions_of_improvements: "",
  job_challenging: "",
  job_regularly_enhance: "",
  job_condition_location: "",
  job_experience_growth: "",
  job_organisation_provide: "",
  job_feel_boss_organisation_provide: "",
  new_job_compare_with_organisation_in_term_job_contents: "",
  organization: "",
  area_of_organization: "",
  deographic_location_of_organization: "",
  how_much_salary_growth: "",
  job_function: "",
  people: "",
  scale_of_satisfaction_level: "",
  would_you_recommend_your_friend: "",
  would_you_rejoin_organisation: "",
};
const useExitForm = () => {
  const [form, setForm] = useState(
    JSON.parse(JSON.stringify({ ...initialForm }))
  );
  const [errorData, setErrorData] = useState({});
  const [resData, setResData] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [declaration, setDeclaration] = useState(false);
  // const { candidateId } = useEAFSession();

  const removeError = useCallback(
    (title) => {
      const temp = JSON.parse(JSON.stringify(errorData));
      temp[title] = false;
      setErrorData(temp);
    },
    [setErrorData, errorData]
  );
  // useEffect(() => {
  //   if (candidateId) {
  //     serviceGetExitFormDetails({ id: candidateId }).then((res) => {
  //       if (!res.error) {
  //         const tempData = res?.data;
  //         // setCandidateData(tempData?.details);
  //         // setImage(tempData?.details?.image);
  //       }
  //     });
  //     // serviceGetCandidateEafPersonalDetails({ candidate_id: candidateId }).then(
  //     //   (res) => {
  //     //     if (!res.error) {
  //     //       const tempData = res?.data?.details;
  //     //       if (tempData) {
  //     //         const { contact, family, ...rest } = tempData;
  //     //         refPersonalForm.current?.setData(rest);
  //     //         refContactForm.current?.setData(contact);
  //     //         refFamilyDetail.current?.setData(family);
  //     //       }
  //     //     }
  //     //   }
  //     // );
  //   }
  // }, [candidateId]);
  const changeTextData = useCallback(
    (text, fieldName) => {
      let shouldRemoveError = true;
      const t = { ...form };
      t[fieldName] = text;
      setForm(t);
      shouldRemoveError && removeError(fieldName);
    },
    [removeError, form, setForm]
  );

  const checkFormValidation = useCallback(() => {
    const errors = { ...errorData };
    Object.keys({ ...initialForm }).forEach((val) => {
      if (
        !form?.[val] ||
        (Array.isArray(form?.[val]) && form?.[val].length === 0)
      ) {
        errors[val] = true;
      } else if ([].indexOf(val) < 0) {
        delete errors[val];
      }
    });
    const keysWithSameValues = [];

    for (let i = 0; i < Ratingkeys?.length; i++) {
      for (let j = i + 1; j < Ratingkeys?.length; j++) {
        const key1 = Ratingkeys[i];
        const key2 = Ratingkeys[j];
        if (
          form[key1] !== undefined &&
          form[key2] !== undefined &&
          form[key1] === form[key2]
        ) {
          keysWithSameValues.push(key1, key2);
        }
      }
    }
    const uniqueValues = [...new Set(keysWithSameValues)];
    uniqueValues?.length > 0 &&
      uniqueValues?.forEach((keys) => {
        errors[keys] = true;
      });
    const keysOfPerks = [];
    for (let i = 0; i < perksKeys?.length; i++) {
      for (let j = i + 1; j < perksKeys?.length; j++) {
        const key1 = perksKeys[i];
        const key2 = perksKeys[j];
        if (
          form[key1] !== undefined &&
          form[key2] !== undefined &&
          form[key1] === form[key2]
        ) {
          keysOfPerks.push(key1, key2);
        }
      }
    }
    const uniquePerksValues = [...new Set(keysOfPerks)];

    uniquePerksValues?.length > 0 &&
      uniquePerksValues?.forEach((keys) => {
        errors[keys] = true;
      });

    console.log("keys", uniquePerksValues, uniqueValues);
    Object.keys(errors).forEach((key) => {
      if (!errors[key]) {
        delete errors[key];
      }
    });
    return errors;
  }, [form, errorData, setForm]);

  console.log("form", form);
  const submitToServer = useCallback(() => {
    if (!isSubmitting) {
      console.log("hit", form);
      setIsSubmitting(true);
      const result = {};

      for (const key in form) {
        if (organisedKeys.includes(key)) {
          if (!result.response_to_8a) {
            result.response_to_8a = {};
          }
          result.response_to_8a[key] = form[key];
        } else {
          result[key] = form[key];
        }
      }
      console.log("result", result);
      // serviceApproveCLaim({
      //   ...form,
      // }).then((res) => {
      //   if (!res.error) {
      //     SnackbarUtils.success("Request Placed Successfully");
      //     historyUtils.push(RouteName.EXIT_SUCCESS);
      //   } else {
      //     SnackbarUtils.error(res?.message);
      //   }
      //   setIsSubmitting(false);
      // });
    }
  }, [form, isSubmitting, setIsSubmitting]);

  const handleSubmit = useCallback(async () => {
    const errors = checkFormValidation();
    console.log("===>", { form, errors });
    // LogUtils.log("errors", errors);
    if (Object.keys(errors).length > 0) {
      setErrorData(errors);
      return true;
    }

    submitToServer();
  }, [checkFormValidation, setErrorData, form, submitToServer, setForm]);

  const onBlurHandler = useCallback(
    (type) => {
      if (form?.[type]) {
        changeTextData(form?.[type].trim(), type);
      }
    },
    [changeTextData]
  );

  return {
    form,
    changeTextData,
    onBlurHandler,
    removeError,
    handleSubmit,
    errorData,
    isSubmitting,
    resData,
    isSubmitted,
    declaration,
    setDeclaration,
  };
};

export default useExitForm;

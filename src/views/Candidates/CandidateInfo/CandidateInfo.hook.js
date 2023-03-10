import React from "react";
import { useState } from "react";
import { useCallback } from "react";
import { isAlphaNumChars } from "../../../libs/RegexUtils";

function useCandidateInfo() {
  const [form, setForm] = useState({current_address:"abc",blood_group:"A+"});
  const changeTextData = useCallback(
    (text, fieldName) => {
      const t = { ...form };
      if (fieldName === "name" || fieldName === "address") {
        if (!text || (isAlphaNumChars(text) && text.toString().length <= 50)) {
          t[fieldName] = text;
        }
      } else {
        t[fieldName] = text;
      }
      setForm(t);
    },
    [ form, setForm]
  );

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
  };
}

export default useCandidateInfo;

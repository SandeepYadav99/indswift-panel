import React from "react";
import PerformanceView from "./component/PerformanceView/PerformanceView";
import styles from "./Style.module.css";

function EvaluationForm() {
  return (
    <div>
      <PerformanceView
        title="1. Experience"
        question="Does the candidate acquired Relevant skills or qualifications through past work experiences?"
      />
    </div>
  );
}

export default EvaluationForm;

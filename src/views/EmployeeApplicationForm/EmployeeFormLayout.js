import React from "react";
import EmployeePersonalForm from "./EmployeeForm";

function EmployeeFormLayout() {
  const [selectedPage, setSelectedPage] = useState(1);
  const incrementPage = () => {
    setSelectedPage((s) => s + 1);
  };
  const decrementPage = () => {
    setSelectedPage((s) => s - 1);
  };

  return (
    <>
      {selectedPage === 1 && <EmployeePersonalForm incrementPage={incrementPage} />}
      {selectedPage === 2 && (
        <QualificationPage
          incrementPage={incrementPage}
          decrementPage={decrementPage}
        />
      )}
      {selectedPage === 3 && (
        <EmployeePersonalForm
          incrementPage={incrementPage}
          decrementPage={decrementPage}
        />
      )}
    </>
  );
}

export default EmployeeFormLayout;

import { useState } from "react";



const useDisclaimerDialogHook = ({ isOpen, handleToggle }) => {
  const [is_Checked,setIs_Checked]=useState(false)

  return {
    is_Checked,
    setIs_Checked
  };
};

export default useDisclaimerDialogHook;

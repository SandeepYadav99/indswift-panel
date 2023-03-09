import { useCallback, useEffect, useState } from "react";
import LogUtils from "../../../../libs/LogUtils";
import { serviceChangeEmployeePassword } from "../../../../services/Employee.service";
import SnackbarUtils from "../../../../libs/SnackbarUtils";
import { useSelector } from "react-redux";

const initialForm = {
  password: "",
  share_password: false,
};

const useDisclaimerDialogHook = ({ isOpen, handleToggle }) => {
  const [form, setForm] = useState(
    JSON.parse(JSON.stringify({ ...initialForm }))
  );

  return {
    form,
  };
};

export default useDisclaimerDialogHook;

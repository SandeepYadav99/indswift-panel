
import { useCallback,  useState } from "react";



const useEmpInformation = () => {
 
  const [isOpenDialog, setIsOpenDialog] = useState(false);
const [isOpenRejectionDialog, setIsOpenRejectionDialog]=useState(false);

  const toggleIsOpenDialog = useCallback(
    (data) => {
    
    //   setEmpDetail(data)
      setIsOpenDialog((e) => !e);
    },
    [isOpenDialog]
  );

  const toggleIsOpenRejectionDialog = useCallback(
    (data) => {
    
    //   setEmpDetail(data)
    setIsOpenRejectionDialog((e) => !e);
    },
    [isOpenDialog]
  );

  return {
   
    toggleIsOpenDialog,
    isOpenDialog,
    toggleIsOpenRejectionDialog,
    isOpenRejectionDialog
    
  };
};

export default useEmpInformation;

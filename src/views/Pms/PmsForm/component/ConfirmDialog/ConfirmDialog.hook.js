import { useState } from "react";

const useConfirmDialogHook = ({ isOpen, handleToggle, candidateId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [declaration, setDeclaration] = useState(false);

  return {
    declaration,
  };
};

export default useConfirmDialogHook;

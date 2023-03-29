import React, { useState } from "react";
import { useCallback } from "react";
import AcceptanceDialog from "./components/AcceptanceDialog/AcceptanceDialog";
import OfferViewer from "./components/OfferView/OfferView";

function OfferConfirmation() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDialog = useCallback(() => {
    setIsOpen((e) => !e);
  }, [isOpen, setIsOpen]);
  return (
    <div>
      <OfferViewer toggleDialog={toggleDialog}></OfferViewer>
      <AcceptanceDialog handleDialog={toggleDialog} isOpen={isOpen} />
    </div>
  );
}

export default OfferConfirmation;

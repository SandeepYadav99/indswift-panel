import React, { useState } from 'react'
import { useCallback } from 'react'
import AcceptanceDialog from './components/AcceptanceDialog/AcceptanceDialog'
import CandidateOfferLogin from './components/OfferLogin/CandidateOfferLogin'
import SubmittedResponse from './components/SubmittedResponse/SubmittedResponse'

function OfferConfirmation() {
  const [isOpen,setIsOpen]=useState(true)
  const toggleDialog =useCallback(()=>{
    setIsOpen((e)=>!e)
  },[isOpen,setIsOpen])
  return (
    <div>
        <CandidateOfferLogin/>
        {/* <SubmittedResponse/> */}
        {/* <AcceptanceDialog handleDialog={toggleDialog} isOpen={isOpen}/> */}
    </div>
  )
}

export default OfferConfirmation
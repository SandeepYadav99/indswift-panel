import useEAFSession from "../../../../EmployeeApplicationForm/EAFSessionHook";
import {useEffect, useState} from "react";

const useOffer = () => {
    const { candidateId } = useEAFSession();
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {

    })

    return {

    }
}

export default useOffer;

import {useMemo} from "react";
import {useSelector} from "react-redux";
import Constants from "../config/constants";
import RolesUtils from "../libs/Roles.utils";


const useAuthenticate = () => {
    const {role} = useSelector(state => state.auth);

    const isCorporateHR = useMemo(() => {
        return RolesUtils.canAccess([Constants.ROLES.CORPORATE_HR], role);
      }, [role]);

    return {
        isCorporateHR
    }
};

export default useAuthenticate;

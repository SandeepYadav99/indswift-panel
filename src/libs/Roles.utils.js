import store from "../store";
import Constants from "../config/constants";
import LogUtils from "./LogUtils";

class RolesUtils {
    canAccess = (accessRequiredPr, myRolePr = null) => {
        if (!accessRequiredPr) {
            return true;
        }
        let myRole = null;
        const accessRequired = accessRequiredPr ? accessRequiredPr : [Constants.ROLES.GENERAL];
        if (!myRolePr) {
            myRole = store?.getState()?.auth?.role ? store?.getState()?.auth?.role : [Constants.ROLES.GENERAL];
        } else {
            myRole = myRolePr;
        }
        if (typeof myRolePr === "string") {
            myRole = [myRolePr, Constants.ROLES.GENERAL];
        } else if (Array.isArray(myRolePr)) {
            myRole = [...myRolePr, Constants.ROLES.GENERAL]
        }

        LogUtils.log('canAccess', accessRequiredPr, myRolePr);
        const isThere = accessRequired.findIndex(role => myRole.indexOf(role)>= 0);
        return isThere >= 0;
    }
};

export default new RolesUtils();

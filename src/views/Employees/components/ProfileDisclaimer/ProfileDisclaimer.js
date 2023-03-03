
import React from "react";
import styles from "./Style.module.css";

function ProfileDisclaimer() {
    return (
        <div className={styles.GeneralInfoWrapeer}>
            <div>
                <span className={styles.title}>General Information</span>
                <div className={styles.newLine} />
            </div>
            <div className={styles.infoContainer}>
                <p className={styles.infoDetails}>
                    It is very important to note that Personal Information of employee and their family members is a complete responsibility of employee. Employee holds complete right to amend the same as per situation with employee. Group entitlements of employees and his/her family (for example- Group Medi claim, Group term insurance or other related coverages) depend on fact that employee has accurately maintained/updated his/her personal data on SkyNet. Organization do not scrutinize or interfere with personal information of employees. Organization is free of any responsibility or liability, if any insurance claim of any employee gets rejected due to inaccurate/old/obsolete personal data maintained by employee on SkyNet.
                </p>
            </div>
        </div>
    );
}

export default ProfileDisclaimer;

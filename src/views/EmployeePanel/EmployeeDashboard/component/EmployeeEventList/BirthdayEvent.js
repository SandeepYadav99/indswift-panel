import React, {useMemo} from "react";
import styles from "./Style.module.css";

function BirthdayEvent({data}) {
  const list = useMemo(() => {
   return data.map(emp => {
     return (
         <div className={styles.birthdayEventWrapper}>
           <div className={styles.imageNameContainer}>
             <div>
               <img src={emp.image} className={styles.userImage}/>
             </div>
             <div className={styles.profileContainer}>
               <span className={styles.profileName}>{emp?.gender === 'MALE' ? 'MR.' : 'MRS.'} {emp?.name}</span>
               <span className={styles.profilePosition}>{emp?.designation}</span>
               <span className={styles.profileAddress}>
               {`${emp?.department} - ${emp?.location}`}
            </span>
             </div>
           </div>
           <div>
             <div>
               <img src={require("../../../../../assets/img/birthday.png")} />
             </div>
           </div>
         </div>
     );
   })
  }, [data]);

  return (
    <div className={styles.paperBackground}>
      {list}
    </div>
  );
}

export default BirthdayEvent;

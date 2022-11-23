import React, {useMemo} from 'react';
import styles from './Style.module.css';
import {getObjData} from "../../../../libs/general.utils";

const ServiceInterest = ({data}) => {

    const _renderServices = (services) => {
        return services.map((val, key) => {
            return (
                <div key={key} className={styles.services}>
                    <div>{val}</div>
                </div>
            )
        })
    }

    return (
        <div>
            <div className={styles.plain}>
                <div className={styles.request}>Services Interest</div>

                <div className={styles.additionalFlex}>
                    <div>
                        <div className={styles.heading}>Service Countries</div>
                        <div style={{textTransform:'capitalize'}}>{ data?.service_countries && data.service_countries.length > 0 ? data.service_countries_text.map(country => country).join(", ") : 'N/A'}</div>
                    </div>
                </div>

                <div className={styles.additionalFlex}>
                    <div>
                        <div className={styles.heading}>Services Required</div>
                        <div>{ data?.services_interested && data.services_interested.length > 0 ?_renderServices(data.services_interested_text) : 'N/A'}</div>
                    </div>
                </div>

                <div className={styles.additionalFlex}>
                    <div>
                        <div className={styles.heading}>Estimated Inventory</div>
                        <div className={styles.desc}>{getObjData(data?.estimated_inventory)} Units</div>
                    </div>
                </div>

                <div className={styles.additionalFlex}>
                    <div>
                        <div className={styles.heading}>Estimated Monthly Orders</div>
                        <div className={styles.desc}>{getObjData(data?.avg_monthly_order)} Orders</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ServiceInterest;

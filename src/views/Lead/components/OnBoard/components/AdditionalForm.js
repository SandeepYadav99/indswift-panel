import React from 'react';
import styles from "./Style.module.css";
import {Field} from "redux-form";
import {
    renderOutlinedTextField,
    renderCheckbox
} from "../../../../../libs/redux-material.utils";



class AdditionalForm extends React.Component {
    render() {
        const {negativeNormalize,hsnNormalize,data} = this.props;
        return (
            <div className={styles.plainPaper}>
                <h5 style={{marginTop: '0px'}}>Additional Notes</h5>

                <div className={'formFlex'}>
                    <div className={'formGroup'}>
                        <Field
                            fullWidth={true}
                            multiline
                            rows={3}
                            name="notes"
                            component={renderOutlinedTextField}
                            margin={'dense'}
                            label="Additional Notes"/>
                    </div>
                </div>

                <div className={'smallCheckbox'}>
                    <div className={'formFlex'}>
                        <div className={'formGroup'}>
                            <Field
                                name="share_notes"
                                component={renderCheckbox}
                                label={"Show to customer while on-boarding"}
                            />
                        </div>
                    </div>
                </div>

            </div>
        )
    }
};

export default AdditionalForm;

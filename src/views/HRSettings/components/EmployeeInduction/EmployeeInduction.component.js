import React from 'react';
import useEmployeeInduction from "./EmployeeInduction.hook";
import styles from "./Style.module.css";
import File from "../../../../components/FileComponent/FileComponent.component";
import {ButtonBase, makeStyles} from "@material-ui/core";
import MuiStyle from "../../../../libs/MuiStyle";
import LogUtils from "../../../../libs/LogUtils";

const useStyle = makeStyles(MuiStyle);

const EmployeeInductionComponent = ({}) => {
    const { error, handleSubmit, handleChange, document, getImageUrl, isSubmitting } = useEmployeeInduction({});
    const classes = useStyle();
    return (
        <div>
            <div className={styles.outerFlex}>
                <div>
                    <div className={"headerFlex"}>
                        <h4 className={"infoTitle"}>
                            <div className={"heading"}>Employee Induction Booklet</div>
                        </h4>
                    </div>
                </div>
            </div>
            <div className={styles.width}>
            <File
                max_size={5 * 1024 * 1024}
                type={['png', 'jpeg', 'jpg']}
                fullWidth={true}
                name="document"
                accept={'image/*'}
                label=""
                default_image={document ? document : null}
                // user_image={form?.image}
                error={error}
                // title={'image'}
                value={document}
                // handleChange={this._handleFileChange}
                placeholder={'Induction Booklet Document'}
                onChange={(file) => {
                    if (file) {
                        handleChange(file);
                    }
                }}
            />
                <div className={'flex'}>
                    <img className={styles.imgSelected} src={getImageUrl()} />
                    <ButtonBase onClick={handleSubmit} disabled={!document || isSubmitting} className={classes.btnBorder}>
                        Upload New Image
                    </ButtonBase>
                </div>

            </div>
        </div>
    );
};

export default EmployeeInductionComponent;

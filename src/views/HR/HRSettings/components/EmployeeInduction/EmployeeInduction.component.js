import React from 'react';
import useEmployeeInduction from "./EmployeeInduction.hook";
import styles from "./Style.module.css";
import File from "../../../../../components/FileComponent/FileComponent.component";
import {ButtonBase, makeStyles} from "@material-ui/core";
import MuiStyle from "../../../../../libs/MuiStyle";
import csx from 'classnames';

const useStyle = makeStyles(MuiStyle);

const EmployeeInductionComponent = ({}) => {
    const { error, handleSubmit, handleChange, document, getImageUrl, isSubmitting, coverImage, handleCoverImageChange, EMPLOYEE_INDUCTION } = useEmployeeInduction({});
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
                type={['pdf']}
                fullWidth={true}
                name="document"
                accept={'application/pdf'}
                label=""
                default_image={document ? document : null}
                // user_image={form?.image}
                error={error}
                // title={'image'}
                value={document}
                // handleChange={this._handleFileChange}
                placeholder={'Induction Booklet Document'}
                link={EMPLOYEE_INDUCTION?.document}
                onChange={(file) => {
                    if (file) {
                        handleChange(file);
                    }
                }}
            />
                <div className={csx('flex', styles.btnContainer)}>
                    <File
                        max_size={5 * 1024 * 1024}
                        type={['png', 'jpeg', 'jpg']}
                        fullWidth={true}
                        name="document"
                        accept={'image/*'}
                        label=""
                        default_image={coverImage ? coverImage : EMPLOYEE_INDUCTION?.cover_image}
                        show_image={true}
                        error={error}
                        // title={'image'}
                        value={coverImage}
                        // handleChange={this._handleFileChange}
                        placeholder={'Induction Booklet Document'}
                        onChange={(file) => {
                            if (file) {
                                handleCoverImageChange(file);
                            }
                        }}
                    />
                    <ButtonBase onClick={handleSubmit} disabled={!(document || coverImage) || isSubmitting} className={csx(classes.btnBorder, styles.btn)}>
                        Upload Files
                    </ButtonBase>
                </div>

            </div>
        </div>
    );
};

export default EmployeeInductionComponent;

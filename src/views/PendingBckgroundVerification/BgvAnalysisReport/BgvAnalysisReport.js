import { ButtonBase, MenuItem } from "@material-ui/core";
import BGVAnalysisTable from "./component/BGVAnalysisTable";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import historyUtils from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import styles from "./Style.module.css";
import PageBox from "../../../components/PageBox/PageBox.component";
const BgvAnalysisReport = () => {
  return (
    <div>
      <PageBox>
     
          <div className={styles.headerContainer}>
            <div>
              <ButtonBase onClick={() => historyUtils.goBack()}>
                <ArrowBackIosIcon fontSize={"small"} />{" "}
                <span className={styles.title}>
                Background Verification Analysis
                </span>
              </ButtonBase>
              <div className={styles.newLine} />
            </div>
      
              <div className={styles.customSelectContainer}>
                <CustomSelectField
                  label={"Complete in "}
               
                  handleChange={(value) => {
                    // changeTextData(value, "payment_complete");
                  }}
                >
                  <MenuItem value="2023-09-08">2023-09-08</MenuItem>
                  {/* <MenuItem value="esix">ESIX </MenuItem> */}
                </CustomSelectField>
              </div>
         
          </div>
      
        <br />
        <br />
        <BGVAnalysisTable />
      </PageBox>
    </div>
  );
};

export default BgvAnalysisReport;

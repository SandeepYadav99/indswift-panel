import { ButtonBase, MenuItem } from "@material-ui/core";
import BGVAnalysisTable from "./component/BGVAnalysisTable";
import CustomSelectField from "../../../components/FormFields/SelectField/SelectField.component";
import historyUtils from "../../../libs/history.utils";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import styles from "./Style.module.css";
import PageBox from "../../../components/PageBox/PageBox.component";
import CustomDatePicker from "../../../components/FormFields/DatePicker/CustomDatePicker";
import { useState } from "react";
import { useEffect } from "react";
import { serviceEmloyeeBGVTable } from "../../../services/PendingBGVerification.service";

const BgvAnalysisReport = () => {
  const [form, setForm] = useState({ date: new Date() });
  const [tableDatas, setTableDatas] = useState([]);

  useEffect(() => {
    const year = form.date ? form.date.getFullYear() : null;
    serviceEmloyeeBGVTable({ startYear: year }).then((res) => {
      setTableDatas(res?.data);
    });
  }, [form]);

  const handleChange = (value, field) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

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
            <CustomDatePicker
              clearable
              label={"Select Financial Year"}
              maxDate={new Date()}
              // minDate={new Date(`${new Date().getFullYear()}-01-01`)}
              // maxDate={new Date(`${new Date().getFullYear() + 10}-01-01`)}
              onChange={(value) => {
                handleChange(value, "date");
              }}
              format={"yyyy"}
              value={form?.date}
              views={["year"]}
              // isError={errorData?.date}
              // errorText={errorData?.date}
            />
          </div>
        </div>

        <br />
        <br />
        <BGVAnalysisTable tableDatas={tableDatas} />
      </PageBox>
    </div>
  );
};

export default BgvAnalysisReport;

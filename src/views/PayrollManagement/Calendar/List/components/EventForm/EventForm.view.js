import React from "react";
import styles from "./Style.module.css";
import CustomTextField from "../../../../../../components/FormFields/TextField/TextField.component";
import useEventFormHook from "./EventForm.hook";
import CustomSelectField from "../../../../../../components/FormFields/SelectField/SelectField.component";

import CustomDatePicker from "../../../../../../components/FormFields/DatePicker/CustomDatePicker";
import {
  Button,
  ButtonBase,
  CircularProgress,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import { removeUnderScore } from "../../../../../../helper/helper";
import { Autocomplete } from "@material-ui/lab";

const locationList = ["ALL_LOCATIONS", "SHOWROOM", "FACTORY", "WAREHOUSE"];
const EventForm = ({ isOpen, handleToggle, editData, renderList }) => {
  const {
    changeTextData,
    errorData,
    form,
    handleSubmit,
    onBlurHandler,
    isSubmitted,
    isSubmitting,
    listData,
    handleDelete,
  } = useEventFormHook({ isOpen, handleToggle, editData, renderList });

  return (
    <div>
      <div className={styles.resetPasswordWrapper}>
        <div className={styles.fieldWrapper}>
          <CustomTextField
            isError={errorData?.name}
            errorText={errorData?.name}
            label={"Holiday Name*"}
            value={form?.name}
            onTextChange={(text) => {
              changeTextData(text, "name");
            }}
            onBlur={() => {
              onBlurHandler("name");
            }}
          />
          <CustomSelectField
            isError={errorData?.holiday_type}
            errorText={errorData?.holiday_type}
            label={"Choose Holiday Type*"}
            value={form?.holiday_type}
            disabled={editData?.id}
            handleChange={(value) => {
              changeTextData(value, "holiday_type");
            }}
          >
            <MenuItem value="GAZETTED">GAZETTED</MenuItem>
            <MenuItem value="OPTIONAL">OPTIONAL</MenuItem>
            <MenuItem value="RESTRICTED">RESTRICTED</MenuItem>
          </CustomSelectField>
          <div className={styles.radioWrapper}>
            <RadioGroup
              aria-label="option"
              name="type"
              value={form?.type}
              onChange={(e) => changeTextData(e.target.value, "type")}
              row
              className={styles.radioWrap}
            >
              <FormControlLabel
                disabled={editData?.id}
                value="FULL_DAY"
                control={<Radio />}
                label="Full Day"
              />
              <FormControlLabel
                disabled={editData?.id}
                value="HALF_DAY"
                control={<Radio />}
                label="Half Day"
              />
            </RadioGroup>
            {form?.type === "HALF_DAY" && (
              <div className={styles.halfDayType}>
                <div className={styles.halfDayTitle}>
                  Holiday for which half of the day?
                </div>
                <div>
                  <RadioGroup
                    aria-label="option"
                    name="half_day_type"
                    value={form?.half_day_type}
                    onChange={(e) =>
                      changeTextData(e.target.value, "half_day_type")
                    }
                    row
                    className={styles.radioWrap}
                  >
                    <FormControlLabel
                      value="FIRST_HALF"
                      control={<Radio />}
                      label="First Half"
                    />
                    <FormControlLabel
                      value="SECOND_HALF"
                      control={<Radio />}
                      label="Second Half"
                    />
                  </RadioGroup>
                </div>
              </div>
            )}
          </div>
          <CustomDatePicker
            clearable
            label={form?.type === "FULL_DAY" ? "Start Date" : "Date"}
            // minDate={new Date()}
            onChange={(date) => {
              changeTextData(date, "start_date");
            }}
            disabled={editData?.id}
            value={form?.start_date}
            isError={errorData?.start_date}
          />
          <Autocomplete
            multiple
            id="tags-outlined"
            onChange={(e, value) => {
              changeTextData(value, "applies_locations");
            }}
            disabled={editData?.id}
            size="small"
            value={form?.applies_locations}
            // id="tags-standard"
            options={locationList}
            getOptionLabel={(option) => removeUnderScore(option)}
            defaultValue={form?.applies_locations}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Applies to"
                error={errorData?.applies_locations}
              />
            )}
          />
        </div>
        <div className={styles.printFlex}>
           {editData?.id ? (
            <ButtonBase
              className={styles.edit}
              onClick={() => handleDelete(editData?.id)}
            >
              DELETE
            </ButtonBase>
          ) : (
            <div></div>
          )} 
          <Button
            className={styles.createBtn}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress color="success" size="20px" />
            ) : editData?.id ? (
              "UPDATE"
            ) : (
              "ADD"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventForm;

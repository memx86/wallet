import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
// import s from "./DatePickerField.module.scss";

const DatePickerField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(value) => {
        setFieldValue(field.name, value);
      }}
      maxDate={new Date()}
      placeholderText="Select a date"
      dateFormat="dd.MM.yyyy"
    />
  );
};
export default DatePickerField;

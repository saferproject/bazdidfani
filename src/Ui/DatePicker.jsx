import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { Controller } from "react-hook-form";
import { faIR as datePickerFaIR } from "@mui/x-date-pickers/locales";
import { useStyles } from "../Helpers/SharedStyles";

export default function DatePickerComponent({
  control,
  name,
  label,
  className,
  size = "medium",
  error = false,
  errorMessage,
  width: width,
  ...other
}) {
  const classes = useStyles();

  return (
    <div dir="rtl" className={`h-full ${className || ""}`}>
      <LocalizationProvider
        dateFormats={{ monthShort: "MMMM" }}
        dateAdapter={AdapterDateFnsJalali}
        localeText={
          datePickerFaIR.components.MuiLocalizationProvider.defaultProps
            .localeText
        }
      >
        <Controller
          name={name}
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <DatePicker
              {...field}
              {...other}
              slotProps={{
                textField: {
                  size: size,
                  InputProps: {
                    style: { backgroundColor: "white", borderRadius: "10px", width: width }
                  }
                },
                field: { clearable: true },
              }}
              timezone="Asia/Tehran"
              defaultValue={null}
              label={label}
              sx={{
                "& .muirtl-lqwr9g-MuiPickersOutlinedInput-notchedOutline": {
                  borderRadius: size === "small" ? "10px" : "17px",
                  borderColor: error ? "#C80930" : "oklch(92% 0.004 286.32)",
                  fontSize: "14px",
                  height: size === "small" ? "45px" : "100%",
                },
                "& .MuiInputLabel-root": {
                  fontSize: "13px", // سایز label شناور
                },

              }}
              // className={` w-full`}
              className={` ${!error
                ? classes.focusedTextFieldWithoutError
                : classes.errorField
                } w-full`}
            />
          )}
        />
      </LocalizationProvider>
      {errorMessage && (
        <p className="text-[#d32f2f] text-[0.75rem] mx-[14px] mt-[4px]">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

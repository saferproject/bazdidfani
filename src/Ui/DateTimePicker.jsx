import * as React from "react";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import {
  LocalizationProvider,
  MobileDateTimePicker,
} from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import useTheme from "@mui/system/useTheme";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { useStyles } from "../../../styles/SharedStyles";
import { Controller } from "react-hook-form";
import { FormHelperText } from "@mui/material";
import { faIR as datePickerFaIR } from "@mui/x-date-pickers/locales";

export default function DateTimePickerComponent({
  error = false,
  control,
  name,
  label,
  className,
  height,
  disabled,
  helperText,
  ...other
}) {
  // const classes = useStyles();
  const existingTheme = useTheme();
  const theme = React.useMemo(
    () =>
      createTheme({ direction: "rtl", borderRadius: "20px" }, existingTheme),
    [existingTheme]
  );

  return (
    <ThemeProvider theme={theme}>
      <div dir="rtl" className={`${className || ""}`}>
        <LocalizationProvider
          dateAdapter={AdapterDateFnsJalali}
          localeText={
            datePickerFaIR.components.MuiLocalizationProvider.defaultProps
              .localeText
          }
        >
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <>
                <DateTimePicker
                  {...field}
                  {...other}
                  defaultValue={null}
                  format="HH:mm yyyy/MM/dd"
                  disabled={disabled}
                  label={label}
                  sx={{
                    "& .muirtl-lqwr9g-MuiPickersOutlinedInput-notchedOutline": {
                      borderRadius: "17px",
                      borderColor: error ? "#C80930" : "oklch(92% 0.004 286.32)",
                      fontSize: "14px",
                      height: height ? height : "62px",
                    },
                  }}
                  slotProps={{
                    field: { clearable: true },
                    textField: { fullWidth: true },
                  }}
                  className={` !w-full !h-full hidden sm:block !gap-0`}
                // className={` ${classes.datePicker} ${
                //   !error
                //     ? classes.focusedTextFieldWithoutError
                //     : classes.errorField
                // } !w-full !h-full hidden sm:block !gap-0`}
                />
                {/* <MobileDateTimePicker
                  {...field}
                  {...other}
                  defaultValue={null}
                  format="HH:mm yyyy/MM/dd"
                  disabled={disabled}
                  label={label}
                  sx={{ height: "100%" }}
                  slotProps={{
                    field: { clearable: true },
                    textField: { fullWidth: true },
                  }}
                  timezone="Asia/Tehran"
                  className={`!w-full !h-full block sm:hidden !gap-0`}
                // className={` ${classes.datePicker} ${!error
                //     ? classes.focusedTextFieldWithoutError
                //     : classes.errorField
                //   } !w-full !h-full block sm:hidden !gap-0`}
                /> */}
                {!!error && (
                  <FormHelperText error={error}>{helperText}</FormHelperText>
                )}
              </>
            )}
          />
        </LocalizationProvider>
      </div>
    </ThemeProvider>
  );
}

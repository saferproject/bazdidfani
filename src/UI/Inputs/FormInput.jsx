import { InputAdornment, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { FaRegUserCircle } from "react-icons/fa";

const FormInput = ({
    icon = "",
    name = "",
    control = "",
    error,
    label,
    className,
    isLeftToRight = false,
    startIcon,
    endIcon,
    type = "text",
    additionalText,
    bgColor = "",
    size = "medium",
    multiLine = false,
    rows = 4,
    defaultValue = "",
    disabled = false,
    readOnly = false,
    classes = {},
    autoComplete = "on",
    autoFocus = false,
    ...other
}) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => (
                <div className={`w-full bg-main rounded-[18px] flex justify-between ${className}`}>
                    <div className="w-12 flex items-center justify-center flex-shrink-0">
                        {icon ? icon : <FaRegUserCircle className="text-[1.5rem]" />}
                    </div>
                    <TextField
                        size={size}
                        {...field}
                        variant="outlined"
                        type={type}
                        className="!flex-1"
                        sx={{
                            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#F7DAB0 !important",
                                borderWidth: "1px !important",
                            },
                            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#F7DAB0 !important",
                            },
                            // "& .MuiInputLabel-root": {
                            //     right: "10px",
                            // },
                            "& .MuiInputBase-root": {
                                backgroundColor: "white",
                                borderRadius: "18px",
                            },

                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#CAD5E3",
                                borderWidth: "1px",
                            },
                            "& .MuiInputBase-input": {
                                fontFamily: "Yekan-bold",
                                "&::placeholder": {
                                    fontSize: "1rem",
                                    marginLeft: "10px",
                                    fontFamily: "yekan-light",
                                    color: "#7A87B2"
                                },
                                fontSize: "0.95rem"
                            },

                            "& .MuiFormHelperText-root": {
                                fontFamily: "Yekan-bold",
                                marginTop: "0.375rem",
                                marginRight: "0rem",
                                fontSize: "0.75rem",
                                color: "#ED1844",
                            },
                            "& .MuiInputAdornment-root": {
                                fontSize: "1.563rem",
                                color: "#777",
                                whiteSpace: "nowrap",
                            },
                        }}
                        autoFocus={autoFocus}
                        multiline={multiLine}
                        rows={rows}
                        disabled={disabled}
                        InputProps={{
                            startAdornment: startIcon ? (
                                <InputAdornment position="start">{startIcon}</InputAdornment>
                            ) : (
                                ""
                            ),
                            endAdornment: endIcon ? (
                                <InputAdornment position="end">{endIcon}</InputAdornment>
                            ) : (
                                ""
                            ),
                            className: bgColor ? bgColor : "",
                            classes: classes,
                        }}
                        label={label}
                        error={!!error}
                        helperText={(!!error && error?.message) || additionalText}
                        {...other}
                        FormHelperTextProps={
                            additionalText ? { sx: { color: "primary.main" } } : {}
                        }
                        inputProps={{
                            readOnly: readOnly,
                            autoComplete: autoComplete,
                        }}
                    />
                </div>
            )}
        />
    );
};

export default FormInput;

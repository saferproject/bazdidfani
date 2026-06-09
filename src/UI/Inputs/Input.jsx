import { InputAdornment, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const Input = ({
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
    maxLength,
    placeholder,
    showCharacterCount = false, // 👈 قابلیت جدید
    ...other
}) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => {
                const currentLength = field.value?.length || 0;

                return (
                    <TextField
                        size={size}
                        {...field}
                        placeholder={placeholder}
                        variant="outlined"
                        type={type}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: size === "small" ? "10px" : "17px",
                                fontSize: "0.9rem",
                                backgroundColor: bgColor ? bgColor : "",
                                fontFamily: "yekan",
                                "& fieldset": {
                                    borderColor: "oklch(92% 0.004 286.32)",
                                },
                                "&:hover fieldset": {
                                    borderColor: "#7A87B2",
                                },
                            },
                            "& .MuiInputLabel-root": {
                                fontFamily: "yekan",
                                fontSize: size === "small" ? "0.8rem" : "0.95rem",
                            },
                            "& .MuiInputBase-root": {
                                height: "auto",
                                maxHeight: "none",
                            },
                            "& .MuiInputBase-input": {
                                direction: isLeftToRight ? "rtl" : "ltr",
                                fontFamily: "yekan",
                            },
                        }}
                        autoFocus={autoFocus}
                        multiline={multiLine}
                        rows={rows}
                        disabled={disabled}
                        InputProps={{
                            startAdornment: startIcon ? (
                                <InputAdornment position="start">
                                    {startIcon}
                                </InputAdornment>
                            ) : (
                                ""
                            ),
                            endAdornment: endIcon ? (
                                <InputAdornment position="end">
                                    {endIcon}
                                </InputAdornment>
                            ) : (
                                ""
                            ),
                            className: bgColor ? bgColor : "",
                            classes: classes,
                        }}
                        className={`${className}`}
                        label={label}
                        error={!!error}
                        helperText={
                            !!error
                                ? error?.message
                                : showCharacterCount
                                    ? `${maxLength ? `  ${maxLength} / ` : ""}${currentLength}`
                                    : additionalText
                        }
                        {...other}
                        FormHelperTextProps={{
                            sx: {
                                fontSize:"12px",
                                direction: showCharacterCount ? "rtl" : "ltr",
                                marginLeft: showCharacterCount ? "100px" : "10px",
                                paddingRight: "5px",
                                display: "flex",
                                justifyContent: "flex-start",
                                color: additionalText ? "primary.main" : undefined,
                            },
                        }}
                        inputProps={{
                            readOnly: readOnly,
                            autoComplete: autoComplete,
                            maxLength: maxLength,
                        }}
                    />
                );
            }}
        />
    );
};

export default Input;
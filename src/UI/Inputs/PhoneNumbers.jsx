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
    autoAddComma = true,
    ...other
}) => {

    const handleKeyDown = (e, field) => {
        if (autoAddComma && e.key === 'Enter') {
            e.preventDefault(); // جلوگیری از رفتن به خط بعدی

            const currentValue = field.value || '';
            const lastChar = currentValue.slice(-1);

            // اگر آخرین کاراکتر کاما نبود، کاما اضافه کن
            if (lastChar !== ',' && currentValue.length > 0) {
                const newValue = currentValue + ',';
                field.onChange(newValue);
            }

            // اضافه کردن خط جدید بعد از کاما
            setTimeout(() => {
                const input = e.target;
                const cursorPosition = input.value.length;
                input.setSelectionRange(cursorPosition, cursorPosition);
            }, 0);
        }
    };

    const handleBlur = (e, field) => {
        // حذف کاما اضافی از انتهای متن (اختیاری)
        let value = field.value || '';
        if (value.endsWith(',')) {
            value = value.slice(0, -1);
            field.onChange(value);
        }
    };

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) => (
                <TextField
                    size={size}
                    {...field}
                    placeholder={placeholder}
                    variant="outlined"
                    type={type}
                    onKeyDown={(e) => handleKeyDown(e, field)}
                    onBlur={(e) => handleBlur(e, field)}
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
                            fontSize: size === "small" ? "0.8rem" : "0.95rem"
                        },
                        "& .MuiInputBase-root": { height: "auto", maxHeight: "none" },
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
                    className={`${className}`}
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
                        maxLength: maxLength,
                    }}
                />
            )}
        />
    );
};

export default Input;

import { InputAdornment, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { useState } from "react";
import { PiEyeClosedDuotone } from "react-icons/pi";
import { PiEyeDuotone } from "react-icons/pi";

const InputTest = ({
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
    size = "small",
    multiLine = false,
    rows = 4,
    defaultValue = "",
    disabled = false,
    readOnly = false,
    classes = {},
    autoComplete = "on",
    autoFocus = false,
    radios,
    ...other
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
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
                    variant="outlined"
                    type={type === "password" && showPassword ? "text" : type}
                    sx={{
                        "& .MuiInputBase-root": {
                            height: "100%",
                            backgroundColor: bgColor,
                            borderRadius: radios ? radios : "10px",

                        },
                        "& .MuiInputLabel-root": {
                            color: "#B1C7C7",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#B1C7C7",
                            borderWidth: "1px",
                        },

                        "& .MuiInputBase-input": {
                            direction: isLeftToRight ? "rtl" : "ltr",
                        },
                        "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#ED1844",
                            borderWidth: "1px",
                        },
                        "& .MuiFormHelperText-root": {
                            fontFamily: "Yekan-bold",
                            marginTop: "6px",
                            marginRight: "0px",
                            fontSize: "12px",
                            color: "#ED1844",
                        },
                        "& .MuiInputAdornment-root": {
                            fontSize: "25px",
                            color: "#B1C7C7",
                        }
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
                        endAdornment: (
                            <>
                                {type === "password" ? (
                                    <InputAdornment position="end">
                                        <button
                                            type="button"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            style={{ background: "none", border: "none", cursor: "pointer" }}
                                        >
                                            {showPassword ? <PiEyeClosedDuotone /> : <PiEyeDuotone />}
                                        </button>
                                    </InputAdornment>
                                ) : (
                                    endIcon && <InputAdornment position="end">{endIcon}</InputAdornment>
                                )}
                            </>
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
                    }}
                />
            )}
        />
    );
};

export default InputTest;

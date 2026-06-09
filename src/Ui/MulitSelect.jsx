import React from "react";
import {
    Autocomplete,
    Checkbox,
    TextField,
    Divider,
    InputAdornment,
    CircularProgress,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Controller } from "react-hook-form";
import { matchSorter } from 'match-sorter';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const MulitSelect = ({
    limitTags,
    isLoading = false,
    name,
    options = [],
    label,
    error,
    className,
    onChange,
    onInputChange,
    setOnOpen,
    control,
    showField,
    valueName = "id",
    size = "medium",
    startIcon,
    endIcon,
    disabled = false,
    ListboxProps,
    // filterOptions,
    ...others
}) => {
    // console.log("options", options);
    // ✅ نرمال‌سازی داده‌ها بر اساس props دریافتی
    const normalizedOptions = options.map(opt => ({
        ...opt,
        value: opt[valueName], // به صورت داینامیک از valueName استفاده می‌کنیم
    }));

    const allOption = { value: "all", [showField]: "همه" };
    const enhancedOptions = [allOption, ...normalizedOptions];
    const filterOptions = (options, { inputValue }) => {
        const trimmedInput = inputValue?.toString().trim() || '';

        if (!trimmedInput) return options;

        const allOption = options.find(opt => opt.value === "all");
        const otherOptions = options.filter(opt => opt.value !== "all");

        const filtered = matchSorter(otherOptions, trimmedInput, {
            keys: [showField],
        });

        return allOption ? [allOption, ...filtered] : filtered;
    };

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={[]}
            render={({ field }) => {
                const selectedValues = field.value || [];
                const allSelected =
                    selectedValues.length === normalizedOptions.length &&
                    normalizedOptions.length > 0;

                return (
                    <Autocomplete
                        multiple
                        limitTags={limitTags}
                        loading={isLoading}
                        onOpen={() => setOnOpen?.(true)}
                        onClose={() => setOnOpen?.(false)}
                        onInputChange={(event, newInputValue) => {
                            onInputChange && onInputChange(event, newInputValue);
                        }}
                        className={className || ""}
                        clearText="پاک کردن"
                        disabled={disabled}
                        value={selectedValues}
                        size={size}
                        id="checkboxes-tags-demo"
                        options={enhancedOptions}
                        {...others}
                        disableCloseOnSelect
                        ListboxProps={ListboxProps}
                        onChange={(_, value) => {
                            let newValue = value;

                            if (value.some((opt) => opt.value === "all")) {
                                newValue = allSelected ? [] : normalizedOptions;
                            } else {
                                newValue = value.filter((opt) => opt.value !== "all");
                            }

                            if (onChange) onChange(newValue);
                            else field.onChange(newValue);
                        }}
                        isOptionEqualToValue={(option, value) =>
                            option.value === value.value
                        }
                        filterOptions={filterOptions}
                        getOptionLabel={(option) =>
                            option[showField]?.toString() || option?.toString() || ""
                        }
                        renderOption={(props, option, { selected }) => {
                            const { key, ...optionProps } = props;
                            const isAll = option.value === "all";

                            return (
                                <React.Fragment key={key}>
                                    <li {...optionProps}>
                                        <Checkbox
                                            icon={icon}
                                            checkedIcon={checkedIcon}
                                            style={{ marginRight: 8 }}
                                            checked={isAll ? allSelected : selected}
                                        />
                                        {option[showField]}
                                    </li>
                                    {isAll && <Divider sx={{ my: 0.5 }} />}
                                </React.Fragment>
                            );
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={label}
                                error={!!error}
                                helperText={error ? error.message : ""}
                                variant="outlined"
                                size={size}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius:
                                            size === "small" ? "10px" : "17px",
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
                                        fontSize:
                                            size === "small" ? "0.8rem" : "0.95rem",
                                    },
                                    "& .MuiInputBase-root": {
                                        height: "auto",
                                        maxHeight: "none",
                                    },
                                    "& .MuiInputBase-input": {
                                        fontFamily: "yekan",
                                    },
                                }}
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                      <>
                                        {isLoading && <CircularProgress color="primary" size={20} />}
                                        {endIcon && <InputAdornment position="end">{endIcon}</InputAdornment>}
                                        {params.InputProps.endAdornment}
                                      </>
                                    ),
                                  }}
                            />
                        )}
                    />
                );
            }}
        />
    );
};

export default MulitSelect;






// NOTE کد زیر بدون دکمه "همه" است

// import React from "react";
// import {
//     Autocomplete,
//     Checkbox,
//     CircularProgress,
//     InputAdornment,
//     TextField,
// } from "@mui/material";
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';
// import { Controller } from "react-hook-form";
// const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
// const checkedIcon = <CheckBoxIcon fontSize="small" />;
// const MulitSelect = ({
//     isLoading = false,
//     name,
//     options,
//     label,
//     error,
//     className,
//     onChange,
//     onInputChange,
//     setOnOpen,
//     control,
//     showField,
//     size = "medium",
//     startIcon,
//     endIcon,
//     disabled = false,
//     ...others
// }) => {
//     return (
//         <Controller
//             name={name}
//             control={control}
//             defaultValue={null}
//             render={({ field }) => (
//                 <Autocomplete
//                     multiple
//                     loading={isLoading}
//                     onOpen={() => setOnOpen && setOnOpen(true)}
//                     onClose={() => setOnOpen && setOnOpen(false)}
//                     onInputChange={onInputChange}
//                     className={${className || ""}}
//                     clearText="پاک کردن"
//                     disabled={disabled}
//                     // defaultValue={field?.value || null}
//                     // defaultChecked={field?.value || null}
//                     value={field?.value || []}
//                     size={size}
//                     id="checkboxes-tags-demo"
//                     options={options}
//                     {...others}
//                     disableCloseOnSelect
//                     onChange={(_, value) =>
//                         onChange ? onChange(value) : field.onChange(value)
//                     }
//                     isOptionEqualToValue={(option, value) => option.value === value.value}
//                     getOptionLabel={(option) =>
//                         options
//                             ? option[showField]?.toString() || option?.toString() || ""
//                             : ""
//                     }
//                     renderOption={(props, option, { selected }) => {
//                         const { key, ...optionProps } = props;
//                         return (
//                             <li key={key} {...optionProps}>
//                                 <Checkbox
//                                     icon={icon}
//                                     checkedIcon={checkedIcon}
//                                     style={{ marginRight: 8 }}
//                                     checked={selected}
//                                 />
//                                 {option[showField]?.toString()}
//                             </li>
//                         );
//                     }}
//                     style={{ width: "auto" }}
//                     renderInput={(params) => (
//                         <TextField
//                             {...params}
//                             label={label}
//                             error={!!error}
//                             helperText={error ? error.message : ""}
//                             variant="outlined"
//                             size={size}
//                             sx={{
//                                 "& .MuiOutlinedInput-root": {
//                                     borderRadius: size === "small" ? "10px" : "17px",
//                                     fontFamily: "yekan",
//                                     "& fieldset": {
//                                         borderColor: "oklch(92% 0.004 286.32)",
//                                     },
//                                     "&:hover fieldset": {
//                                         borderColor: "#7A87B2",
//                                     },
//                                 },
//                                 "& .MuiInputLabel-root": {
//                                     fontFamily: "yekan",
//                                     fontSize: size === "small" ? "0.8rem" : "0.95rem"
//                                 },
//                                 "& .MuiInputBase-root": { height: "auto", maxHeight: "none" },
//                                 "& .MuiInputBase-input": {
//                                     fontFamily: "yekan",
//                                 },
//                             }}
//                         />
//                     )}
//                 />
//             )}
//         />
//     );
// };
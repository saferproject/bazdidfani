import React from "react";
import {
  Autocomplete,
  CircularProgress,
  InputAdornment,
  TextField,
  Divider,
} from "@mui/material";
import { Controller } from "react-hook-form";

const AutocompleteField = ({
  isLoading = false,
  name,
  options,
  label,
  error,
  className,
  onChange,
  onInputChange,
  setOnOpen,
  control,
  showField,
  size = "medium",
  startIcon,
  valueField = "id",
  endIcon,
  disabled = false,
  value,
  bgColor : bgColor,
  ...others
}) => {

  // <AutocompleteField
  //   options={types}
  //   className="w-full"
  //   showField="name"
  //   name="type"
  //   label="نوع"
  //   control={control}
  //   error={errors?.type}
  //   value={types.find((item) => item.value === watch("type")) || null}
  //   onChange={(option) => { setValue("type", option ? option.value.toString() : null), trigger(["type"]) }} />

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field }) => (
        <Autocomplete
          loading={isLoading}
          onOpen={() => setOnOpen && setOnOpen(true)}
          onClose={() => setOnOpen && setOnOpen(false)}
          onInputChange={onInputChange}
          clearText="پاک کردن"
          disabled={disabled}
          value={
            valueField && field.value
              ? options?.find(opt => opt[valueField] === field.value) || null
              : field.value || null
          }
          // value={value !== undefined ? value : (field.value || null)}
          options={options?.length ? options : []}
          onChange={(_, option) => {
            const newValue = valueField && option ? option[valueField] : option;
            onChange ? onChange(newValue) : field.onChange(newValue);
          }}
          // onChange={(_, value) =>
          //   onChange ? onChange(value) : field.onChange(value)
          // }
          isOptionEqualToValue={(option, value) => {
            return (
              option.id === value?.id || option.title === value?.title || false
            );
          }}
          filterOptions={(options, { inputValue }) => {
            return options.filter((option, index) => {
              const firstIndex = options.findIndex(
                (opt) => opt[showField] === option[showField]
              );
              return (
                index === firstIndex &&
                option[showField]
                  ?.toString()
                  ?.toLowerCase()
                  .includes(inputValue?.toString()?.toLowerCase())
              );
            });
          }}
          getOptionLabel={(option) =>
            options
              ? option[showField]?.toString() || option?.toString() || ""
              : ""
          }
          renderOption={(props, option, { index }) => (
            <li
              {...props}
              key={index}
              style={{
                position: "relative",
                backgroundColor: option[valueField] === field.value
                  ? ""
                  : "transparent"
              }}
            >
              <div className="w-full p-2">
                {option[showField]?.toString()}
              </div>
              {index !== options.length - 1 && (
                <Divider
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 20,
                    right: 20,
                  }}
                />
              )}
            </li>
          )}
          slotProps={{
            paper: {
              sx: {
                borderRadius: "17px",
                overflow: "hidden",
              },
            },
            popper: {
              sx: {
                zIndex: 1300,
              },
            },
          }}

          className={`${className || ""}`}
          size={size}
          {...others}
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
                  borderRadius: size === "small" ? "10px" : "17px",
                  fontFamily: "yekan",
                  backgroundColor: bgColor,
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
                  fontFamily: "yekan",
                },
              }}
              InputProps={{
                ...params.InputProps,
                startAdornment: startIcon ? (
                  <InputAdornment position="start">{startIcon}</InputAdornment>
                ) : null,
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
      )}
    />
  );
};

export default AutocompleteField;

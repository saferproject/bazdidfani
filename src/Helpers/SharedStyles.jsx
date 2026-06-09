import { useTheme } from "@emotion/react";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    title: {
      textAlign: "center",
      fontSize: "17px !important",
      fontWeight: "bold !important",
      backgroundColor: theme?.palette?.primary.main,
      color: "#fff",
    },
    autocomplete: {
      "@media (min-width: 768px)": {
        "& .MuiAutocomplete-inputRoot": {
          borderRadius: "10px !important",
          height: "34px !important",
        },
      },
    },
    select: {
      height: "35px !important",
      borderRadius: "10px !important",
    },
    datePicker: {
      "& .MuiInputBase-input": {
        "@media (min-width: 768px)": {
          height: "6px", // Adjust the height as needed
        },
        "@media (max-width: 768px)": {
          height: "12px", // Adjust the height as needed
        },
      },
      "& .MuiInputLabel-root": {
        lineHeight: "0.3em",
        overflow: "visible !important",
        fontSize: "15px",
      },
      "& .MuiInputLabel-shrink": {
        lineHeight: "1.4em",
      },
      "& .MuiInputBase-root": {
        borderRadius: "10px",
        fontSize: "14px",
        height:"100%"
      },
      "& .MuiIconButton-root": {
        // Adjust the fontSize and padding to change the icon size
        fontSize: "14px", // Change this value to set the desired icon size
        padding: "5px", // Change this value to adjust icon padding
      },
    },

    focusedTextField: {
      "@media (min-width: 768px)": {
        "& .MuiInputBase-input": {
          height: "18px", // Adjust the height as needed
          borderRadius: "10px !important",
        },
      },
      "& .MuiInputLabel-root": {
        lineHeight: "1rem !important",
        overflow: "visible !important",
        fontSize: "15px",
      },
    },
    focusedTextFieldWithoutError: {
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme?.palette?.primary.main, // Change the border color when focused
      },
      "& .MuiInputLabel-root.Mui-focused": {
        color: theme?.palette?.primary.main, // Change the label color when focused
        // lineHeight: "1.4375em",
      },
    },
    searchBar: {
      "& .MuiInputBase-adornedStart::after": {
        borderBottom: `2px solid ${theme?.palette?.primary.main} !important`,
      },
    },
    greenColor: {
      color: `${theme?.palette?.primary.main} !important`,
    },
    errorInput: {
      background: "#f5ebed",
    },
    importantField: {
      background: "#f5e68c",
    },
    blueField: {
      background: "#c9e8f5",
    },
    differentField: {
      background: "#EAEFFF",
    },
    errorField: {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#d32f2f !important",
      },
      "& .MuiInputLabel-root": {
        color: "#d32f2f !important",
      },
    },
    boldTitle: {
      "& .MuiTypography-root": {
        fontWeight: "800 !important",
      },
    },
  };
});

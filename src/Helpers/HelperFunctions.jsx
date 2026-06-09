import moment from "jalali-moment";
import { format, parse } from "date-fns";
import { darken, lighten } from "@mui/material";

export const FormattedNumber = (value = "") => {
    return value || value === 0 || value === "0"
        ? parseFloat(value.toString()?.replace(/,/g, "")).toLocaleString()
        : "";
};
export const DeleteComma = (value = "", defaultValue = 0) => {
    return value || value === 0
        ? value.toString()?.replace(/,/g, "")
        : defaultValue;
};

export const FalsyValueToEmptyString = (value) =>
    value || value === 0 ? value : "";

export const FalsyValueToZero = (value) => (value || value === 0 ? value : 0);

export const FalsyValueToDash = (value) => (value || value === 0 ? value : "—");

export const ConvertToDateShamsi = (value) => {
    const dateIsValid = value ? moment(new Date(value))?.isValid() : false;
    return dateIsValid ? moment(new Date(value)).format("jYYYY/jMM/jDD") : "—";
};

export const ConvertToDateTimeShamsi = (
    value,
    defaultFormat = "HH:mm jYYYY/jMM/jDD",
    defaultValue = "—"
) => {
    const dateIsValid = value ? moment(new Date(value))?.isValid() : false;
    return dateIsValid
        ? moment(new Date(value)).format(defaultFormat)
        : defaultValue;
};

export const ConvertToDateGerogrian = (value, defaultValue = "—") => {
    const dateIsValid = value ? moment(new Date(value))?.isValid() : false;
    return dateIsValid
        ? moment(new Date(value)).format("YYYY-MM-DD")
        : defaultValue;
};

export const convertToTimestamp = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return Math.floor(date.getTime() / 1000);
};
export const convertTimestampToJalali = (timestamp) => {
    if (!timestamp) return "-";

    const normalizedTimestamp =
        String(timestamp).length === 10
            ? timestamp * 1000
            : timestamp;

    const date = new Date(normalizedTimestamp);

    const persianDate = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(date);

    const time = new Intl.DateTimeFormat("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).format(date);

    return `${time} ${persianDate}`;
};


export const ConvertToDateTimeGerogrian = (
    value,
    defaultFormat = "YYYY-MM-DD HH:mm",
    defaultValue = ""
) => {
    const dateIsValid = value ? moment(new Date(value))?.isValid() : false;
    return dateIsValid
        ? moment(new Date(value)).format(defaultFormat)
        : defaultValue;
};

export const ToPersianDigits = (number) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return number?.toString()?.replace(/\d/g, (digit) => persianDigits[digit]);
};

export const CenteringColumn = (value) =>
    value?.map((item) => ({
        // cellClassName: "flex items-center justify-center",
        cellClassName: "grid place-items-center",
        align: "center",
        headerAlign: "center",
        flex: 1,
        minWidth: 100,
        ...item,
    }));

export const GetBackgroundColor = (color, mode) =>
    mode === "dark" ? darken(color, 0.7) : lighten(color, 0.8);

export const GetHoverBackgroundColor = (color, mode) =>
    mode === "dark" ? darken(color, 0.7) : lighten(color, 0.7);

export const GetSelectedBackgroundColor = (color, mode) =>
    mode === "dark" ? darken(color, 0.7) : lighten(color, 0.5);

export const GetSelectedHoverBackgroundColor = (color, mode) =>
    mode === "dark" ? darken(color, 0.7) : lighten(color, 0.5);

const DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
export const dateUtils = {
    format: (date) => {
        if (!date) return null;
        try {
            return format(new Date(date), DATE_FORMAT);
        } catch {
            return null;
        }
    },

    parse: (dateString) => {
        if (!dateString) return null;
        try {
            return parse(dateString, DATE_FORMAT, new Date());
        } catch {
            return null;
        }
    },

    isValid: (date) => {
        if (!date) return false;
        return !isNaN(new Date(date).getTime());
    },
};

export const DownloadExcell = (data, name = "ACC2") => {
    const blob = new Blob([data], { type: "xls" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${name}.xls`;
    link.href = url;
    link.click();
};

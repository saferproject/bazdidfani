import React from "react";
import {
    Stack,
    Typography,
    Divider,
    TextField,
    Autocomplete,
    Button,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Virtuoso } from "react-virtuoso";

export default function SelectedList({
    rows,
    setReportSettingData,
    ReportSettingData,
    SelectedRow,
    setSelectedRow,
    onDoubleClick,
    TextAlignmentOptions,
}) {
    const IsColumnSelected = (id) => {
        return (
            ReportSettingData?.report_columns?.filter((x) => x.id == id).length > 0
        );
    };

    const getBackgroundColor = (primaryColor, mode) => {
        return "#E3F2FD"; // آبی خیلی روشن
    };

    const getHoverBackgroundColor = (primaryColor, mode) => {
        return "#BBDEFB"; // آبی روشن‌تر
    };

    const GetSelectedColumn = (id) => {
        return ReportSettingData?.report_columns?.filter((x) => x.id == id)[0];
    };
    function ParseToNumber(num) {
        if (!num) {
            return 0;
        }
        if (typeof num == "string") {
            return Number.parseInt(num);
        } else {
            return num;
        }
    }

    function SelectOnFocus(event) {
        event.target.select();
    }

    const NullishNumber = (num) => (num == null ? 0 : num);

    const handleGoUp = () => {
        setReportSettingData((curr) => {
            const newReportColumns = curr.report_columns
                .sort(
                    (a, b) =>
                        NullishNumber(a.pivot.sort_number) -
                        NullishNumber(b.pivot.sort_number)
                )
                .map((x) => {
                    if (
                        x.pivot.sort_number ===
                        ParseToNumber(SelectedRow.pivot.sort_number) - 1
                    ) {
                        return {
                            ...x,
                            pivot: { ...x.pivot, sort_number: x.pivot.sort_number + 1 },
                        };
                    } else if (x.id === SelectedRow.id) {
                        return {
                            ...x,
                            pivot: {
                                ...x.pivot,
                                sort_number: ParseToNumber(x.pivot.sort_number) - 1,
                            },
                        };
                    }
                    return x;
                });

            return { ...curr, report_columns: newReportColumns };
        });

        setSelectedRow((curr) => ({
            ...curr,
            pivot: { ...curr.pivot, sort_number: curr.pivot.sort_number - 1 },
        }));
    };

    const handleGoDown = () => {
        setReportSettingData((curr) => {
            const newReportColumns = curr.report_columns
                .sort(
                    (a, b) =>
                        NullishNumber(a.pivot.sort_number) -
                        NullishNumber(b.pivot.sort_number)
                )
                .map((x) => {
                    if (
                        x.pivot.sort_number ==
                        ParseToNumber(SelectedRow.pivot.sort_number) + 1
                    ) {
                        return {
                            ...x,
                            pivot: { ...x.pivot, sort_number: x.pivot.sort_number - 1 },
                        };
                    } else if (x.id === SelectedRow.id) {
                        return {
                            ...x,
                            pivot: {
                                ...x.pivot,
                                sort_number: ParseToNumber(x.pivot.sort_number) + 1,
                            },
                        };
                    } else {
                        return x;
                    }
                });

            return { ...curr, report_columns: newReportColumns };
        });
        setSelectedRow((curr) => ({
            ...curr,
            pivot: { ...curr.pivot, sort_number: curr.pivot.sort_number + 1 },
        }));
    };

    return (
        <Stack direction={"row"} flexGrow={1} height={"100%"}>
            <Stack flexGrow={1} height={"100%"}>
                <Stack direction={"row"} gap={1} py={1} px={0.5}>
                    <Typography variant="body2" color="text.secondary" flexGrow={1}>
                        --
                    </Typography>
                    <Typography variant="body2" color="text.secondary" width={90}>
                        عرض
                    </Typography>
                    <Typography variant="body2" color="text.secondary" width={120}>
                        چیدمان
                    </Typography>
                    <Typography variant="body2" color="text.secondary" width={80}>
                        ترتیب
                    </Typography>
                </Stack>
                <Divider />
                <Stack flexGrow={1}>
                    <Virtuoso
                        data={rows}
                        itemContent={(index, item) => (
                            <Stack
                                direction={"row"}
                                gap={1}
                                py={0.5}
                                px={1}
                                alignItems={"center"}
                                sx={(theme) => ({
                                    backgroundColor: SelectedRow && SelectedRow.id == item.id 
                                    ? "#E3F2FD"  // رنگ انتخاب شده
                                    : "inherit",
                                  ":hover": {
                                    backgroundColor: "#BBDEFB",  // رنگ هاور
                                  },
                                    transition: "ease-in-out 150ms",
                                    cursor: "pointer",
                                    m: 0.5,
                                    borderRadius: 1,
                                })}
                                onClick={() => setSelectedRow(item)}
                                onDoubleClick={onDoubleClick}
                            >
                                <Typography sx={{ flexGrow: 1, userSelect: "none" }}>
                                    {item.persian_name}
                                </Typography>
                                <TextField
                                    disabled={!IsColumnSelected(item.id)}
                                    value={GetSelectedColumn(item.id).pivot?.width}
                                    onChange={(e) => {
                                        setReportSettingData((curr) => ({
                                            ...curr,
                                            report_columns: curr.report_columns.map((x) =>
                                                x.id == item.id
                                                    ? {
                                                        ...x,
                                                        pivot: {
                                                            ...x.pivot,
                                                            width: ParseToNumber(e.target.value),
                                                        },
                                                    }
                                                    : x
                                            ),
                                        }));
                                    }}
                                    onFocus={SelectOnFocus}
                                    name="width"
                                    fullWidth={false}
                                    sx={{ width: 60 }}
                                    variant="standard"
                                />
                                <Autocomplete
                                    options={TextAlignmentOptions}
                                    value={TextAlignmentOptions?.filter(
                                        (x) => x.id == item.pivot.text_direction
                                    )[0]}
                                    onChange={(e, val) => {
                                        setReportSettingData((curr) => ({
                                            ...curr,
                                            report_columns: curr.report_columns.map((x) =>
                                                x.id == item.id
                                                    ? {
                                                        ...x,
                                                        pivot: {
                                                            ...x.pivot,
                                                            text_direction: val.id,
                                                        },
                                                    }
                                                    : x
                                            ),
                                        }));
                                    }}
                                    isOptionEqualToValue={(option, value) =>
                                        option.id === value.id
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            sx={{ width: 120 }}
                                            name="alignment"
                                            variant="standard"
                                        />
                                    )}
                                    disableClearable
                                />
                            </Stack>
                        )}
                    />
                </Stack>
            </Stack>
            <Divider flexItem orientation="vertical" />
            <Stack gap={0.5} p={0.5} justifyContent={"center"}>
                <Button
                    sx={{ flexDirection: "column" }}
                    title="بالا"
                    disabled={!SelectedRow || ParseToNumber(SelectedRow.pivot.sort_number) <= 1}
                    onClick={(e) => {
                        e.preventDefault();
                        handleGoUp();
                    }}
                >
                    <span>بالا</span>
                    <ExpandLess />
                </Button>
                <Button
                    sx={{ flexDirection: "column" }}
                    title="پایین"
                    disabled={!SelectedRow || SelectedRow.pivot.sort_number == rows.length}
                    onClick={(e) => {
                        e.preventDefault();
                        handleGoDown();
                    }}
                >
                    <ExpandMore />
                    <span>پایین</span>
                </Button>
            </Stack>
        </Stack>
    );
}
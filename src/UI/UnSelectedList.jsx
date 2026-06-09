import React, { useState } from "react";
import { Stack, Typography, Paper } from "@mui/material";
import { Virtuoso } from "react-virtuoso";

export default function UnSelectedList({
    rows,
    SelectedRow,
    setSelectedRow,
    onDoubleClick,
}) {

    const getBackgroundColor = (primaryColor, mode) => {
        return "#E3F2FD"; // آبی خیلی روشن
    };

    const getHoverBackgroundColor = (primaryColor, mode) => {
        return "#BBDEFB"; // آبی روشن‌تر
    };

    return (
        <Paper variant="outlined" sx={{ width: 240, maxHeight: 320 }}>
            <Virtuoso
                data={rows}
                itemContent={(index, item) => (
                    <Stack
                        px={2}
                        py={1}
                        sx={(theme) => ({
                            backgroundColor:
                                SelectedRow && SelectedRow.id == item.id
                                    ? getBackgroundColor(
                                        theme.palette.primary.main,
                                        theme.palette.mode
                                    )
                                    : "inherit",
                            ":hover": {
                                backgroundColor: getHoverBackgroundColor(
                                    theme.palette.primary.main,
                                    theme.palette.mode
                                ),
                            },
                            transition: "ease-in-out 150ms",
                            cursor: "pointer",
                            m: 0.5,
                            borderRadius: 1,
                            userSelect: "none",
                        })}
                        onClick={() => setSelectedRow(item)}
                        onDoubleClick={onDoubleClick}
                    >
                        <Typography>{item.persian_name}</Typography>
                    </Stack>
                )}
            />
        </Paper>
    );
}
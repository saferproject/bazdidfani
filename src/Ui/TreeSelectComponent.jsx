import { Controller } from "react-hook-form";
import { TextField, CircularProgress, InputAdornment } from "@mui/material";
import TreeSelect from "mui-tree-select";

const TreeSelectComponent = ({
  control,
  name,
  items,
  error,
  label,
  className,
  size = "medium",
  disabled = false,
  isLoading = false,
  setOnOpen,
  startIcon,
  endIcon,
  ...others
}) => {
  class Node {
    constructor(value) {
      this.value = value;
    }
    getParent() {
      const findParent = (data, childId) => {
        for (const item of data) {
          if (
            item.children?.length &&
            item.children.some((child) => child.id === childId)
          ) {
            return new Node(item);
          } else if (item.children?.length) {
            const parent = findParent(item.children, childId);
            if (parent) return parent;
          }
        }
        return null;
      };
      return findParent(items, this?.value?.id);
    }

    getChildren() {
      return this.value.children?.length
        ? this.value.children.map((child) => new Node(child))
        : null;
    }

    isBranch() {
      return !!this.value.children?.length;
    }

    isEqual(to) {
      return to.value?.id === this.value?.id;
    }

    toString() {
      return this?.value?.label;
    }
  }

  const runAsync = false;

  const syncOrAsync = (value, returnAsync) => {
    if (returnAsync) {
      return new Promise((resolve) =>
        setTimeout(() => resolve(value), Math.random() * 500)
      );
    }
    return value;
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field }) => (
        <TreeSelect
          {...field}
          className={className}
          loading={isLoading}
          onOpen={() => setOnOpen && setOnOpen(true)}
          onClose={() => setOnOpen && setOnOpen(false)}
          getChildren={(node) =>
            syncOrAsync(
              node
                ? node.getChildren()
                : items?.map((item) => new Node(item)),
              runAsync
            )
          }
          loadingText={"در حال بارگذاری..."}
          getOptionDisabled={(option) => {
            return option?.isBranch() && !option?.getChildren()?.length;
          }}
          getParent={(node) => syncOrAsync(node?.getParent(), runAsync)}
          isBranch={(node) => syncOrAsync(node?.isBranch(), runAsync)}
          isOptionEqualToValue={(option, value) => option?.isEqual(value)}
          onChange={(event, value) => {
            field.onChange(value);
          }}
          disabled={disabled}
          renderInput={(params) => (
            <TextField
              {...params}
              size={size}
              label={label}
              variant="outlined"
              error={!!error}
              helperText={!!error && error?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: size === "small" ? "10px" : "17px",
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
                  maxHeight: "none" 
                },
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
                    {endIcon && (
                      <InputAdornment position="end">{endIcon}</InputAdornment>
                    )}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          {...others}
        />
      )}
    />
  );
};

export default TreeSelectComponent;
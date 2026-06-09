import Button from '@mui/material/Button';

const CustomButton = ({
    hasPermission = true,
    content,
    type = "button",
    className = "",
    onClick,
    variant = "contained",
    disable,
    loading,
    endIcon,
    startIcon,
    radius,
    height,
    fontSize,
    width,
    fontColor,
    bgColor,
    color,
    sx = {},
    ...others
}) => {
    if (!hasPermission) return null;
    return (
        <Button
            size='small'
            {...others}
            onClick={type === "submit" ? undefined : onClick}
            type={type}
            endIcon={endIcon}
            startIcon={startIcon}
            variant={variant}
            loading={loading}
            color={color}
            disabled={disable || loading}
            sx={{
                border: variant === "contained" ? 'none' : "",
                fontColor: fontColor ? fontColor : "white",
                backgroundColor: bgColor ? bgColor : "",
                fontFamily: "Yekan-bold",
                paddingX: (endIcon || startIcon) ? "25px" : "",
                borderRadius: radius,
                height: height,
                width: width,
                fontSize: fontSize,
                ...sx,
            }}
            className={`p-0 ${className}`}
        >
            {loading ? null : (endIcon || startIcon) ? (
                <div className="flex justify-between items-center w-full">
                    {content}
                </div>
            ) : (
                content
            )}
        </Button>
    )
}

export default CustomButton;
import { Button } from "@mui/material";
import { TiPlus } from "react-icons/ti";

const AddRecordButton = ({
    text,
    icon,
    onClick,
    hover,
    bgColor = "#FEECC5",
    color = "textBase",
    disabled,
    loading,
}) => {
    return (
        <>
            <Button
                onClick={() => onClick()}
                loading={loading}
                className="flex !justify-between items-center gap-1 group !px-3 !py-3"
                disabled={disabled || loading}
                sx={{
                    height : "46px",
                    width: '12rem !important', // w-48
                    // height: '8.75rem !important', // h-35
                    borderRadius: '8px !important',
                    backgroundColor: disabled || loading ? "oklch(87.1% 0.006 286.286)" : bgColor,
                    // border: '1px solid #F8BE69 !important',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 100ms ease-out',
                    textTransform: 'none',
                    minWidth: 0,
                    '&:hover': hover ? hover : {
                        backgroundColor: '#FDC13C !important',
                        '&::before': {
                            opacity: 1,
                        }
                    },
                    '&:active': {
                        backgroundColor: 'var(--main-color) !important',
                        transform: 'scale(0.98) translateY(0)',
                    },
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(255,255,255,0.1), transparent)',
                        opacity: 0,
                        transition: 'opacity 300ms',
                    }
                }}
            >
                {!loading && (<>
                    <p className={`text-[0.75rem] font-[yekan-bold] select-none text-${color}`}>{text}</p>
                    <div className={`text-[1.1rem] text-${color} transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}>
                        {icon ? icon : <TiPlus />}
                    </div>
                </>)}

            </Button>
        </>
    )
}
export default AddRecordButton;
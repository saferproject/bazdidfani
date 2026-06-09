import { Box, DialogActions, Stack, Typography } from "@mui/material";
import CustomButton from "./Button";
import PermScanWifiOutlinedIcon from "@mui/icons-material/PermScanWifiOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
const DeleteItem = ({ handleDelete, handleCancel, isLoading, text = "" }) => {
    return (
        <div className="relative overflow-hidden ">
            <Box className={"w-[90%] mx-auto p-10"}>
                <Box>
                    <DeleteOutlineOutlinedIcon className="!text-[200px] absolute -left-20 -top-5  !text-[#eff2f5]" />
                </Box>
                <Box className="absolute top-4 right-4 ">
                    <ClearIcon
                        className="!font-black cursor-pointer text-main hover:bg-main rounded-full hover:text-white transition"
                        onClick={() => {
                            handleCancel();
                        }}
                    />
                </Box>
                <Stack direction={"row"} alignItems={"center"} gap={"10px"}>
                    <Box className={"bg-[#ffe4e6] w-fit rounded-full p-2"}>
                        <PermScanWifiOutlinedIcon color="error" fontSize="large" />
                    </Box>
                    <Typography
                        variant="h1"
                        gutterBottom
                        className="!text-[20px] !font-black !mb-0"
                        color={"error"}
                    >
                        آیا از حذف آیتم انتخاب شده اطمینان دارید؟
                    </Typography>
                </Stack>
                <Typography
                    variant="body1"
                    gutterBottom
                    className="!text-[14px] !font-black !mb-0 !mr-14 !mt-4"
                    color={"secondary.main"}
                >
                    {text || "با حذف این رکورد تمامی فیلدهای آیتم انتخاب شده حذف میشود"}
                </Typography>

                <DialogActions className="!justify-center gap-3 mt-8">
                    <CustomButton
                        radius="12px"
                        fontSize="0.75rem"
                        content="حذف"
                        sx={{
                            '&:hover': {
                                backgroundColor: 'danger.main',
                                color: 'white',
                            },
                        }}
                        color="error"
                        variant="contained"
                        onClick={() => handleDelete()}
                        loading={isLoading}
                        className="w-full !min-h-[45px] flex !justify-between !font-black !text-[15px]"
                        endIcon={<KeyboardBackspaceIcon />}
                    />
                    <CustomButton
                        radius="12px"
                        fontSize="0.75rem"
                        variant="outlined"
                        content="انصراف"
                        sx={{
                            '&:hover': {
                                backgroundColor: 'primary.main',
                                color: 'white',
                            },
                        }}
                        onClick={() => handleCancel()}
                        endIcon={<ClearIcon />}
                        disable={isLoading}
                        hasCircularShape={true}
                        ballColor={"green"}
                        className="w-full !min-h-[45px] flex !justify-between !font-black !text-[15px]"
                    />

                </DialogActions>
            </Box>
        </div>
    )
}
export default DeleteItem
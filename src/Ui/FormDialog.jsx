import { Box, Stack } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { RiHomeSmile2Fill } from "react-icons/ri";
import CustomButton from "./Button";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RiCloseFill } from "react-icons/ri";

const FormDialog = ({
    children,
    handleCancel,
    title,
    tinyTitle,
    isLoading,
    selectedItem,
    onSubmit,
    className,
    customComponent,
    customComponentClassName,
    hasTitle = true,
    hasCloseIcon = false,
    onKeyDown,
    innerComponentClassName = "",
}) => {
    return (
        <form onKeyDown={onKeyDown} onSubmit={onSubmit} className={className || ""}>
            <Box className={"py-10 px-10 flex flex-col gap-12 relative" + innerComponentClassName}>
                {hasCloseIcon ? (
                    <Box className={"absolute top-3 right-3"}>
                        <ClearIcon
                            color="primary"
                            className="!font-black cursor-pointer"
                            onClick={() => {
                                handleCancel();
                            }}
                        />

                    </Box>
                ) : null}
                {hasTitle ? (
                    <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        gap={2}
                        alignItems={"center"}
                    >
                        <span className="flex items-end gap-12">
                            <h1 className="min-w-fit font-[yekan-ex-bold] text-baseText">
                                {title}
                            </h1>
                            {tinyTitle && (
                                <h1 className="pt-1  min-w-fit font-[yekan] text-baseText text-[0.75rem]">
                                    {selectedItem ? "ویرایش" : "افزودن"} {tinyTitle} {selectedItem ? null : " جدید"}
                                </h1>
                            )}
                        </span>
                        <Box className={`filter-container ${customComponentClassName}`}>
                            {customComponent}
                        </Box>
                    </Stack>
                ) : null}
                <div className="flex relative z-20 overflow-hidden justify-between items-center w-full py-4 px-10  h-16 rounded-[21px] bg-coffie">
                    <span className="absolute -z-10 -left-2 -bottom-2 border-[0.18rem] border-white w-16 h-16 rounded-full"></span>
                    <span className="absolute -z-10 left-10 -bottom-6 bg-coffie border-[0.18rem] border-white w-14 h-14 rounded-full"></span>
                    {/* STUB left balls */}
                    <span className="flex items-end gap-3 text-baseText">
                        <RiHomeSmile2Fill className="text-[1.4rem]" />
                        <p className="text-[0.6rem] font-bold">شما اینجا هستید : {title}  ... {selectedItem ? "ویرایش" : "افزودن"} {tinyTitle} {selectedItem ? null : "جدید"}</p>
                    </span>
                    <div className="text-baseText text-[0.9rem] font-[yekan-bold]">
                        {/* NOTE جای برای نوشتن متنی */}

                    </div>
                </div>
                {children}
                <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"end"}
                    gap={2}
                    className="!mr-auto w-full mt-5">
                    <CustomButton
                        className="w-36 "
                        disable={isLoading}
                        onClick={() => {
                            handleCancel();
                        }}
                        radius="17px"
                        sx={{
                            backgroundColor: 'danger.main'
                        }}
                        content={<>
                            <div className="w-full flex justify-between items-center py-2 px-1">
                                <p className="text-[0.85rem]">انصراف</p>
                                <RiCloseFill className="text-[1rem]" />
                            </div>
                        </>}
                    />
                    <CustomButton
                        className={`w-36 ${!isLoading && "!border-b-[2px] !border-[#007F82]"}`}
                        type="submit"
                        loading={isLoading}

                        radius="17px"
                        content={<>
                            <div className="w-full flex justify-between items-center py-2 px-1">
                                <p className="text-[0.85rem]">{selectedItem ? "ویرایش" : "ثبت"}</p>
                                <FaArrowLeftLong className="text-[1rem]" />
                            </div>
                        </>}
                    />
                </Stack>
            </Box>
        </form>
    );
};

export default FormDialog;

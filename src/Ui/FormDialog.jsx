import { Box, IconButton, Stack } from "@mui/material";
import CustomButton from "./Button";
import { GrFormClose } from "react-icons/gr";

const FormDialog = ({
    children,
    handleCancel,
    title,
    customTitle,
    isLoading,
    selectedItem,
    onSubmit,
    className,
    customComponent,
    customComponentClassName,
    hasTitle = true,
    onKeyDown,
    innerComponentClassName = "",
}) => {
    return (
        <form onKeyDown={onKeyDown} onSubmit={onSubmit} className={className || ""}>
            <Box className={"p-15 flex flex-col gap-10 relative" + innerComponentClassName}>
                <div className="flex w-full items-center justify-between">
                    <div className="flex gap-4 items-center">
                        <IconButton onClick={() => handleCancel()} className="!bg-main !text-black !w-7 !h-7 !rounded-full" aria-label="delete" size="small">
                            <GrFormClose className="!text-[4rem]" />
                        </IconButton>
                        <h1 className="min-w-fit font-[yekan-bold] text-textBase">
                            {customTitle ? customTitle : selectedItem ? (<>ویرایش {title}</>) : (<>افزودن {title}</>)}
                        </h1>
                    </div>
                    {hasTitle ? (
                        <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                            gap={2}
                            alignItems={"center"}
                        >

                            <Box className={`filter-container ${customComponentClassName}`}>
                                {customComponent}
                            </Box>
                        </Stack>
                    ) : null}
                </div>

                {children}
                <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"end"}
                    gap={2}
                    className="!mr-auto w-full mt-5">
                    <CustomButton
                        bgColor={"secondary.main"}
                        className={`w-60 !shadow-none`}
                        type="submit"
                        loading={isLoading}
                        radius="15px"
                        height={"60px"}
                        content={<>
                            {!isLoading && (
                                <div className="w-full flex justify-between items-center px-1">
                                    <p className="text-[1rem] font-[yekan-ex-bold] text-white">{selectedItem ? "ویرایش" : "ثـــبـت"}</p>
                                    <img className="w-5" src="../../images/arrowConfirm.svg" alt="submit image" />
                                </div>
                            )}
                        </>}
                    />
                    {/* <CustomButton
                        className={`w-55 !shadow-none`}
                        disable={isLoading}
                        height={"50px"}
                        onClick={() => {
                            handleCancel();
                        }}
                        radius="17px"
                        sx={{
                            backgroundColor: 'danger.main'
                        }}
                        content={<>
                            <div className="w-full flex justify-between items-center px-1 text-white">
                                <p className="text-[0.95rem]">انصراف</p>
                                <RiCloseFill className="text-[1.2rem]" />
                            </div>
                        </>}
                    /> */}
                </Stack>
            </Box>
        </form>
    );
};

export default FormDialog;

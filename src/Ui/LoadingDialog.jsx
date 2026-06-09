import { Dialog } from "@mui/material";
import { useAuthContext } from "../Context/ContextApi";
import spinnerLoading from "../../public/images/spinnerLoading.svg"
import spinner2 from "../../public/images/spinner2.svg"

const LoadingDialog = () => {
    const { isLoading } = useAuthContext();

    return (
        <>
            <Dialog
                className={`mx-auto`}
                open={isLoading}
                onClose={isLoading === false}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
                maxWidth={"sm"}
                sx={{
                    '& .MuiPaper-root': {
                        borderRadius: '25px',
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        overflow: 'visible'
                    }
                }}
            >
                <div className="bg-white w-[50%] mx-auto rounded-[35px] flex flex-col  pb-10 items-center">
                    <img className="w-24" src={spinner2} alt="" />
                    <h1 className="text-main font-[alibaba-bold] text-[1.5rem] mb-3">پیکاد ...</h1>
                    <p className="font-[yekan-bold]">لطفا صبر بنمایید 😊 </p>
                </div>
            </Dialog>
        </>
    )
}

export default LoadingDialog;
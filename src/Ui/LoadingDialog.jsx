import { Dialog } from "@mui/material";
import { useAuthContext } from "../Context/ContextApi";
import spinner1 from "../../public/images/spinner1.gif"
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
                <div className="bg-white w-[50%] mx-auto rounded-[35px] flex flex-col gap-4 py-4 items-center">
                    <img className="w-24" src={spinner1} alt="" />
                    <h1 className="text-main font-[alibaba] text-[1.5rem]">دنــتالاین ...</h1>
                    <p>لطفا صبر بنمایید 😊 </p>
                </div>
            </Dialog>
        </>
    )
}

export default LoadingDialog;
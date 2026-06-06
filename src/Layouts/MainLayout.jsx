import { Outlet, Link } from "react-router-dom";
// import MainMenu from "../Components/Menu/MainMenu";
import { useState } from "react";
import { Avatar, Checkbox, Dialog } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import { useAuthContext } from "../Context/ContextApi";

// export const BpIcon = styled('span')(({ theme }) => ({
//     borderRadius: 3,
//     width: 12,
//     height: 12,
//     backgroundColor: '#212135', // تغییر رنگ پس‌زمینه
//     backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
//     'input:hover ~ &': {
//         backgroundColor: '#2a2a42', // رنگ hover
//         ...theme.applyStyles('dark', {
//             backgroundColor: '#30404d',
//         }),
//     },
//     'input:disabled ~ &': {
//         boxShadow: 'none',
//         background: 'rgba(33,33,53,.5)',
//         ...theme.applyStyles('dark', {
//             background: 'rgba(57,75,89,.5)',
//         }),
//     },
//     ...theme.applyStyles('dark', {
//         boxShadow: '0 0 0 1px rgb(16 22 26 / 40%)',
//         backgroundColor: '#212135', // تغییر رنگ پس‌زمینه در حالت dark
//         backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))',
//     }),
// }));

// export const BpCheckedIcon = styled(BpIcon)({
//     backgroundColor: '#212135', // تغییر رنگ پس‌زمینه حالت checked
//     backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
//     '&::before': {
//         display: 'block',
//         width: 11,
//         height: 11,
//         backgroundImage:
//             "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
//             " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
//             "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
//         content: '""',
//     },
//     'input:hover ~ &': {
//         backgroundColor: '#2a2a42', 
//     },
// });

// export function BpCheckbox(props) {
//     return (
//         <Checkbox
//             sx={{ '&:hover': { bgcolor: 'transparent' } }}
//             disableRipple
//             color="default"
//             checkedIcon={<BpCheckedIcon />}
//             icon={<BpIcon />}
//             inputProps={{ 'aria-label': 'Checkbox demo' }}
//             {...props}
//         />
//     );
// }

const MainLayout = () => {
    const [openMenu, setOpenMenu] = useState(true)
    const { setIsLoading, globalDialog, setGlobalDialog, currentCash,cashLoading } = useAuthContext();
    // const user = JSON.parse(GetItem("user"));
    const token = GetItem("authToken")
    const {
        control,
        setValue,
        formState: { errors },
    } = useForm({
        panel_id: null
    });

    const renderContent = () => {

    }



    return (
        <>
            <div className="flex gap-3 my-5 pr-4 pl-9 ">
                {/* NOTE MENU */}

                {/* <div
                    className={`sticky self-start flex-shrink-0 flex top-5 h-fit transition-all duration-300
                        ${openMenu ? "w-[270px]" : "w-[180px]"}
                    `}>
                    <MainMenu
                        currentCash={currentCash}
                        currentCashLoading={cashLoading}
                        openMenu={openMenu}
                        setOpenMenu={setOpenMenu}
                    />
                </div> */}

                {/* <div className="flex flex-col gap-8 w-full min-w-0 pr-8">
                    <span className="flex !w-full justify-end">
                        <div className="flex items-center gap-x-4">
                            <div className="flex gap-3 items-center">
                                <Link to="/profile">
                                    <img className="w-12" src="../../images/headerRing.svg" alt="messages" />
                                </Link>
                                <Link to="/profile">
                                    <img className="w-12 cursor-pointer" src="../../images/headerMessage.svg" alt="messages" />
                                </Link>
                            </div>

                            <div className="flex items-center bg-contain bg-no-repeat bg-center min-w-50 min-h-20 px-3 justify-between"
                                style={{
                                    backgroundImage: "url(../../images/profileHeader.svg)"
                                }}
                            >
                                <Avatar
                                    className="!border-4 border-[#DDAF4E]"
                                    sx={{ width: 50, height: 50 }}
                                    alt="user image" src="../../../images/userImage.jpg" />
                                <div className="flex flex-col  items-center font-[yekan-bold]">
                                    <p className="text-[0.85rem]">
                                        {user?.first_name + " " + user?.last_name}
                                    </p>
                                    <p className="text-[0.75rem] ">
                                        {user?.phone}
                                    </p>
                                </div>
                                <img src="../../../images/SIMCard.svg" alt="sim card" />
                            </div>

                        </div>
                    </span>
                    <div className="relative h-[130px] w-full bg-[#E7EAED] p-2 rounded-[32px] hidden lg:block">
                        <img className="absolute left-15 -top-14 w-52" src="../../images/girlWithRocket.svg" alt="login image" />
                        <img className="absolute right-60 top-9 w-58" src="../../images/bannerText.svg" alt="" />
                        <img className="absolute right-10 bottom-0 w-43" src="../../images/loginImage2.svg" alt="login image" />
                    </div>
                    <Outlet />
                   
                </div> */}
                <Dialog
                    className={`mx-auto`}
                    open={globalDialog.isOpen}
                    onClose={() => setGlobalDialog(prev => ({
                        ...prev,
                        isOpen: false,
                        contentType: "",
                        size: "sm",
                        selectedItem: null,
                    }))}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth
                    maxWidth={globalDialog.size}
                    sx={{
                        '& .MuiPaper-root': {
                            borderRadius: '40px',
                        }
                    }}
                    BackdropProps={{
                        sx: {
                            backdropFilter: 'blur(3px)',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }}
                >
                    {renderContent()}
                </Dialog>
            </div>
        </>
    )
}
export default MainLayout;
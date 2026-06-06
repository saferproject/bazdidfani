import { Controller, useForm } from "react-hook-form";
import Input from "../../../Ui/Input";
import { zodResolver } from '@hookform/resolvers/zod';
import { SlLock } from "react-icons/sl";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";
import CustomButton from "../../../Ui/Button";
import { Checkbox, InputAdornment, TextField } from "@mui/material";
import { CiMobile3 } from "react-icons/ci";
import { IoShieldOutline } from "react-icons/io5";
import { RiArrowLeftLongLine } from "react-icons/ri";
import { FaArrowDown } from "react-icons/fa6";
import { ThemeConsumer } from "styled-components";
import { SendOtp } from "../../../API/EndPoints/Auth/Auth";

const LoginWithOTPCode = z.object({
    mobile: z
        .string()
        .min(1, "شماره موبایل الزامی است")
        .regex(/^09\d{9}$/, "شماره موبایل نامعتبر است")
        .length(11, "شماره موبایل باید 11 رقم باشد"),
});

const Login = () => {

    const [showOtp, setShowOtp] = useState(() => {
        return localStorage.getItem('otpState') === 'true';
    });
    const [acceptTerms, setAcceptTerms] = useState(false)
    // const { setIsLoading, setUserStatus,userStatus } = useAuthContext();
    const [timeLeft, setTimeLeft] = useState(0);
    const [isResetCode, setIsResetCode] = useState(false)
    const [savedPhone, setSavedPhone] = useState(() => {
        return localStorage.getItem('otpPhone') || "";
    });

    const navigate = useNavigate()
    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: zodResolver(LoginWithOTPCode),
        defaultValues: {
            mobile: "",
        },
    });

    // const { isLoading: checkTokenLoading } = CheckToken({
    //     enable: !!localStorage.getItem("authToken"),
    //     onSuccess: ({ data }) => {
    //         if (data?.user?.role === "admin" || data?.user?.role === "superAdmin") {
    //             navigate("/admin/dashboard")
    //         } else {
    //             navigate("/dashboard")
    //         }
    //     },
    // });

    // useEffect(() => {
    //     setIsLoading(checkTokenLoading);
    // }, [checkTokenLoading]);

    // ANCHOR این هی داره شماره تلفن رو از لوکال استورج میگیره
    useEffect(() => {
        const phone = localStorage.getItem('otpPhone');
        if (phone) {
            setValue('mobile', mobile);
        }
    }, [setValue]);

    const startTimer = () => {
        const endTime = Date.now() + 120000; // 2 دقیقه = 120000 میلی‌ثانیه
        localStorage.setItem('otpTimerEnd', endTime.toString());
    };

    useEffect(() => {
        const updateTimer = () => {
            const endTime = localStorage.getItem('otpTimerEnd');
            if (!endTime) {
                setTimeLeft(0);
                return;
            }

            const remaining = Math.max(0, Math.floor((parseInt(endTime) - Date.now()) / 1000));
            setTimeLeft(remaining);

            if (remaining === 0) {
                localStorage.removeItem('otpTimerEnd');
            }
        };

        updateTimer(); // اجرای اولیه
        const interval = setInterval(updateTimer, 1000); // به‌روزرسانی هر ثانیه

        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const { mutate: login, isLoading: loginLoading } = SendOtp({
        onSuccess: async (data) => {
            const phoneValue = control._formValues.phone;

            setIsResetCode(false)
            setShowOtp(true);
            setSavedPhone(phoneValue);
            startTimer();
            ``
            // ذخیره وضعیت در localStorage
            localStorage.setItem('otpState', 'true');
            localStorage.setItem('otpPhone', phoneValue);

        },
    });

    // NOTE checkOtp code
    // const { mutate: checkOTPCode, isLoading: checkOTPCodeLoading } = CheckOtpCode({
    //     onSuccess: async ({ data }) => {
    //         localStorage.removeItem('otpState');
    //         localStorage.removeItem('otpPhone');
    //         localStorage.removeItem('otpTimerEnd');

    //         await SetItem("authToken", data?.token);
    //         SetItem("user", JSON?.stringify(data?.user))
    //         // setUserStatus(data?.user)
    //         await SetItem("permissions", data?.permissions)

    //         if (data?.user?.role === "admin" || data?.user?.role === "superAdmin") {
    //             navigate("/admin/dashboard")
    //         } else {
    //             navigate("/dashboard")
    //         }
    //     },
    // });

    // تابع ارسال مجدد کد
    const handleResendOTP = () => {
        if (timeLeft === 0) {
            setIsResetCode(true)
            const phoneValue = savedPhone || control._formValues.phone;
            // login({ phone: phoneValue });
        }
    };

    // تابع ویرایش شماره - بازگشت به صفحه اول
    const handleEditPhone = () => {
        setShowOtp(false);
        setSavedPhone("");
        // پاک کردن وضعیت از localStorage
        localStorage.removeItem('otpState');
        localStorage.removeItem('otpPhone');
        localStorage.removeItem('otpTimerEnd');
    };

    const onSubmit = (data) => {
        console.log("data", data);

        // login(data)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col bg-white py-12 px-8 w-[30rem] rounded-[35px] ${showOtp ? "gap-5" : "gap-9"}`}>
                <span className="w-full flex items-center justify-between font-rokh font-medium text-[1.5rem]">
                    <h1>بازدیدفنی</h1>
                    <h1>BazdidFani</h1>
                </span>
                <div className="flex items-center w-full justify-between">
                    <p className="text-[0.85rem]">ورود به حساب کاربری</p>
                    <p className="text-[0.85rem]">احراز هویت</p>
                </div>
                {showOtp ? <>
                    <div className="flex w-full justify-between items-center">
                        <span
                            className="flex gap-1">
                            <p className="text-[0.8rem]">کد ۴رقمی ارسال شد به شماره <b className="mr-1 text-[0.85rem]">{savedPhone}</b></p>
                        </span>
                        <p
                            onClick={handleEditPhone}
                            className="text-[0.8rem] cursor-pointer hover:underline">ویرایش شماره</p>
                    </div>
                    <LoginOtp checkOTPCode={checkOTPCode} checkOTPCodeLoading={checkOTPCodeLoading} isResetCode={isResetCode} />
                    {/* <LoginOtp /> */}

                    {/* NOTE remaining time */}
                    <div className="w-full flex items-center justify-between ">
                        <p className="text-[0.8rem]">زمان باقی مانده :</p>
                        {timeLeft > 0 ? (
                            <div className="flex items-center gap-2">
                                <span className="text-[0.9rem] text-primary">
                                    {formatTime(timeLeft)}
                                </span>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={handleResendOTP}
                                className="text-[0.8rem] hover:underline cursor-pointer "
                            >
                                ارسال مجدد کد
                            </button>
                        )}
                    </div>
                    <CustomButton
                        disable={true}
                        radius={"16px"}
                        type="submit"
                        content={
                            <div className="w-full flex justify-between items-center px-4 py-3 ">
                                <p className=" text-white text-[1rem]">ورود به پیکاد</p>
                                <img className="w-6" src="../../../images/arrowConfirm.svg" alt="arrow confirm" />
                            </div>
                        }
                    />
                </> : <>
                    <Controller
                        name="mobile"
                        control={control}
                        // size="small"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                variant="outlined"
                                type="text"
                                onChange={(e) => {
                                    field.onChange(e);
                                    const phoneValue = e.target.value;

                                    if (phoneValue) {
                                        navigate(`?phone=${phoneValue}`, { replace: true });
                                    } else {
                                        navigate(window.location.pathname, { replace: true });
                                    }
                                }}
                                sx={{
                                    "& .MuiOutlinedInput-root": { backgroundColor: "#" },
                                    "& input:-webkit-autofill": {
                                        WebkitBoxShadow: "0 0 0 1000px white inset",
                                        WebkitTextFillColor: "#000",
                                    },

                                    "& .MuiInputBase-root": {
                                        height: "3.8rem",
                                        borderRadius: "18px",
                                    },
                                    "& .MuiInputLabel-root": {
                                        display: "none",
                                    },
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        // border: "none",
                                    },
                                    "& .MuiInputBase-input": {
                                        textAlign: "start", // متن کاربر از سمت راست شروع بشه
                                        // fontFamily: "Yekan",
                                        fontSize: "1.063rem"
                                    },
                                    "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
                                        borderColor: "#ED1844",
                                        borderWidth: "1px",
                                    },
                                    "& .MuiFormHelperText-root": {
                                        // fontFamily: "Yekan",
                                        marginTop: "0.375rem",
                                        marginRight: "0rem",
                                        fontSize: "0.75rem",
                                        color: "#ED1844",
                                    },
                                    "& .MuiInputAdornment-root": {
                                        fontSize: "1.563rem",
                                        color: "#777",
                                        whiteSpace: "nowrap",
                                    },
                                }}
                                slotProps={{
                                    htmlInput: {
                                        maxLength: 11,
                                    },
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "0.75rem",
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            color: "black",
                                                            fontSize: "0.8rem",
                                                            whiteSpace: "nowrap",
                                                        }}
                                                    >
                                                        شماره همراه
                                                    </span>
                                                    <span
                                                        style={{
                                                            width: "1px",
                                                            height: "1.5rem",
                                                            borderLeft: "1px dashed #B1C7C7",
                                                        }}
                                                    />
                                                    <CiMobile3 className="text-textBase text-[1.5rem]" />
                                                </div>
                                            </InputAdornment>
                                        ),
                                    }
                                }}
                                className={`w-full`}
                                error={errors.mobile}
                                helperText={(!!errors.mobile && errors?.mobile?.message)}
                            />
                        )}
                    />
                    <div className="w-full flex items-center justify-between">
                        <span className="flex items-center">
                            <Checkbox
                                size="small"
                                checked={acceptTerms}
                                onChange={(e) => setAcceptTerms(e.target.checked)}

                            />
                            <p className=" text-[0.8rem]">قوانین بازدیدفنی را میپذیرم</p>
                        </span>

                        <span className="flex items-center gap-2 cursor-pointer hover:underline">
                            <IoShieldOutline className="text-[1.2rem]" />
                            <p className=" text-[0.8rem]">قوانین و مقررات</p>
                        </span>
                    </div>
                    <CustomButton
                        disable={!acceptTerms}
                        fontColor={"#162864"}
                        // loading={loginLoading}
                        radius={"16px"}
                        type="submit"
                        sx={{ height: "60px" }}
                        content={
                            // !loginLoading && (
                            <div className="w-full flex justify-between items-center px-4 py-3">
                                <p className=" text-[1.3rem] font-yekan font-extrabold">ورود</p>
                                <FaArrowDown className="text-[1.6rem] rotate-90" />
                                {/* <img className="w-6" src="../../../images/arrowConfirm.svg" alt="arrow confirm" /> */}
                            </div>
                            // )
                        }
                    />
                </>}
            </form>
        </>
    )
}
export default Login;
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { IoShieldOutline } from "react-icons/io5";
import CustomButton from "../../UI/Button"
import { FaArrowDown } from "react-icons/fa6";
import { CiMobile3 } from "react-icons/ci";


const Login = () => {
    const [acceptTerms, setAcceptTerms] = useState(false)

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        // resolver: yupResolver(LoginWithOTPCode),
        defaultValues: {
            phone: "",
        },
    });

    const onSubmit = (data) => {
        // login(data)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={`flex flex-col bg-white py-12 px-8 w-[30rem] rounded-[35px] gap-7`}>
                <span className="w-full flex items-center justify-between font-rokh font-medium text-[1.5rem]">
                    <h1>بازدیدفنی</h1>
                    <h1>BazdidFani</h1>
                </span>
                <div className="flex items-center w-full justify-between">
                    <p className="text-[0.85rem]">ورود به حساب کاربری</p>
                    <p className="text-[0.85rem]">احراز هویت</p>
                </div>
                {<>
                    <Controller
                        name="phone"
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
                                error={errors.phone}
                                helperText={(!!errors.phone && errors?.phone?.message)}
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
            </form>        </>
    )
}
export default Login;
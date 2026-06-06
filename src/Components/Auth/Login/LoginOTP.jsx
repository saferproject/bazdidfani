import { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { useSearchParams } from "react-router-dom";

const LoginOtp = ({ checkOTPCode, checkOTPCodeLoading, isResetCode }) => {

    const [searchParams] = useSearchParams();
    const [otpCode, setOtpCode] = useState("");

    useEffect(() => {
        if (isResetCode) {
            setOtpCode("")
        }
    }, [isResetCode])

    const handleOtpChange = (value) => {
        setOtpCode(value);
        if (value.length === 4) {
            checkOTPCode({
                phone: searchParams.get('phone'),
                token: value
            })
        }
    };

    return (
        <>
            <div >
                <OtpInput
                    value={otpCode}
                    onChange={handleOtpChange}
                    numInputs={4}
                    renderInput={(props, index) => (
                        <div className="flex flex-col items-center">
                            <input
                                disabled={checkOTPCodeLoading}
                                type="number"
                                {...props}
                                style={{
                                    width: "90px",
                                    border: "1px solid rgb(226 232 240)",
                                    height: "70px",
                                    borderRadius: "20px",
                                    color: "white",
                                    fontSize: "35px",
                                    fontFamily: "yekan-bold",
                                    textAlign: "center",
                                    outline: "none",
                                    backgroundColor:
                                        otpCode.length > index ? "#175CF0" : "white",
                                }}
                                onFocus={(e) => {
                                    e.target.style.border = "2px solid #175CF0";
                                }}
                                onBlur={(e) => {
                                    e.target.style.border = "1px solid #FDC13C";
                                }}
                            />
                            <div className="h-[10px] mt-2"> {/* فضای ثابت */}
                                {/* {otpCode.length === index ? (
                                    <hr className="w-[40px] border-blue" />
                                ) : null} */}
                            </div>
                        </div>
                    )}
                    containerStyle="flex flex-row-reverse justify-between items-start"
                />
            </div>

        </>
    )
}
export default LoginOtp;
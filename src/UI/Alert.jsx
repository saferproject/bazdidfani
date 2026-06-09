import { BsExclamationTriangle } from "react-icons/bs";

const Alert = ({ text, className }) => {
    return (
        <>
            <div className="w-full flex flex-col md:flex-row items-start md:items-center bg-mainVeryLight py-3 px-4 sm:px-6 rounded-[20px] border border-zinc-300 gap-3 md:gap-8 lg:gap-12">
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <span className="bg-main w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 flex items-center justify-center rounded-full border border-zinc-200">
                        <BsExclamationTriangle className="text-sm sm:text-base" />
                    </span>
                    <h1 className="text-main font-[alibaba-ex-bold] text-[1.1rem] sm:text-[1.2rem] md:text-[1.4rem]">
                        اگه نیازته
                    </h1>
                </div>
                <p className={`font-bold text-[0.7rem] sm:text-[0.75rem] md:text-[0.8rem] leading-relaxed ${className || ''}`}>
                    {text}
                </p>
            </div>
        </>
    )
}

export default Alert;
import { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useLocation, Link } from "react-router-dom";

const MenuItem = ({ menuItem, isActive, onClick, notif, openMenu, setOpenMenu }) => {
    const location = useLocation()
    const [isOpen, setIsOpen] = useState(false);

    // بررسی می‌کند آیا هیچ فرزندی از این منو فعال است
    const hasActiveChild = menuItem.children?.some(
        child => child.url === location.pathname
    );

    // وقتی مسیر عوض شد و هیچ فرزندی فعال نیست، منو را ببند
    useEffect(() => {
        if (!hasActiveChild) {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    }, [location.pathname, hasActiveChild]);

    const showChildren = openMenu && menuItem.children?.length > 0 && isOpen;


    return (
        <>
            <div className="relative w-full flex flex-col gap-3">
                <Link
                    to={menuItem.url}
                    onClick={() => {
                        onClick?.();
                        if (menuItem.children?.length > 0) setIsOpen(prev => !prev);
                    }}
                    className={`
                         flex relative z-30 justify-between items-center min-h-15 px-4 w-full border-[1px] !bg-main rounded-[17px] cursor-pointer border-[#FFE8B6] delay-[0,50ms] active:scale-x-90 transition-all hover:scale-95
                        `}
                    style={{
                        background: "rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(7.9px)",
                    }}
                >
                    <span className="flex items-center gap-3">
                        <p className={`text-[1.35rem]  ${location.pathname === menuItem.url ? "text-textBase" : "text-white"}`}>
                            {menuItem.icon}
                        </p>
                        <p className={`
                            text-[0.75rem] font-[yekan-bold] ${openMenu ? "block" : "hidden"}
                            `}>
                            {menuItem.title}
                        </p>
                    </span>

                    <MdKeyboardArrowLeft className={`${isActive ? "text-textBase" : "text-white"} text-[1.3rem] rounded-[6px]
                     ${isActive && showChildren && menuItem.children.length > 0 && "-rotate-90"}`} />
                </Link>

                {/* SECTION children items */}
                <div className={`flex flex-col gap-2 w-[90%] ${openMenu ? "mx-0 mr-auto" : " mx-auto"}  text-right transition-all  duration-100 ease-in-out ${showChildren ? "h-fit my-3" : "h-0"}`}>
                    {/* NOTE  childrens */}
                    {
                        showChildren && menuItem.children.map((i, index) => (
                            <Link
                                to={i.url}
                                className={`${location.pathname === i.url ? "!border-[#FFE8B6]" : "border-[#FFE8B6]"}
        flex relative z-30 justify-between items-center min-h-14 py-3 ${openMenu ? "px-4" : ""} w-full
        border-[1px] rounded-[15px] cursor-pointer delay-[0,50ms]
        active:scale-x-90 transition-all hover:scale-95`}
                                style={{
                                    background: "#FDC13C",
                                    backdropFilter: "blur(7.9px)",
                                }}
                            >

                                <span className={`flex items-center w-full justify-between ${openMenu ? "2xl:gap-2 gap-1" : "  px-3"} w-full`}>
                                    {/* <p className={`text-[1.2rem]  ${openMenu ? "mx-1" : "mx-auto"} ${location.pathname === i.url ? "text-main" : "text-[#B9C0D3]"}`}>{i.icon}</p> */}
                                    <span className="flex items-center gap-1">
                                        <p className={`text-[1.2rem]
                                            ${location.pathname === i.url ? "text-textBase" : "text-white"}
                                            ${openMenu ? "mx-1" : "mx-2"}`}>{i.icon}</p>
                                        <p
                                            className={`text-[0.75rem] font-[yekan-bold] text-nowrap ${openMenu ? "block" : "hidden"}`}>
                                            {i.title}</p>
                                    </span>

                                    <MdKeyboardArrowLeft className={`${location.pathname === i.url ? "text-textBase" : "text-white"} text-[1.3rem] rounded-[6px]}`} />
                                </span>
                                {notif && (
                                    <span className="bg-warning px-2 text-[0.8rem] font-bold flex items-center rounded-[5px]">
                                        {notif}
                                    </span>
                                )}
                                {!location.pathname === i.url && <MdKeyboardArrowLeft className="text-[#B9C0D3]" />}
                            </Link >
                        ))
                    }
                </div>
            </div>
        </>
    )
}
export default MenuItem;
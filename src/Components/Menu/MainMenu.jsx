import { useEffect, useMemo, useState } from "react";
import { checkPermission } from "../../Helpers/CheckPermission";
import Avatar from "@mui/material/Avatar";
import MenuItem from "./MenuItem"
import { Logout } from "../../API/EndPoints/Auth/Auth";
import { useNavigate, useLocation } from "react-router-dom";
import { TbReportAnalytics } from "react-icons/tb";
import { IconButton } from "@mui/material";
import CustomButton from "../../UI/Button";
import { TiPlus } from "react-icons/ti";
import { SlPower } from "react-icons/sl";
import { LuUsers } from "react-icons/lu";
import { BiShieldQuarter } from "react-icons/bi";
import { RiMailSendFill, RiUserSettingsLine } from "react-icons/ri";
import { SiGoogleappsscript } from "react-icons/si";
import { isAdmin } from "../../Helpers/CheckPermission";
import { MdBlockFlipped, MdGroups, MdOutlineDialpad, MdOutlineSimCard } from "react-icons/md";
import { useAuthContext } from "../../Context/ContextApi";
import { FormattedNumber } from "../../Helpers/HelperFunctions";
import { GetItem } from "../../Helpers/LocalStorage";
import LoadingSpinner from "../../UI/LoadingSppiner";
import { VscCommentDraft } from "react-icons/vsc";
import { PiTelegramLogoDuotone } from "react-icons/pi";
import { BsLightningCharge } from "react-icons/bs";
import { RiContactsBook3Line } from "react-icons/ri";
import { RiChatHistoryLine } from "react-icons/ri";
import { RiShakeHandsLine } from "react-icons/ri";
import { TbDatabaseDollar } from "react-icons/tb";
import { TbAdjustmentsDollar } from "react-icons/tb";
import { TbFileReport } from "react-icons/tb";
import { TbSettingsDollar } from "react-icons/tb";
import { VscCode } from "react-icons/vsc";
import { GoProjectTemplate } from "react-icons/go";
import { TbApiApp } from "react-icons/tb";
import { TbMessage2Down } from "react-icons/tb";
import { TfiHeadphoneAlt } from "react-icons/tfi";

const MainMenu = ({ openMenu, setOpenMenu, currentCash }) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [rotateBtn, setRotateBtn] = useState(false);
    const location = useLocation();
    const user = JSON.parse(GetItem("user"));
    const { setGlobalDialog, setUserStatus, cashLoading } = useAuthContext();

    useEffect(() => {
        const timer = setTimeout(() => {
            setRotateBtn(openMenu);
        }, 350);

        return () => clearTimeout(timer);
    }, [openMenu]);


    const navigate = useNavigate()
    const userPermissions = useMemo(
        () => (localStorage.getItem("permissions") || "").split(",").filter(Boolean),
        []
    );

    const AdminMenuItems = useMemo(
        () => [
            {
                id: 2,
                title: "مدیریت کاربران",
                icon: <RiUserSettingsLine />,
                permissions: [
                    "admin.user.index",
                    "admin.user.store",
                    "admin.user.show",
                    "admin.user.update",
                    "admin.user.destroy",
                    "admin.user.verifyIdentity",
                ],
                children: [
                    {
                        id: 21,
                        title: "کاربران",
                        url: "/admin/users",
                        icon: <LuUsers />,
                        permissions: [
                            "admin.user.index",
                            "admin.user.store",
                            "admin.user.show",
                            "admin.user.update",
                            "admin.user.destroy",
                            "admin.user.verifyIdentity",
                        ]
                    },
                    {
                        id: 22,
                        title: "سطوح دسترسی",
                        url: "/admin/roles",
                        icon: <BiShieldQuarter />,
                        permissions: [
                            "admin.role.index",
                            "admin.role.store",
                            "admin.role.show",
                            "admin.role.update",
                            "admin.role.destroy",
                            "admin.role.attachUser",
                            "admin.role.deAttachUser",
                            "admin.role.attachPermission",
                            "admin.role.deAttachPermission",
                        ]
                    },
                ]
            },
            {
                id: 1,
                title: "پرداختی ها",
                url: "/admin/transactions",
                icon: <TbReportAnalytics />,
                permissions: [
                    "admin.wallet-transaction.index",
                    "admin.wallet-transaction.store",
                    "admin.wallet-transaction.show",
                    "admin.wallet-transaction.update",
                    "admin.wallet-transaction.destroy",
                    "admin.wallet-transaction.charge",
                    "admin.wallet-transaction.balance",
                ],
            },
            {
                id: 8,
                title: "برنامه نویسان",
                icon: <VscCode />,
                permissions: [
                    "admin.template.index",
                    "admin.template.store",
                    "admin.template.show",
                    "admin.template.update",
                    "admin.template.destroy",
                ],
                children: [
                    {
                        id: 81,
                        title: "قالب ها",
                        url: "/admin/template",
                        icon: <GoProjectTemplate />,
                        permissions: [
                            "admin.template.index",
                            "admin.template.store",
                            "admin.template.show",
                            "admin.template.update",
                            "admin.template.destroy",
                        ]
                    },
                    // {
                    //     id: 82,
                    //     title: "سطوح دسترسی",
                    //     url: "/admin/roles",
                    //     icon: <BiShieldQuarter />,
                    //     permissions: [
                    //         "admin.role.index",
                    //         "admin.role.store",
                    //         "admin.role.show",
                    //         "admin.role.update",
                    //         "admin.role.destroy",
                    //         "admin.role.attachUser",
                    //         "admin.role.deAttachUser",
                    //         "admin.role.attachPermission",
                    //         "admin.role.deAttachPermission",
                    //     ]
                    // },
                ]
            },
            {
                id: 3,
                title: "پنل ها",
                url: "/admin/panels",
                icon: <SiGoogleappsscript />,
                permissions: [
                    "admin.panels.index",
                    "admin.panels.store",
                    "admin.panels.show",
                    "admin.panels.update",
                    "admin.panels.destroy",
                    "admin.panels.attachUser",
                    "admin.panels.deAttachUser",
                ],
            },
            {
                id: 4,
                title: "مدیریت خطوط",
                icon: <MdOutlineDialpad />,
                permissions: [
                    "admin.line.index",
                    "admin.lineOrders",
                    "admin.changeStatusLineOrder",
                    "admin.line.store",
                    "admin.line.show",
                    "admin.line.update",
                    "admin.line.destroy",
                ],
                children: [
                    {
                        id: 40,
                        title: "مدیریت خطوط",
                        url: "/admin/lines",
                        icon: <MdOutlineSimCard />,
                        permissions: [
                            "admin.line.index",
                            "admin.lineOrders",
                            "admin.changeStatusLineOrder",
                            "admin.line.store",
                            "admin.line.show",
                            "admin.line.update",
                            "admin.line.destroy",
                        ]
                    },
                ]
            },
            {
                id: 5,
                title: "ارائه دهندگان",
                url: "/admin/providers",
                icon: <RiShakeHandsLine />,
                permissions: [
                    "admin.provider.index",
                    "admin.provider.store",
                    "admin.provider.show",
                    "admin.provider.update",
                    "admin.provider.destroy",
                ],
            },
            {
                id: 6,
                title: "تعرفه ها",
                icon: <TbDatabaseDollar />,
                permissions: [
                    "admin.provider-tariff.index",
                    "admin.provider-tariff.store",
                    "admin.provider-tariff.show",
                    "admin.provider-tariff.update",
                    "admin.provider-tariff.destroy",
                ],
                children: [
                    {
                        id: 60,
                        title: "تعرفه ارائه دهندگان",
                        url: "/admin/providerTariffs",
                        icon: <TbSettingsDollar />,
                        permissions: [
                            "admin.provider-tariff.index",
                            "admin.provider-tariff.store",
                            "admin.provider-tariff.show",
                            "admin.provider-tariff.update",
                            "admin.provider-tariff.destroy",
                        ]
                    },
                    {
                        id: 61,
                        title: "تعرفه خطوط",
                        url: "/admin/lineTariffs",
                        icon: <TbAdjustmentsDollar />,
                        permissions: [
                            "admin.line-tariff.index",
                            "admin.line-tariff.store",
                            "admin.line-tariff.show",
                            "admin.line-tariff.update",
                            "admin.line-tariff.destroy",
                        ]
                    },
                ]
            },
            {
                id: 7,
                title: "گزارشات",
                url: "/admin/reports",
                icon: <TbFileReport />,
                permissions: [
                    "admin.request-order-send.index",
                    "admin.request-order-send.store",
                    "admin.request-order-send.show",
                    "admin.request-order-send.update",
                    "admin.request-order-send.update.formData",
                    "admin.request-order-send.destroy",
                    "admin.request-order-send.confirmed",
                    "admin.request-order-send.inActive",
                    "admin.request-order-send.toActive",
                ],
            },
            {
                id: 8,
                title: "تیکت ها",
                url: "/admin/tickets",
                icon: < TbMessage2Down />,
                permissions: [
                    "admin.ticket.index",
                    "admin.ticket.store",
                    "admin.ticket.show",
                    "admin.ticket.update",
                    "admin.ticket.destroy",
                    "admin.ticket.sendAnswer",
                ],
            },
        ],
        []
    );

    const UserMenuItems = useMemo(
        () => [
            {
                id: 1,
                title: "گزارشات",
                icon: <TbReportAnalytics />,
                permissions: [
                    "panel.wallet-transaction.index",
                    "panel.wallet-transaction.show",
                    "panel.wallet-transaction.charge",
                    "panel.wallet-transaction.balance",
                    "panel.wallet-transaction.store",
                    "panel.wallet-transaction.update",
                    "panel.wallet-transaction.destroy",
                    "panel.send-messages.index",
                    "panel.send-messages.store",
                    "panel.send-messages.show",
                    "panel.send-messages.update",
                    "panel.send-messages.destroy",
                ],
                children: [
                    {
                        id: 11,
                        title: "تراکنش ها",
                        url: "/transactions",
                        icon: <RiMailSendFill />,
                        permissions: [
                            "panel.wallet-transaction.index",
                            "panel.wallet-transaction.show",
                            "panel.wallet-transaction.charge",
                            "panel.wallet-transaction.balance",
                            "panel.wallet-transaction.store",
                            "panel.wallet-transaction.update",
                            "panel.wallet-transaction.destroy",
                        ]
                    },
                    {
                        id: 12,
                        title: "تاریخچه ارسال",
                        url: "/messageHistory",
                        icon: <RiChatHistoryLine />,
                        permissions: [
                            "panel.send-messages.index",
                            "panel.send-messages.store",
                            "panel.send-messages.show",
                            "panel.send-messages.update",
                            "panel.send-messages.destroy",
                        ]
                    },
                ]
            },
            {
                id: 2,
                title: "ارسال پیامک",
                icon: <PiTelegramLogoDuotone />,
                permissions: [
                    "panel.draft-text.index",
                    "panel.draft-text.store",
                    "panel.draft-text.show",
                    "panel.draft-text.update",
                    "panel.draft-text.destroy",
                    "panel.send-messages.contact-single.index",
                    "panel.send-messages.index",
                    "panel.send-messages.store",
                    "panel.send-messages.show",
                    "panel.send-messages.update",
                    "panel.send-messages.destroy",
                ],
                children: [
                    {
                        id: 21,
                        title: "ارسال ساده",
                        url: "/send-message",
                        icon: <RiMailSendFill />,
                        permissions: [
                            "panel.send-messages.contact-single.index",
                            "panel.send-messages.index",
                            "panel.send-messages.store",
                            "panel.send-messages.show",
                            "panel.send-messages.update",
                            "panel.send-messages.destroy",
                        ]
                    },
                    {
                        id: 22,
                        title: "پیش نویس ها",
                        url: "/send-message/drafts",
                        icon: <VscCommentDraft />,
                        permissions: [
                            "panel.draft-text.index",
                            "panel.draft-text.store",
                            "panel.draft-text.show",
                            "panel.draft-text.update",
                            "panel.draft-text.destroy",
                        ]
                    },
                ]
            },
            {
                id: 6,
                title: "برنامه نویسان",
                icon: <VscCode />,
                permissions: [
                    "panel.template.index",
                    "panel.template.store",
                    "panel.template.show",
                    "panel.template.update",
                    "panel.template.destroy",
                ],
                children: [
                    {
                        id: 61,
                        title: "قالب ها",
                        url: "/template",
                        icon: <GoProjectTemplate />,
                        permissions: [
                            "panel.template.index",
                            "panel.template.store",
                            "panel.template.show",
                            "panel.template.update",
                            "panel.template.destroy",
                            "panel.keys.index",
                            "panel.keys.store",
                            "panel.keys.show",
                            "panel.keys.update",
                            "panel.keys.destroy",
                        ]
                    },
                    {
                        id: 62,
                        title: "کلید های API",
                        url: "/APIKeys",
                        icon: <TbApiApp />,
                        permissions: [
                            "panel.keys.index",
                            "panel.keys.store",
                            "panel.keys.show",
                            "panel.keys.update",
                            "panel.keys.destroy",
                        ]
                    },
                ]
            },
            {
                id: 3,
                title: "خرید شارژ",
                url: "/chargeWallet",
                icon: <BsLightningCharge />,
                permissions: [
                    "panel.wallet-transaction.charge",
                ],
            },
            {
                id: 4,
                title: "مخاطبین",
                icon: <RiContactsBook3Line />,
                permissions: [
                    "panel.contacts.index",
                    "panel.contacts.store",
                    "panel.contacts.show",
                    "panel.contacts.update",
                    "panel.contacts.destroy",
                    "panel.contact-group.index",
                    "panel.contact-group.store",
                    "panel.contact-group.show",
                    "panel.contact-group.update",
                    "panel.contact-group.destroy",
                    "panel.contact-group.attachContact",
                ],
                children: [
                    {
                        id: 41,
                        title: "مدیریت مخاطبین",
                        url: "/contacts",
                        icon: <LuUsers />,
                        permissions: [
                            "panel.contacts.index",
                            "panel.contacts.store",
                            "panel.contacts.show",
                            "panel.contacts.update",
                            "panel.contacts.destroy",
                        ]
                    },
                    {
                        id: 42,
                        title: "گروه های ارسال",
                        url: "/contactGroups",
                        icon: <MdGroups />,
                        permissions: [
                            "panel.contact-group.index",
                            "panel.contact-group.store",
                            "panel.contact-group.show",
                            "panel.contact-group.update",
                            "panel.contact-group.destroy",
                            "panel.contact-group.attachContact",
                        ]
                    },
                ]
            },
            {
                id: 5,
                title: "لیست سیاه",
                url: "/blockList",
                icon: <MdBlockFlipped />,
                permissions: [
                    "panel.block-list-phone.index",
                    "panel.block-list-phone.store",
                    "panel.block-list-phone.show",
                    "panel.block-list-phone.update",
                    "panel.block-list-phone.destroy",
                ],
            },
            {
                id: 6,
                title: "تیکت و پشتیبانی",
                url: "/tickets",
                icon: <TfiHeadphoneAlt />,
                permissions: [
                    "panel.ticket.index",
                    "panel.ticket.store",
                    "panel.ticket.show",
                    "panel.ticket.update",
                    "panel.ticket.destroy",
                    "panel.ticket.sendAnswer",
                ],
            },
        ],
        []
    );

    // تابع بازگشتی برای فیلتر کردن منوها و زیرمنوها بر اساس پرمیژن‌ها
    const filterMenuItems = (items) =>
        items?.filter((item) => {
            // بررسی پرمیژن آیتم
            const hasPermission = item?.permissions?.length > 0
                ? checkPermission(item?.permissions?.some((perm) => userPermissions?.includes(perm)))
                : false;

            // فیلتر کردن فرزندان (زیرمنوها)
            const filteredChildren = item?.children?.length
                ? filterMenuItems(item?.children)
                : [];

            // آیتم نمایش داده می‌شود اگر خودش پرمیژن داشته باشد
            return hasPermission;
        }).map((item) => ({
            ...item,
            children: item?.children?.length > 0 ? filterMenuItems(item?.children) : [],
        }));
    // فیلتر کردن آیتم‌های منو
    const filteredMenuItems = useMemo(
        () => filterMenuItems(isAdmin() ? AdminMenuItems : UserMenuItems),
        [AdminMenuItems, UserMenuItems, userPermissions]
    );

    const renderMenu = (items) =>
        items.map((item, index) => (
            <>
                <MenuItem
                    openMenu={openMenu}
                    setOpenMenu={setOpenMenu}
                    key={item.id}
                    menuItem={item}
                    isActive={index === activeIndex && (location.pathname === item.url || item.children.find(i => i.url === location.pathname) || item?.children.length > 0)}
                    activeIndex={activeIndex}
                    onClick={() =>
                        setActiveIndex(index)
                    } />
            </>
        ));

    // NOTE logout
    const { mutate: logout, isLoading: logoutLoading } = Logout({
        onSuccess: async (data) => {
            navigate("/login");
            setUserStatus(null)
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
            localStorage.removeItem("permissions");
        },
        onError: (error) => {
            console.error("Error logging in:", error);
        },
    });

    useEffect(() => {
        const findActiveIndex = (items) => {
            for (let i = 0; i < items.length; i++) {
                if (items[i].url === location.pathname) return i;

                if (items[i].children?.length) {
                    const child = items[i].children.find(
                        (c) => c.url === location.pathname
                    );
                    if (child) return i;
                }
            }
            return null;
        };

        const index = findActiveIndex(filteredMenuItems);
        if (index !== null) {
            setActiveIndex(index);
        }
    }, [location.pathname, filteredMenuItems]);

    return (
        <>
            {openMenu ? (
                <div className="relative h-fit flex flex-col gap-3 items-center pt-7 pb-8 px-6 w-full rounded-[30px] bg-main">
                    {openMenu &&
                        <div
                            onClick={() => setOpenMenu(!openMenu)}
                            className={`
                        ${rotateBtn && "rotate-90 duration-500"}
                        absolute -left-6 top-12 z-40 p-[4px] rounded-full bg-white cursor-pointer transition-all duration-75 ease-out shadow-[5px_0px_2px_rgba(0,0,0,0.18)] hover:shadow-[3px_0px_2px_rgba(0,0,0,0.22)] active:scale-95`}>
                            <div className="w-8 h-8 rounded-full bg-blue flex items-center justify-center transition-all duration-75 ease-out shadow-[inset_0_2px_4px_rgba(255,255,255,0.35)] active:shadow-[inset_0_4px_8px_rgba(0,0,0,0.3)]">
                                <img className="w-4 h-4 select-none pointer-events-none" src="../../../images/menuOpenClose.svg" alt="open and close menu" />
                            </div>
                        </div>
                    }
                    <div className="flex items-center px-3 justify-between min-h-20 w-full rounded-2xl bg-contain bg-center bg-no-repeat"
                        style={{
                            backgroundImage: "url(../../../images/menuProfile.svg)"
                        }}
                    >
                        <Avatar
                            className="!border-4 border-[#DDAF4E]"
                            sx={{ width: 57, height: 57 }}
                            alt="user image" src="../../../images/userImage.jpg" />

                        <div className="flex flex-col  items-center font-[yekan-bold]">
                            <p className="text-[0.95rem]">
                                {user?.first_name + " " + user?.last_name}
                            </p>
                            <p className="text-[0.8rem] ">
                                {user?.phone}
                            </p>
                        </div>
                        <img src="../../../images/SIMCard.svg" alt="sim card" />
                    </div>
                    {/* <img className="w-full h-12" src="../../../images/inventoryBackground.svg" alt="" /> */}
                    <div className="flex relative justify-evenly items-center w-full min-h-20 bg-contain bg-no-repeat bg-center"
                        style={{
                            backgroundImage: "url(../../../images/invertory.svg)"
                        }}
                    >
                        <IconButton
                            className="!bg-white !shadow-[0px_3px_5px_rgba(0,0,0,0.18)] -top-0 left-2 !absolute !p-[4px] !rounded-full !hover:scale-105 !active:scale-95 !transition-all !border-[1px] !border-main"
                            onClick={() => setGlobalDialog(prev => ({
                                ...prev,
                                isOpen: true,
                                contentType: "chargeWallet",
                                size: "xs"
                            }))}
                            color="info"
                            size="small"
                        >
                            <TiPlus className="text-textBase text-[0.9rem]" />
                        </IconButton>
                        <span className="flex flex-col">
                            <p className="font-[yekan-bold] text-[0.85rem] mt-2">اعتبار فعلی</p>
                        </span>
                        {
                            cashLoading ?
                                <LoadingSpinner />
                                : (<>
                                    <p className="font-[yekan-ex-bold] text-[1.1rem] mt-2">{FormattedNumber(currentCash)}</p>
                                    <img className="w-5" src="../../../images/tooman.svg" alt="" />
                                </>)
                        }
                    </div>
                    <p className="text-[#C58800]">
                        <b>Peykad</b> user panel
                    </p>
                    {/* SECTION menu items */}
                    <div className="flex flex-col gap-1 w-full text-center">
                        {renderMenu(filteredMenuItems)}
                    </div>

                    {/* SECTION logout */}
                    <div className="flex items-center gap-x-12 w-full">
                        <CustomButton
                            onClick={() => logout()}
                            loading={logoutLoading}
                            loadingPosition={!logoutLoading ? "end" : "center"}
                            disabled={logoutLoading}
                            fontSize="0.8rem"
                            bgColor="#162864"
                            className="!pl-2"
                            sx={{ borderRadius: "15px", width: "100%", color: "white", height: "43px", padding: "0px", }}
                            // endIcon={<SlPower className="text-white text-[1.3rem]" />}
                            variant="contained"
                            content={<>
                                <div className=" flex items-center !justify-end gap-2">
                                    <img className={`${logoutLoading && "opacity-75"}`} src="../../../images/logout.svg" alt="logout" />
                                    <SlPower className="text-white text-[1.3rem]" />
                                </div>
                            </>}
                        />
                        {/* <CustomButton
                            onClick={() => logout()}
                            loading={logoutLoading}
                            className={`w-full flex items-center justify-between !p-3 !border-[1px] !border-white !rounded-[15px] ${logoutLoading ? "!bg-zinc-300" : "!bg-main"}`}
                            loadingPosition="end"
                            variant={logoutLoading ? "contained" : "outlined"}
                            endIcon={<SlPower className=""/>}
                            content={<>
                                <div className="flex w-full justify-between items-center">
                                    <p className={`${logoutLoading ? "!text-white" : "text-white"} !font-[yekan-bold]`}>خروج</p>
                                </div>
                            </>}
                        /> */}
                    </div>
                </div >
            ) : (
                <div className="relative flex flex-col gap-6 items-center h-[95dvh] py-7 px-5 w-full rounded-[35px] bg-main">
                    {!openMenu &&
                        <div
                            onClick={() => setOpenMenu(!openMenu)}
                            className={`
                        ${rotateBtn && "rotate-90 duration-500"}
                        absolute -left-6 top-9 z-40 p-[4px] rounded-full bg-white cursor-pointer transition-all duration-75 ease-out shadow-[-3px_4px_2px_rgba(0,0,0,0.18)] hover:shadow-[-3px_2px_2px_rgba(0,0,0,0.22)] active:scale-95`}>
                            <div className="w-8 h-8 rounded-full bg-blue flex items-center justify-center transition-all duration-75 ease-out shadow-[inset_0_2px_4px_rgba(255,255,255,0.35)] active:shadow-[inset_0_4px_8px_rgba(0,0,0,0.3)]">
                                <img className="w-4 h-4 select-none pointer-events-none" src="../../../images/menuOpenClose.svg" alt="open and close menu" />
                            </div>
                        </div>
                    }
                    {/* SECTION profile responsive menu */}
                    <div className="border-1 rounded-[17px] border-[#FFE8B6] w-[90%] flex items-center justify-between px-3 py-1">
                        <Avatar
                            className="!border-4 border-[#DDAF4E]"
                            sx={{ width: 52, height: 52 }}
                            alt="user image" src="../../../images/userImage.jpg" />
                        <img src="../../../images/SIMCard.svg" alt="sim card" />

                    </div>
                    <div className="flex flex-col gap-3 relative px-3 py-2 pt-4 w-full min-h-23 bg-contain bg-no-repeat bg-center"
                        style={{
                            backgroundImage: "url(../../../images/invertoryResponsive.svg)"
                        }}
                    >
                        <IconButton
                            className="!bg-white !shadow-[0px_3px_5px_rgba(0,0,0,0.18)] top-1 left-2 !absolute !p-[4px] !rounded-full !hover:scale-105 !active:scale-95 !transition-all !border-[1px] !border-main"
                            onClick={() => setGlobalDialog(prev => ({
                                ...prev,
                                isOpen: true,
                                contentType: "chargeWallet",
                                size: "xs"
                            }))}
                            color="info"
                            size="small"
                        >
                            <TiPlus className="text-textBase text-[0.9rem]" />
                        </IconButton>
                        <p className="font-[yekan-bold] text-[0.8rem]">اعتبار فعلی</p>
                        <span className="flex items-center w-full justify-around">
                            <p className="font-[yekan-bold]">{FormattedNumber(currentCash)}</p>
                            <img className="w-4" src="../../../images/tooman.svg" alt="" />
                        </span>
                        {/* <span className="flex w-full justify-around">
                            <p className="text-[0.85rem] font-[yekan-bold]">5000000</p>
                            <p className="text-[0.8rem]">پیام</p>
                        </span> */}
                    </div>
                    {/* SECTION menu items */}
                    <div className="flex flex-col gap-1 w-full text-center">
                        {renderMenu(filteredMenuItems)}
                    </div>
                    {/* SECTION logout */}
                    <div className="flex items-center w-full">
                        <CustomButton
                            onClick={() => logout()}
                            loading={logoutLoading}
                            loadingPosition="end"
                            disabled={logoutLoading}
                            fontSize="0.8rem"
                            bgColor="#162864"
                            sx={{ borderRadius: "15px", width: "100%", color: "white", height: "50px" }}
                            variant="contained"
                            endIcon={<SlPower className="text-white text-[1.3rem]" />}
                            content="Logout"
                        />
                    </div>
                </div>
            )}
        </>
    )
}
export default MainMenu;
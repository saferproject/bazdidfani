const AuthLayout = ({ children }) => {
    return (
        <>
            <div className="relative h-screen">
                <div className="flex items-center justify-center h-full w-full">
                    <img className="absolute -z-10 " src="../../public/images/AuthBg.png" alt="AuthBg" />
                    {children}
                </div>
            </div>
        </>
    )
}
export default AuthLayout;
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAuthContext } from '../Context/ContextApi';
const Tostify = () => {
    const { alert, setAlert } = useAuthContext();

    const handleClose = (event, reason) => {
        setAlert(preState => ({ ...preState, open: false }))
    };
    return (
        <>
            <div>
                <Snackbar
                    open={alert?.open} onClick={() => handleClose()} autoHideDuration={4000} onClose={() => handleClose()} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <Alert
                        onClose={handleClose}
                        severity={alert?.type}
                        variant="filled"
                        sx={{ width: '100%', borderRadius: "15px", whiteSpace: "pre-line", "& .MuiAlert-root": { alignItems: "center !important" } }}
                    >
                        {alert?.message}
                    </Alert>
                </Snackbar>
            </div>
        </>
    )
}
export default Tostify;
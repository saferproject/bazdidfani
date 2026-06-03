import Router from "./Routes/Routes.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import rtlPlugin from '@mui/stylis-plugin-rtl';
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { QueryClient, QueryClientProvider } from "react-query";
import Tostify from "./Ui/Tostify.jsx";
import { AuthProvider } from "./Context/ContextApi.jsx";
// import { Provider } from "react-redux";
// import { store } from "./reduxToolkit/store";
import { faIR as faIR_ } from "@mui/x-data-grid/locales";
import LoadingDialog from "./Ui/LoadingDialog.jsx";

const App = () => {
  const cacheRTL = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const theme = createTheme({
    direction: "rtl",
    components: {
      MuiDataGrid: {
        defaultProps: {
          localeText: faIR_.components.MuiDataGrid.defaultProps.localeText,
        },
        styleOverrides: {
          root: {
            "--DataGrid-containerBackground": "#f4f5f7",
            borderRadius: "10px",
            color: "#162864",
            overflow: "hidden",
            border: "1px solid #e0e0e0",
            fontFamily: '"Yekan-bold", "Dana", "Peyda", roboto !important', // اضافه کردن !important
          },
          cell: {
            color: "#162864",
            fontWeight: "normal !important",
            fontFamily: '"Yekan-bold", "Dana", "Peyda", roboto !important', // اضافه کردن !important
            position: "relative",
            "&:not(:last-child)::after": {
              content: '""',
              position: "absolute",
              top: "50%",
              right: 0,
              height: "50%",
              borderRight: "2px solid #ddd",
              transform: "translateY(-50%)",
            },
          },
          columnHeader: {
            fontWeight: "600 !important",
            fontFamily: '"Yekan-bold", "Dana", "Peyda", roboto !important', // اضافه کردن !important
            backgroundColor: "#fafafa",
            color: "#162864",
            "&:focus": {
              outline: "none",
            },
          },
          row: {
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
            "&:not(:last-child)": {
              borderBottom: "1px solid #e0e0e0",
            },
          },
        },
      },
    },
    typography: {
      fontFamily: "Yekan",
      color: "#162864",
    },
    palette: {
      primary: {
        main: "#259FA2",
        mainDark: "#21888B",
        mainLight: "#20B9B3",
      },
      error: {
        main: "#C80930",
      },
      danger: {
        main: "#ED1844",
      },
      warning: {
        main: "#FFBE11",
      },
      disable: {
        main: "#919BB3",
      },
    },
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CacheProvider value={cacheRTL}>
            <ThemeProvider theme={theme}>
              <LoadingDialog />
              <Tostify />
              <Router />
            </ThemeProvider>
          </CacheProvider>
        </AuthProvider>
      </QueryClientProvider>    </>
  );
};

export default App;

import './App.css'
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from '@mui/stylis-plugin-rtl';
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { faIR as faIR_ } from "@mui/x-data-grid/locales";
// import LoadingDialog from "./UI/LoadingDialog.jsx";
import Tostify from "./UI/Tostify.jsx";
import Router from "./Routes/Routes.jsx";
import { AuthProvider } from './Context/ContextApi.jsx';
import { QueryClient, QueryClientProvider } from 'react-query';

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
            fontFamily: '"Yekan-bold",roboto !important', // اضافه کردن !important
          },
          cell: {
            color: "#162864",
            fontWeight: "normal !important",
            fontFamily: '"Yekan-bold", roboto !important', // اضافه کردن !important
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
            fontFamily: '"Yekan-bold",roboto !important', // اضافه کردن !important
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
      }
    },
    typography: {
      fontFamily: "Yekan",
      color: "#162864"
    },
    palette: {
      primary: {
        main: "#FDC13C",
        light: "#FEECC5"
      },
      secondary: {
        main: "#175CF0"
      }, error: {
        main: "#C80930",
      }, danger: {
        main: "#E16037"
      }, warning: {
        main: "#FFBE11",
      }, disable: {
        main: "#919BB3",
      }, info: {
        main: "#61C4FF",
      },green: {
        main: "#4caf50",
        light: "#81c784",
        dark: "#388e3c"
      }
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
              {/* <LoadingDialog /> */}
              <Tostify />
              <Router />
            </ThemeProvider>
          </CacheProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  )
}

export default App;

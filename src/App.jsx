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
            fontFamily: '"Yekan Bakh FaNum",roboto !important', // اضافه کردن !important
          },
          cell: {
            color: "#162864",
            fontWeight: "normal !important",
            fontFamily: '"Yekan Bakh FaNum", roboto !important', // اضافه کردن !important
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
            fontFamily: '"Yekan Bakh FaNum",roboto !important', // اضافه کردن !important
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
      fontFamily: "Yekan Bakh FaNum",
      color: "#162864"
    },
    palette: {
      primary: {
        light: "#30eca5",
        main: "#00eb93",
        dark: "#00be77",
      },
      secondary: {
        light: "#79716B",
        main: "#57534D",
        contrastText: "#fff",
      },

      info: {
        light: "#AEBCD3",
        main: "#8DA2C6",
        dark: "#7474C1",
        contrastText: "#fff",
      },
      text: {
        disabled: "#9da6ad",
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

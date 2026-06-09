import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { Pagination } from "@mui/material";
import noDataImg from "../../public/images/nodata.svg";
import { checkPermission } from "../Helpers/CheckPermission";

const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& .no-results-primary": {
    fill: "#3D4751",
    ...theme.applyStyles("light", {
      fill: "#AEB8C2",
    }),
  },
  "& .no-results-secondary": {
    fill: "#1D2126",
    ...theme.applyStyles("light", {
      fill: "#E8EAED",
    }),
  },
}));

function CustomNoResultsOverlay() {
  return (
    <StyledGridOverlay>
      <img src={noDataImg} width={350} height={350} alt="no data" />
      {/* <p>sssss</p> */}
    </StyledGridOverlay>
  );
}

const CustomDataGrid = ({
  rowsData = [],
  columnsData = [],
  loading = false,
  pagination,
  hasPermission,
  maxHeight = "",
  minHeight = loading ? "100px" : "auto",
  height = "h-[600px]",
  autoHeight = false,  // ✅ اضافه کن
  StyledDataGrid = "",
  className = "",
  sx = {},
  ...others
}) => {
  return checkPermission(hasPermission) ? (
    <div className="">
      <div

      >
        {StyledDataGrid ? (
          <StyledDataGrid
            slotProps={{
              loadingOverlay: {
                variant: "skeleton",
                noRowsVariant: "skeleton",
              },
            }}
            slots={{
              noRowsOverlay: CustomNoResultsOverlay,
              noResultsOverlay: CustomNoResultsOverlay,
            }}
            sx={{

              "& .MuiDataGrid-virtualScroller": {
                overflow: "auto",
                ...(maxHeight ? { maxHeight: `${maxHeight} !important` } : {}),
                ...(minHeight ? { minHeight: `${minHeight} !important` } : {}),
              },
              ...sx,
            }}
            rowCount={300}
            pageSizeOptions={300}
            className={className}
            rows={rowsData}
            columns={columnsData}
            paginationMode="server"
            hideFooterPagination={true}
            disableRowSelectionOnClick
            hideFooter
            loading={loading}
            autoHeight={autoHeight}
            {...others}
          />
        ) : (
          <DataGrid
            slotProps={{
              loadingOverlay: {
                variant: "skeleton",
                noRowsVariant: "skeleton",
              },
            }}
            slots={{
              noRowsOverlay: CustomNoResultsOverlay,
              noResultsOverlay: CustomNoResultsOverlay,
            }}
            sx={{
              fontSize: '13px',
              ".MuiDataGrid-virtualScroller": {
                overflow: "auto",
                ...(maxHeight ? { maxHeight: `${maxHeight} !important` } : {}),
                ...(minHeight ? { minHeight: `${minHeight} !important` } : {}),
              },
              ...sx,
            }}
            className={className}
            rows={rowsData}
            columns={columnsData}
            hideFooterPagination={true}
            disableRowSelectionOnClick
            hideFooter
            loading={loading}
            paginationMode="server"
            
            autoHeight={autoHeight}  // ✅ اضافه کن
            {...others}
          />
        )}
      </div>
      {pagination?.isPresent && (
        <Pagination
          shape="rounded"
          size="medium"
          className="my-4 !mr-auto w-fit"
          count={pagination?.lastPage}
          color="secondary"
          onChange={pagination.pageChangeHandler}
          page={pagination.page}
          sx={{
            '& .MuiPaginationItem-root': {
              borderRadius: '10px',
              fontSize: "16px",

            },
            // استایل برای صفحات غیرفعال (که انتخاب نشدن)
            '& .MuiPaginationItem-page:not(.Mui-selected)': {
              backgroundColor: '#f5f5f5', // پس زمینه
              border: '1px solid #e0e0e0', // بوردر
              color: '#132357', // رنگ فونت
              fontFamily: "yekan-bold",
              fontSize: "16px",
            },
            // هاور برای صفحات غیرفعال
            '& .MuiPaginationItem-page:not(.Mui-selected):hover': {
              backgroundColor: '#e8e8e8',
            },
          }}
        />
      )}
    </div>
  ) : null;
};

export default CustomDataGrid;
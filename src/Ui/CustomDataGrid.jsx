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
              noResultsOverlay: CustomNoResultsOverlay,
            }}
            sx={{
              fontSize: '12px',
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
          variant="outlined"
          className="my-3 !mx-auto w-fit"
          count={pagination?.lastPage}
          color="primary"
          onChange={pagination.pageChangeHandler}
          page={pagination.page}
        />
      )}
    </div>
  ) : null;
};

export default CustomDataGrid;
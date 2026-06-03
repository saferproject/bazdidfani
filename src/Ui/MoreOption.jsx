import { Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
// import { useAuthContext } from "../../../context/UserContext";
const MoreOption = ({
  moreOptionItems,
  setOpen,
  setId,
  id,
  editComponentId,
  componentToShow,
  setSelectedItem,
  userStatus,
  showDeleteButton = true,
}) => {
  // const { setUserStatus } = useAuthContext();
  return (
    <div className="!flex !flex-col !justify-start overflow-hidden !w-[210px] ">
      {moreOptionItems?.length ? (
        <>
          {moreOptionItems?.map((item, index) =>
            item?.hasPermission ? (
              <Button
                key={index}
                onClick={() => {
                  item.onClick();
                }}
                disabled={item?.disabled}
                className="!p-3 !font-bold !flex !justify-between"
                endIcon={item?.icon}
                color={item?.color}
              >
                {item?.name}
              </Button>
            ) : null
          )}
          <hr />
        </>
      ) : (
        <>
          {!!showDeleteButton && (
            <>
              <Button
                onClick={() => {
                  setId(id);
                  // setUserStatus(userStatus);
                }}
                className="!p-3 !font-bold !flex !justify-between"
                endIcon={<ClearIcon className="!text-[25px]" />}
                color="error"
              >
                حذف
              </Button>
              <hr />
            </>
          )}

          {!!editComponentId && (
            <>
              <Button
                onClick={() => {
                  setId(editComponentId);
                }}
                className={`!p-3 !font-bold !text-black !flex !justify-between`}
                endIcon={<ModeEditIcon />}
              >
                ویرایش
              </Button>
              <hr />
            </>
          )}
          {!!componentToShow && (
            <>
              <Button
                onClick={() => {
                  setId(componentToShow?.id);
                }}
                disabled={componentToShow?.disabled}
                className={`!p-3 !font-bold !flex !justify-between`}
                sx={{
                  color: componentToShow?.color
                    ? componentToShow?.color
                    : "#000",
                }}
              >
                {componentToShow?.name}
              </Button>
              <hr />
            </>
          )}

          <Button
            onClick={() => {
              setOpen(false);
              setSelectedItem && setSelectedItem({});
            }}
            className={`!p-3 !font-bold !text-black !flex !justify-between`}
            endIcon={<ArrowBackIosNewIcon />}
          >
            بازگشت
          </Button>
        </>
      )}
    </div>
  );
};

export default MoreOption;

import { useTheme } from "@emotion/react";
import { ThreeDots } from "react-loader-spinner";

const LoadingSpinner = ({
  height = "25px",
  width = "30px",
}) => {
  const theme = useTheme();
  return (
    <ThreeDots
      color={theme?.palette?.disable.main}
      height={height}
      width={width}
      radius={9}
      wrapperStyle={{
        display: "flex",
        justifyContent: "center",
      }}
      visible={true}
    />
  );
};

export default LoadingSpinner;

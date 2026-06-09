import { useRef, useState, useEffect } from "react";
import { Box, Alert, Modal, CircularProgress } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { GrCloudUpload } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import { LuFullscreen } from "react-icons/lu";
// import { DeleteImage } from "../API/EndPoints/ShareAPI";

const UploadImage = ({
  onUploadSuccess,
  onUploadError,
  onRemove,
  disabled = false,
  className,
  invalidKey,
  imageData,
  size = 120, // 🆕 سایز دایره (پیش‌فرض)
  imageRadius = "50%", // 🆕 نوع برش تصویر (دایره یا مربع)
}) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 📌 اگر تصویر از props (مثلاً از سرور) بیاد، نمایش بده
  // useEffect(() => {
  //   if (imageData?.image) {
  //     setPreviewUrl(imageData.image);
  //   }
  // }, [imageData]);
  useEffect(() => {
    // اگر فایل بود
    if (imageData instanceof File) {
      const url = URL.createObjectURL(imageData);
      setPreviewUrl(url);

      return () => URL.revokeObjectURL(url);
    }

    // اگر string (url) بود
    if (typeof imageData === "string") {
      setPreviewUrl(imageData);
    }

    // اگر از سرور با ساختار قبلی اومده بود
    if (imageData?.image) {
      setPreviewUrl(imageData.image);
    }
  }, [imageData]);


  // 📦 آپلود فایل
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setError("");

    if (file) {
      if (file.size > 16 * 1024 * 1024) {
        setError("حجم فایل نباید بیشتر از 16 مگابایت باشد");
        return;
      }

      const allowedTypes = [
        "image/png",
        "image/svg+xml",
        "image/jpeg",
        "image/jpg",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        setError("فرمت فایل مجاز نیست. فقط PNG, SVG, JPG, WEBP مجاز هستند");
        return;
      }

      const url = URL.createObjectURL(file);
      setSelectedFile(file);
      setPreviewUrl(url);

      // ✅ بدون تأخیر، بلافاصله ارسال کن
      if (onUploadSuccess) {
        onUploadSuccess(file, { body: { url } });
      }
    }

    event.target.value = "";
  };

  // 📥 درگ و دراپ فایل
  const handleDrop = (event) => {
    if (disabled === false) {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      if (file) handleFileSelect({ target: { files: [file] } });
    }
  };

  const handleDragOver = (event) => {
    if (disabled === false) {
      event.preventDefault();
    }
  }
  const handleClick = () => {
    if (disabled === false) {
      fileInputRef.current?.click();
    }
  }

  // ❌ حذف تصویر
  // const { mutate: deleteImage, isLoading: deleteImageLoading } = DeleteImage({
  //   id: imageData?.id,
  //   invalidKey: invalidKey,
  // });

  const handleRemoveImage = (event) => {
    event.stopPropagation();
    // if (imageData?.id) {
    //   deleteImage();
    // }
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (onRemove) onRemove();
  };

  // 🔍 بزرگ‌نمایی تصویر
  const handleZoomImage = (event) => {
    event.stopPropagation();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  // ⚙️ مقادیر دینامیک بر اساس سایز
  const uploadIconSize = Math.max(16, size * 0.12); // سایز آیکون ابر
  const badgeSize = Math.max(24, size * 0.25); // اندازه دایره‌ی زرد
  const badgeOffset = size * 0.3; // فاصله از لبه (راست و بالا)

  return (
    <>
      <Box
        className={`border-[0.13rem] border-zinc-200 border-dashed relative z-0 ${className}`}
        sx={{
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor: "transparent",
          textAlign: "center",
          cursor: "pointer",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s ease-in-out",
          ...(!disabled && {
            "&:hover": {
              backgroundColor: "rgba(122,135,178,0.05)",
              borderColor: "#5E6FA9",
            },
          }),
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept=".png,.svg,.jpg,.jpeg,.webp"
          style={{ display: "none" }}
        />

        {error && (
          <Alert
            severity="error"
            sx={{
              position: "absolute",
              bottom: -40,
              fontFamily: "yekan",
              width: "100%",
            }}
          >
            {error}
          </Alert>
        )}

        {previewUrl ? (
          <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
            {/* تصویر اصلی */}
            <Box
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: imageRadius,
                overflow: "hidden",
              }}
            >
              <img
                src={previewUrl}
                alt="پیش‌نمایش آواتار"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>

            {/* دکمه‌ها روی تصویر */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                borderRadius: imageRadius,
                backgroundColor: "rgba(0,0,0,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                opacity: 0,
                transition: "opacity 0.3s ease",
                "&:hover": { opacity: 1 },
              }}
            >
              {/* بزرگ‌نمایی */}
              <Box
                onClick={handleZoomImage}
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                    transform: "scale(1.1)",
                  },
                }}
              >
                <LuFullscreen size={18} />
              </Box>

              {/* حذف */}
              {!disabled && (
                <Box
                  onClick={ handleRemoveImage }
                  sx={{
                    backgroundColor: "error.main",
                    color: "white",
                    borderRadius: "50%",
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "rgba(0,0,0,0.5)",
                      transform: "none",
                    },
                  }}
                >
                
                    <MdDelete size={18} />
                
                </Box>
              )}
            </Box>
          </Box>
        ) : (
          !error && (
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="../../images/CloudUpload.svg"
                alt=""
                style={{ width: size * 0.5, height: "auto" }}
              />
              {/* 🆕 دکمه آپلود شناور دینامیک */}
              <span
                className="bg-main rounded-full shadow-md absolute z-10 flex items-center justify-center"
                style={{
                  width: badgeSize,
                  height: badgeSize,
                  right: -badgeOffset,
                  top: badgeOffset * 1.2,
                }}
              >
                <GrCloudUpload
                  style={{
                    fontSize: uploadIconSize,
                    color: "#000",
                  }}
                />
              </span>
            </Box>
          )
        )}
      </Box>

      {/* 🔍 مدال نمایش تصویر بزرگ */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(4px)",
        }}
      >
        <Box sx={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh" }}>
          <Box
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              top: -40,
              left: 0,
              backgroundColor: "#259FA2",
              color: "white",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#FFBE11",
                // color: "#FFBE11",
              },
            }}
          >
            <IoClose size={20} />
          </Box>

          {previewUrl && (
            <img
              src={previewUrl}
              alt="تصویر بزرگ شده"
              style={{
                maxWidth: "100%",
                maxHeight: "90vh",
                borderRadius: "12px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              }}
            />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default UploadImage;

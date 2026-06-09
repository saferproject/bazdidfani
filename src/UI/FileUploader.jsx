import { useRef, useState, useEffect } from "react";
import { Box, Alert, Modal, Typography } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { LuFullscreen } from "react-icons/lu";
import { BsFilePdf, BsFileEarmarkExcel, BsFileText } from "react-icons/bs";
import CloudUpload from "../../public/images/CloudUpload.svg";
import { useAuthContext } from "../Context/ContextApi";

const FileUploader = ({
    onUploadSuccess,
    onUploadError,
    onRemove,
    className,
    accept = ".png,.svg,.jpg,.jpeg,.webp,.pdf,.xls,.xlsx,.txt",
    // allowedTypes = [
    //     "image/png",
    //     "image/svg+xml",
    //     "image/jpeg",
    //     "image/jpg",
    //     "image/webp",
    //     "application/pdf",
    //     "application/vnd.ms-excel", // .xls
    //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    //     "text/plain", // .txt
    //     "text/csv",
    // ],
    invalidKey,
    imageData,
    maxHeight,
    size,
    placeholder,
    value,
}) => {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [fileType, setFileType] = useState(null); // 'image', 'pdf', 'excel', 'text'
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { setAlert } = useAuthContext();

    // تشخیص نوع فایل برای نمایش آیکون مناسب
    const isExcelType = (type) =>
        type === "application/vnd.ms-excel" ||
        type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    const isTextType = (type) =>
        type === "text/plain" ||
        type === "text/csv";

    const baseURL = JSON.parse(localStorage.getItem("baseUrl"))?.url;

    useEffect(() => {
        if (imageData?.image) {
            setPreviewUrl(`${baseURL}/${imageData.image}`);
            if (imageData?.image_type === "pdf") {
                setFileType('pdf');
            } else if (isExcelType(imageData?.image_type)) {
                setFileType('excel');
            } else if (isTextType(imageData?.image_type)) {
                setFileType('text');
            } else {
                setFileType('image');
            }
        }
    }, [imageData]);

    // useEffect(() => {
    //     if (value && value !== selectedFile && value !== previewUrl) {
    //         if (typeof value === 'object' && value?.file) {
    //             setSelectedFile(value.file);
    //             setPreviewUrl(URL.createObjectURL(value.file));
    //             if (value.file.type === 'application/pdf') {
    //                 setFileType('pdf');
    //             } else if (isExcelType(value.file.type)) {
    //                 setFileType('excel');
    //             } else if (isTextType(value.file.type)) {
    //                 setFileType('text');
    //             } else {
    //                 setFileType('image');
    //             }
    //         }
    //         else if (typeof value === 'string') {
    //             setPreviewUrl(value);
    //             setSelectedFile(null);
    //             if (value.match(/\.(pdf)$/i)) setFileType('pdf');
    //             else if (value.match(/\.(xls|xlsx)$/i)) setFileType('excel');
    //             else if (value.match(/\.(txt|csv)$/i)) setFileType('text');
    //             else setFileType('image');
    //         }
    //     }
    // }, [value]);

    useEffect(() => {
        if (!value) return;

        // اگر خود File object بود
        if (value instanceof File) {
            setSelectedFile(value);

            const url = URL.createObjectURL(value);
            setPreviewUrl(url);

            if (value.type === "application/pdf") {
                setFileType("pdf");
            } else if (isExcelType(value.type)) {
                setFileType("excel");
            } else if (isTextType(value.type)) {
                setFileType("text");
            } else {
                setFileType("image");
            }
        }

        // اگر آبجکت شامل file بود
        else if (typeof value === "object" && value?.file) {
            setSelectedFile(value.file);

            const url = URL.createObjectURL(value.file);
            setPreviewUrl(url);

            if (value.file.type === "application/pdf") {
                setFileType("pdf");
            } else if (isExcelType(value.file.type)) {
                setFileType("excel");
            } else if (isTextType(value.file.type)) {
                setFileType("text");
            } else {
                setFileType("image");
            }
        }

        // اگر string بود (url)
        else if (typeof value === "string") {
            setPreviewUrl(value);
            setSelectedFile(null);

            if (value.match(/\.(pdf)$/i)) {
                setFileType("pdf");
            } else if (value.match(/\.(xls|xlsx)$/i)) {
                setFileType("excel");
            } else if (value.match(/\.(txt|csv)$/i)) {
                setFileType("text");
            } else {
                setFileType("image");
            }
        }
    }, [value]);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileExtension = "." + file.name.split(".").pop().toLowerCase();
            const acceptedExtensions = accept
                .split(",")
                .map(item => item.trim().toLowerCase());

            if (!acceptedExtensions.includes(fileExtension)) {
                setAlert({
                    message: "فرمت فایل مجاز نیست.",
                    open: true,
                    type: "warning"
                });
                return;
            }
            const url = URL.createObjectURL(file);
            setSelectedFile(file);
            setPreviewUrl(url);

            // تعیین نوع فایل
            if (file.type === 'application/pdf') {
                setFileType('pdf');
            } else if (isExcelType(file.type)) {
                setFileType('excel');
            } else if (isTextType(file.type)) {
                setFileType('text');
            } else {
                setFileType('image');
            }

            if (onUploadSuccess) {
                onUploadSuccess(file, { body: { url } });
            }
        }
        event.target.value = "";
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) handleFileSelect({ target: { files: [file] } });
    };

    const handleDragOver = (event) => event.preventDefault();
    const handleClick = () => fileInputRef.current?.click();

    const handleRemoveImage = (event) => {
        event.stopPropagation();
        if (imageData?.id) {
            // deleteImage();
        }
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setSelectedFile(null);
        setPreviewUrl(null);
        setFileType(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        if (onRemove) onRemove();
    };

    const handleZoomFile = (event) => {
        event.stopPropagation();
        setIsModalOpen(true);
    };

    const handleCloseModal = () => setIsModalOpen(false);

    // فرمت کردن حجم فایل
    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <>
            <Box
                className={`border-[1px] border-zinc-300 border-dashed relative z-0 ${className}`}
                sx={{
                    borderRadius: "10px",
                    backgroundColor: "transparent",
                    textAlign: "center",
                    cursor: "pointer",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                        backgroundColor: "rgba(122,135,178,0.05)",
                        borderColor: "#5E6FA9",
                    },
                }}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={handleClick}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept={accept}
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
                        <Box
                            sx={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "20px",
                                overflow: "hidden",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: (fileType === 'pdf' || fileType === 'excel' || fileType === 'text') ? "#f9f9f9" : "transparent",
                            }}
                        >
                            {/* 1. نمایش PDF */}
                            {fileType === 'pdf' && (
                                <Box sx={{ textAlign: "center" }}>
                                    <BsFilePdf size={60} color="#d32f2f" />
                                    <Box sx={{ mt: 1, fontSize: "0.875rem", color: "#666", fontWeight: 500 }}>
                                        فایل PDF
                                    </Box>
                                    <Box sx={{ fontSize: "0.75rem", color: "#999" }}>
                                        {selectedFile?.name}
                                    </Box>
                                </Box>
                            )}

                            {/* 2. نمایش اکسل */}
                            {fileType === 'excel' && (
                                <Box sx={{ textAlign: "center", p: 2 }}>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#e8f5e9',
                                        borderRadius: '50%',
                                        width: '80px',
                                        height: '80px',
                                        margin: '0 auto 10px'
                                    }}>
                                        <BsFileEarmarkExcel size={40} color="#2e7d32" />
                                    </Box>
                                    <Box sx={{
                                        fontSize: "0.85rem",
                                        color: "#333",
                                        fontWeight: 600,
                                        maxWidth: '90%',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        margin: '0 auto 4px'
                                    }}>
                                        {selectedFile?.name}
                                    </Box>
                                    <Box sx={{ fontSize: "0.75rem", color: "#777" }}>
                                        {formatFileSize(selectedFile?.size)}
                                    </Box>
                                </Box>
                            )}

                            {/* 3. نمایش فایل متنی (TXT) */}
                            {fileType === 'text' && (
                                <Box sx={{ textAlign: "center", p: 2 }}>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#e3f2fd',
                                        borderRadius: '50%',
                                        width: '80px',
                                        height: '80px',
                                        margin: '0 auto 10px'
                                    }}>
                                        <BsFileText size={40} color="#1976d2" />
                                    </Box>
                                    <Box sx={{
                                        fontSize: "0.85rem",
                                        color: "#333",
                                        fontWeight: 600,
                                        maxWidth: '90%',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        margin: '0 auto 4px'
                                    }}>
                                        {selectedFile?.name}
                                    </Box>
                                    <Box sx={{ fontSize: "0.75rem", color: "#777" }}>
                                        {formatFileSize(selectedFile?.size)}
                                    </Box>
                                </Box>
                            )}

                            {/* 4. نمایش تصویر */}
                            {fileType === 'image' && (
                                <img
                                    src={previewUrl}
                                    alt="پیش‌نمایش"
                                    style={{
                                        width: "100%",
                                        maxHeight: maxHeight ? maxHeight : "100%",
                                        objectFit: "cover",
                                        backgroundColor: "#f0f0f0"
                                    }}
                                />
                            )}
                        </Box>

                        {/* دکمه‌ها روی فایل (فقط زمانی که هاور می‌شود یا روی موبایل کلیک می‌شود) */}
                        <Box
                            sx={{
                                position: "absolute",
                                inset: 0,
                                borderRadius: "20px", // هماهنگ با radius باکس بالا
                                backgroundColor: "rgba(0,0,0,0.3)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 1,
                                opacity: 0,
                                transition: "opacity 0.3s ease",
                                "&:hover": { opacity: 1 },
                                // برای موبایل همیشه نمایش داده شود اگر نیاز دارید خط زیر را فعال کنید:
                                // "@media (hover: none)": { opacity: 1 }
                            }}
                        >
                            {/* بزرگ‌نمایی/مشاهده */}
                            {fileType === "pdf" || fileType === "image" && (
                                <Box
                                    onClick={handleZoomFile}
                                    sx={{
                                        backgroundColor: "primary.main",
                                        color: "white",
                                        borderRadius: "50%",
                                        width: "36px",
                                        height: "36px",
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
                            )}
                            {/* حذف */}
                            <Box
                                onClick={handleRemoveImage}
                                sx={{
                                    backgroundColor: "error.main",
                                    color: "white",
                                    borderRadius: "50%",
                                    width: "36px",
                                    height: "36px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                        backgroundColor: "error.dark",
                                        transform: "scale(1.1)",
                                    },
                                }}
                            >
                                <MdDelete size={18} />
                            </Box>
                        </Box>
                    </Box>
                ) :
                    value && typeof value === 'string' ? (
                        <Box sx={{ p: 2, color: 'green' }}>
                            فایل قبلاً آپلود شده است: {value.split('/').pop()}
                        </Box>
                    ) : (
                        !error && (placeholder ? placeholder : (
                            <Box sx={{ p: 2 }}>
                                {placeholder ? placeholder : <img src={CloudUpload} alt="upload" style={{ width: "100%", height: "auto" }} />}
                            </Box>
                        ))
                    )}
            </Box>

            {/* مدال نمایش فایل */}
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
                <Box sx={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh", bgcolor: "white", borderRadius: 2, p: 2 }}>
                    <Box
                        onClick={handleCloseModal}
                        sx={{
                            position: "absolute",
                            top: -45,
                            left: 0,
                            backgroundColor: "#FDC13C",
                            color: "white",
                            borderRadius: "50%",
                            width: "36px",
                            height: "36px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            "&:hover": {
                                backgroundColor: "#FDC13C",
                                color: "#175CF0",
                            },
                        }}
                    >
                        <IoClose size={20} />
                    </Box>

                    <Box sx={{ textAlign: "center" }}>
                        {fileType === 'pdf' ? (
                            <iframe
                                src={previewUrl}
                                style={{ width: "80vw", height: "80vh", border: "none" }}
                            />
                        ) : fileType === 'image' ? (
                            <img
                                src={previewUrl}
                                alt="تصویر بزرگ شده"
                                style={{ maxWidth: "80vw", maxHeight: "80vh", borderRadius: "8px" }}
                            />
                        ) : (
                            // نمایش نام فایل برای اکسل و متنی در مدال
                            <Box sx={{ p: 4 }}>
                                <Box sx={{ mb: 2 }}>
                                    {fileType === 'excel' ? <BsFileEarmarkExcel size={80} color="#2e7d32" /> : <BsFileText size={80} color="#1976d2" />}
                                </Box>
                                <Typography variant="h6" sx={{ mb: 1 }}>{selectedFile?.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    حجم: {formatFileSize(selectedFile?.size)}
                                </Typography>
                                <Typography variant="caption" display="block" sx={{ mt: 2, color: 'gray' }}>
                                    برای مشاهده جزئیات، فایل را دانلود کنید.
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default FileUploader;
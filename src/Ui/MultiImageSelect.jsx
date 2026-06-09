import { useRef, useState, useEffect } from "react";
import { Alert, Modal, IconButton, CircularProgress, Box } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { LuFullscreen } from "react-icons/lu";
import { TiPlus } from "react-icons/ti";
import { DeleteImage } from "../API/EndPoints/ShareAPI";

const MultiImageSelect = ({
    value = [],
    onChange,
    maxImages = 15,
    invalidKey,
}) => {
    const fileInputRef = useRef(null);
    const [error, setError] = useState("");
    const [previewImage, setPreviewImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageIndex, setImageIndex] = useState(null);
    const [selectedImageId, setSelectedImageId] = useState(null)

    // NOTE delete image
    const { mutate: deleteImage, isLoading: deleteImageLoading } = DeleteImage({
        id: selectedImageId,
        invalidKey: invalidKey,
        onSuccess: () => {
            const imageToRemove = value[imageIndex];
            if (imageToRemove.preview) {
                URL.revokeObjectURL(imageToRemove.preview);
            }
            const updatedImages = value.filter((_, i) => i !== imageIndex);
            onChange(updatedImages); // 👈 به react-hook-form بده
            setImageIndex(null);
        }
    });

    useEffect(() => {
        if (selectedImageId) {
            deleteImage()
        }
    }, [selectedImageId])

    // 📦 آپلود فایل
    const handleFileSelect = (event) => {
        const files = Array.from(event.target.files);
        setError("");

        if (value.length + files.length > maxImages) {
            setError(`حداکثر ${maxImages} تصویر مجاز است`);
            return;
        }

        const newImages = [];

        for (let file of files) {
            if (file.size > 16 * 1024 * 1024) {
                setError("حجم هر فایل نباید بیشتر از 16 مگابایت باشد");
                continue;
            }

            const allowedTypes = ["image/png", "image/svg+xml", "image/jpeg", "image/jpg", "image/webp"];
            if (!allowedTypes.includes(file.type)) {
                setError("فرمت فایل مجاز نیست. فقط PNG, SVG, JPG, WEBP مجاز هستند");
                continue;
            }

            const url = URL.createObjectURL(file);
            newImages.push({
                file, // 👈 فایل اصلی
                preview: url, // 👈 برای نمایش
                id: Date.now() + Math.random(),
            });
        }

        if (newImages.length > 0) {
            onChange([...value, ...newImages]); // 👈 به react-hook-form بده
        }

        event.target.value = "";
    };

    // 📥 درگ و دراپ
    const handleDrop = (event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect({ target: { files } });
        }
    };

    const handleDragOver = (event) => event.preventDefault();
    const handleAddImage = () => fileInputRef.current?.click();

    // ❌ حذف تصویر
    const handleRemoveImage = (index, imageId) => {
        const image = value[index];

        if (image.file) {
            const newImages = value.filter((_, i) => i !== index);
            onChange(newImages);
            return; // دیگه API نزن
        }

        setSelectedImageId(imageId);
        setImageIndex(index);
    };


    // 🔍 بزرگ‌نمایی
    const handleZoomImage = (image) => {
        setPreviewImage(image);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setPreviewImage(null);
    };

    return (
        <>
            <div
                className="flex flex-col gap-5 border-[1px] p-7 border-zinc-300 border-dashed rounded-[17px]"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img className="w-6 h-6" src="../../images/imageUpload.svg" alt="upload image of product" />
                        <h3 className="text-baseText font-[yekan-bold] text-[0.95rem]">تصاویر شاخص محصول</h3>
                    </div>
                    <IconButton
                        disabled={value.length >= maxImages}
                        onClick={handleAddImage}
                        className="!bg-warning !p-[9px] !rounded-[15px] !hover:scale-105 !active:scale-95 !transition-all !text-baseText"
                        color="info"
                        size="small"
                    >
                        <TiPlus className="text-baseText text-[1.1rem]" />
                    </IconButton>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        accept=".png,.svg,.jpg,.jpeg,.webp"
                        multiple
                        style={{ display: "none" }}
                    />
                </div>

                {error && (
                    <Alert severity="error" onClose={() => setError("")}>
                        {error}
                    </Alert>
                )}

                <div className="grid grid-cols-5 gap-6">
                    {value.map((image, index) => (
                        <div
                            key={image.id || index}
                            className="relative rounded-xl w-[5rem] h-[5rem] bg-contain bg-center bg-no-repeat hover:scale-105 active:scale-95 duration-200 transition-all cursor-pointer"
                            style={{
                                backgroundImage: `url("${image.preview || image.image}")`,
                                backgroundSize: "cover",
                            }}
                        >
                            {/* Overlay */}
                            <div className="absolute inset-0 rounded-xl bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                                {/* بزرگنمایی */}
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleZoomImage(image);
                                    }}
                                    className="w-7 h-7 bg-main rounded-full flex items-center justify-center cursor-pointer hover:bg-mainDark hover:scale-110 transition-all"
                                >
                                    <LuFullscreen size={14} color="white" />
                                </div>

                                {/* حذف */}
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveImage(index, image.id);
                                    }}
                                    className="w-7 h-7 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 hover:scale-110 transition-all"
                                >
                                    {deleteImageLoading ? (
                                        <CircularProgress size={14} thickness={5} sx={{ color: "white" }} />
                                    ) : (
                                        <MdDelete size={14} color="white" />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {value.length < maxImages && (
                        <div
                            onClick={handleAddImage}
                            className="w-[5rem] h-[5rem] bg-contain bg-no-repeat hover:scale-105 active:scale-95 duration-200 transition-all cursor-pointer"
                            style={{
                                backgroundImage: 'url("../../public/images/imageUploader2.png")',
                            }}
                        >
                            <p className="mr-2 text-zinc-400 font-bold">{value.length + 1}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* مدال بزرگنمایی - بدون تغییر */}
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
                            backgroundColor: "#7b291e",
                            color: "white",
                            borderRadius: "50%",
                            width: "36px",
                            height: "36px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            "&:hover": {
                                backgroundColor: "#FFF0C4",
                                color: "#7b291e",
                            },
                        }}
                    >
                        <IoClose size={20} />
                    </Box>

                    {previewImage && (
                        <img
                            src={previewImage.preview || previewImage.image}
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

export default MultiImageSelect;
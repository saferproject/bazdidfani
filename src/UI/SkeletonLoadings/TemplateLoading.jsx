import { Skeleton, Divider } from "@mui/material";

const TemplateSkeleton = () => {
    return (
        <div className="flex flex-col gap-7">
            {/* Alert */}
            <Skeleton
                variant="rounded"
                height={60}
                animation="wave"
            />

            {/* Title */}
            <Skeleton
                variant="text"
                width={180}
                height={40}
                animation="wave"
            />

            <div className="grid grid-cols-12 gap-8">
                {/* Right Section */}
                <div className="xl:col-span-8 col-span-12 flex flex-col gap-5">
                    {/* Name Input */}
                    <Skeleton
                        variant="rounded"
                        height={60}
                        animation="wave"
                    />

                    {/* Text Input */}
                    <Skeleton
                        variant="rounded"
                        height={180}
                        animation="wave"
                    />

                    {/* Variables Box */}
                    <div className="border border-zinc-200 rounded-2xl p-4">
                        <div className="flex items-center gap-4 mb-5">
                            <Skeleton
                                variant="text"
                                width={180}
                                height={35}
                            />
                            <Skeleton
                                variant="circular"
                                width={25}
                                height={25}
                            />
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <Skeleton
                                    key={item}
                                    variant="rounded"
                                    width={140}
                                    height={45}
                                    animation="wave"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Left Section */}
                <div className="xl:col-span-4 col-span-12 border border-zinc-200 rounded-2xl p-4">
                    <Skeleton
                        variant="text"
                        width={150}
                        height={35}
                    />

                    <Divider className="!my-3" />

                    <div className="flex flex-wrap gap-2">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                            <Skeleton
                                key={item}
                                variant="rounded"
                                width={110}
                                height={40}
                                animation="wave"
                            />
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="col-span-12">
                    <Skeleton
                        variant="rounded"
                        width={240}
                        height={60}
                        animation="wave"
                    />
                </div>
            </div>
        </div>
    );
};

export default TemplateSkeleton;
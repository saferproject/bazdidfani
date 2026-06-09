import { Skeleton, } from '@mui/material';

const DraftsListSkeleton = () => {
    const skeletonItems = [1, 2, 3];

    return (
        <div className="flex flex-col gap-2">
            {skeletonItems.map((_, index) => (
                <div
                    key={index}
                    className="grid grid-cols-12 items-center w-full justify-between p-3 rounded-[5px] border border-zinc-100 gap-2"
                >
                    {/* ستون نام (# و نام پیش‌نویس) */}
                    <div className="col-span-12 flex gap-1 items-center">
                        <Skeleton
                            variant="text"
                            width={20}
                            height={16}
                            sx={{ fontSize: '0.8rem' }}
                        />
                        <Skeleton
                            variant="text"
                            width="100%"
                            height={16}
                            sx={{ fontSize: '0.8rem' }}
                        />
                    </div>

                 
                </div>
            ))}
        </div>

    );
};

export default DraftsListSkeleton;

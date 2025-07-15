import { Skeleton } from "@mantine/core";

const OTPSkeleton = () => {
  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <h1 className="text-4xl font-semibold text-slate-900">
          OTP Verification
        </h1>
        <div className="flex flex-col gap-1 w-full">
          <Skeleton height={20} width="100%" radius={2} />
          <Skeleton height={20} width="30%" radius={2} />
        </div>
      </div>
      <div className="flex flex-col gap-8 w-full">
        <div className="flex items-center gap-2 justify-between">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} height={72} width={48.67} radius={8} />
          ))}
        </div>
        <Skeleton height={48} width="100%" radius={8} />
      </div>
    </>
  );
};

export default OTPSkeleton;

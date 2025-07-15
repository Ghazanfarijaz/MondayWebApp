import { Skeleton } from "@mantine/core";

const SignupSkeleton = () => {
  return (
    <div className="mt-8 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} height={48} width="100%" radius={8} />
        ))}
      </div>
      <Skeleton height={48} width="100%" radius={8} />
      <div className="flex flex-col gap-5">
        <Skeleton height={10} width="100%" radius={2} />
        <Skeleton height={48} width="100%" radius={8} />
      </div>
      <Skeleton height={20} width="70%" radius={2} mx="auto" />
    </div>
  );
};

export default SignupSkeleton;

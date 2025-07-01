import { useQuery } from "@tanstack/react-query";
import { boardsAPI } from "../api/board";
import { toast } from "sonner";

const useUsersPhotoThumbs = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["usersPhotoThumbs"],
    queryFn: () => boardsAPI.getUsersPhotoThumb(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isError) {
    console.error("Failed to fetch users photo thumbs");
    toast.error("Error!", {
      description: error.message || "Could not load user photos.",
    });
    return {
      users: [],
      isPending: false,
    };
  }

  return {
    users: data?.data?.users?.data || [],
    isPending,
  };
};

export default useUsersPhotoThumbs;

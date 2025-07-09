import { useForm } from "@mantine/form";
import useHtmlThemeClass from "../../../hooks/useHtmlThemeClass";
import { useAuth } from "./../../../contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import ProfilePictureInput from "../../../features/settings/components/ProfilePictureInput";
import { TextInput } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { SquarePen } from "lucide-react";
import { userAPIs } from "../../../api/user";
import { toast } from "sonner";
import LoadingBackdrop from "./../../../components/UIComponents/LoadingBackdrop";
const ProfileSettings = () => {
  // Hooks
  const { user } = useAuth();
  const theme = useHtmlThemeClass();
  const isBlueTheme = theme === "blue";

  // Local States
  const [isEditable, setIsEditable] = useState(false);

  // Form for updating profile
  const updateProfileForm = useForm({
    initialValues: {
      name: "",
      email: "",
      profilePicture: "",
    },

    validate: {
      name: (value) => (value ? null : "Name is required"),
    },
  });

  // Mutation for updating profile
  const updateProfile = useMutation({
    mutationFn: () =>
      userAPIs.updateProfile({
        name: updateProfileForm.values.name,
        profilePicture: updateProfileForm.values.profilePicture,
      }),

    onSuccess: () => {
      setIsEditable(false);
      toast.success("Success!", {
        description: "Profile updated successfully.",
      });
    },
    onError: (error) =>
      toast.error("Error!", {
        description: error.message || "Failed to update profile.",
      }),
  });

  const formRef = useRef(updateProfileForm);
  useEffect(() => {
    if (user) {
      formRef.current.setValues({
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
      });
    }
  }, [user]);

  return (
    <>
      {updateProfile.isPending && <LoadingBackdrop />}
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-black dark:text-white blue:text-white break-all">
          Update Profile
        </h1>
        <form
          onSubmit={updateProfileForm.onSubmit(updateProfile.mutate)}
          className="bg-white dark:bg-black blue:bg-dark-blue p-6 rounded-lg shadow-sm lg:grid grid-cols-2 flex flex-col gap-8 max-w-[800px] relative"
        >
          {!isEditable && (
            <button
              type="button"
              onClick={() => setIsEditable(true)}
              className="absolute top-6 right-6"
            >
              <SquarePen className="text-gray-400 blue:text-gray-100" />
            </button>
          )}
          <div className="col-span-2">
            <ProfilePictureInput
              pictureURL={updateProfileForm.values.profilePicture}
              onUploadPicture={(file) => {
                updateProfileForm.setFieldValue("profilePicture", file);
              }}
              showUploadButton={isEditable}
            />
          </div>

          <TextInput
            label="Name"
            placeholder="Enter your name"
            {...updateProfileForm.getInputProps("name")}
            classNames={{
              label: isBlueTheme
                ? " !text-white !font-normal !text-[16px] !mb-2"
                : "!text-black dark:!text-white !font-normal !text-[16px] !mb-2",
              input: isBlueTheme
                ? " !bg-[#2b2d50] !text-white !p-[8px_10px] !rounded-lg  !h-[40px] !border-none"
                : "!text-black dark:!text-white !bg-gray-100 dark:!bg-light-black !p-[8px_10px] !rounded-lg  !h-[40px] !border-none",
            }}
            disabled={!isEditable}
          />
          <TextInput
            label="Email"
            value={updateProfileForm.values.email}
            disabled
            classNames={{
              label: isBlueTheme
                ? " !text-white !font-normal !text-[16px] !mb-2"
                : "!text-black dark:!text-white !font-normal !text-[16px] !mb-2",
              input: isBlueTheme
                ? " !bg-[#2b2d50] !text-white !p-[8px_10px] !rounded-lg  !h-[40px] !border-none"
                : "!text-black dark:!text-white !bg-gray-100 dark:!bg-light-black !p-[8px_10px] !rounded-lg  !h-[40px] !border-none",
            }}
          />
          {isEditable && (
            <div className="flex items-center gap-4 col-span-2">
              <button
                type="submit"
                className="px-4 py-2 bg-[#2A85FF] text-white rounded-lg hover:shadow-lg w-fit disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={!isEditable || updateProfile.isLoading}
              >
                Update Profile
              </button>
              <button
                type="button"
                className="px-4 py-2 border-2 border-black dark:border-white blue:border-white text-black dark:text-white blue:text-white rounded-lg hover:shadow-lg ease-in-out w-fit"
                onClick={() => {
                  setIsEditable(false);
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default ProfileSettings;

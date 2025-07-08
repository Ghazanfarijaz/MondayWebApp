import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import { PasswordInput } from "@mantine/core";
import useHtmlThemeClass from "../../../hooks/useHtmlThemeClass";

const ChangePassword = () => {
  // Hooks
  const theme = useHtmlThemeClass();
  const isBlueTheme = theme === "blue";

  // Form for changing password
  const changePasswordForm = useForm({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },

    validate: {
      currentPassword: (value) =>
        value ? null : "Current password is required",
      newPassword: (value) => (value ? null : "New password is required"),
      confirmNewPassword: (value, values) =>
        value === values.newPassword ? null : "Passwords do not match",
    },
  });

  const changePassword = useMutation({
    mutationFn: () => {},
  });

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-black dark:text-white blue:text-white break-all">
        Change Password
      </h1>
      <form
        onSubmit={changePasswordForm.onSubmit(changePassword.mutate)}
        className="bg-white dark:bg-black blue:bg-dark-blue p-6 rounded-lg shadow-sm lg:grid grid-cols-2 flex flex-col gap-8 max-w-[800px]"
      >
        <div className="col-span-2 grid lg:grid-cols-2 grid-cols-1 gap-8">
          <PasswordInput
            label="Current Password"
            placeholder="Enter your current password"
            {...changePasswordForm.getInputProps("currentPassword")}
            classNames={{
              label:
                "!text-black dark:!text-white !font-normal !text-[16px] !mb-2" +
                (isBlueTheme ? " !text-white" : ""),
              input:
                "!p-[8px_10px] !rounded-lg !text-black dark:!text-white !h-[40px] !border-none !bg-gray-100 dark:!bg-light-black" +
                (isBlueTheme ? " !bg-[#2b2d50] !text-white" : ""),
            }}
          />
        </div>
        <PasswordInput
          label="New Password"
          placeholder="Enter your new password"
          {...changePasswordForm.getInputProps("newPassword")}
          classNames={{
            label:
              "!text-black dark:!text-white !font-normal !text-[16px] !mb-2" +
              (isBlueTheme ? " !text-white" : ""),
            input:
              "!p-[8px_10px] !rounded-lg !text-black dark:!text-white !h-[40px] !border-none !bg-gray-100 dark:!bg-light-black" +
              (isBlueTheme ? " !bg-[#2b2d50] !text-white" : ""),
          }}
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm your new password"
          {...changePasswordForm.getInputProps("confirmNewPassword")}
          classNames={{
            label:
              "!text-black dark:!text-white !font-normal !text-[16px] !mb-2" +
              (isBlueTheme ? " !text-white" : ""),
            input:
              "!p-[8px_10px] !rounded-lg !text-black dark:!text-white !h-[40px] !border-none !bg-gray-100 dark:!bg-light-black" +
              (isBlueTheme ? " !bg-[#2b2d50] !text-white" : ""),
          }}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-[#2A85FF] text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out w-fit"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;

import { Modal, TextInput, Textarea, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import useHtmlThemeClass from "../hooks/useHtmlThemeClass";

export const FeedbackModal = ({ opened, onClose }) => {
  const theme = useHtmlThemeClass();
  const isBlueTheme = theme === "blue";
  const form = useForm({
    initialValues: {
      summary: "",
      details: "",
      name: "",
      email: "",
    },
    validate: {
      summary: (value) =>
        value.trim().length > 0 ? null : "Summary is required",
      details: (value) =>
        value.trim().length > 0 ? null : "Details are required",
      name: (value) => (value.trim().length > 0 ? null : "Name is required"),
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email address",
    },
  });

  const handleSubmit = (values) => {
    console.log("Feedback form submitted:", values);
    onClose(); // optionally close modal after submit
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      overlayProps={{
        className: "dark:bg-[#212121CF] bg-[#0F172A73] blue:bg-[#2B2D50B2]",
      }}
      classNames={{
        content:
          "feedback-modal-content bg-white dark:bg-black blue:bg-dark-blue blue:border-l-light-blue",
        header:
          "feedback-modal-header dark:bg-black blue:bg-dark-blue blue:border-l-light-blue",
        body: "feedback-modal-body dark:bg-black blue:bg-dark-blue blue:border-l-light-blue",
        close:
          "text-black dark:text-white blue:text-white",
      }}
    >
      <h2 className="font-bold mb-2 md:text-[24px] text-[20px] text-black dark:text-white blue:text-white leading-none">
        Feedback
      </h2>
      <p className="text-black mb-8 dark:text-white blue:text-white font-normal text-[16px]">
        Your feedback helps us improve and serve you better.
      </p>

      <form
        onSubmit={form.onSubmit(handleSubmit)}
        className="flex flex-col gap-4"
      >
        <TextInput
          unstyled
          variant="filled"
          placeholder="Enter Summary"
          label="Summary"
          {...form.getInputProps("summary")}
          classNames={{
            input: `!h-[48px] !rounded-lg !ps-4 ${
              isBlueTheme ? "bg-[#31324E] text-white" : "bg-[#F4F4F4]"
            }  dark:bg-[#212121] w-full mt-3 outline-none text-black dark:text-white`,
            label:
              "text-black dark:text-white blue:text-white font-medium text-[14px]",
          }}
        />

        <Textarea
          unstyled
          variant="filled"
          placeholder="Enter Detailed Feedback"
          label="Details"
          autosize
          minRows={4}
          {...form.getInputProps("details")}
          classNames={{
            input: `!rounded-lg p-4 !ps-4 ${
              isBlueTheme ? "bg-[#31324E] text-white" : "bg-[#F4F4F4]"
            } dark:bg-[#212121]  w-full mt-3 outline-none text-black dark:text-white`,
            label:
              "text-black dark:text-white blue:text-white font-medium text-[14px]",
          }}
        />

        <div className="grid md:grid-cols-2 gap-4">
          <TextInput
            unstyled
            variant="filled"
            placeholder="Your Name"
            label="Name"
            {...form.getInputProps("name")}
            className="flex-1"
            classNames={{
              input: `!h-[48px] !rounded-lg !ps-4 ${
                isBlueTheme ? "bg-[#31324E] text-white" : "bg-[#F4F4F4]"
              } dark:bg-[#212121]  w-full mt-3 outline-none text-black dark:text-white`,
              label:
                "text-black dark:text-white blue:text-white font-medium text-[14px]",
            }}
          />
          <TextInput
            unstyled
            variant="filled"
            placeholder="Your Email"
            label="Email"
            {...form.getInputProps("email")}
            className="flex-1"
            classNames={{
              input: `!h-[48px] !rounded-lg !ps-4 ${
                isBlueTheme ? "bg-[#31324E] text-white" : "bg-[#F4F4F4]"
              } dark:bg-[#212121]  w-full mt-3 outline-none text-black dark:text-white`,
              label:
                "text-black dark:text-white blue:text-white font-medium text-[14px]",
            }}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Button
            unstyled
            type="submit"
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium h-[48px] rounded-lg"
          >
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

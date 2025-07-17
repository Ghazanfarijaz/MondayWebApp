import {
  Modal,
  TextInput,
  Textarea,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import useHtmlThemeClass from "../../../hooks/useHtmlThemeClass";
import { CROSS_ICON } from "../../../assets/icons/CrossIcon";
import { useMutation } from "@tanstack/react-query";
import "./FeedbackModal.css";

export const FeedbackModal = ({ opened, onClose }) => {
  const theme = useHtmlThemeClass();
  const isBlueTheme = theme === "blue";

  // Feedback Form - Form
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

  // Submit Feedback - Mutation
  const submitFeedback = useMutation({
    mutationFn: () => {
      console.log("Submitting feedback:", form.values);
    },
  });

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
        close: "text-black dark:text-white blue:text-white",
      }}
      transitionProps={{
        transition: "fade",
        duration: 600,
        timingFunction: "linear",
      }}
      withCloseButton={false}
      padding={0}
    >
      <div className="w-full relative p-[32px_24px]">
        <LoadingOverlay
          visible={submitFeedback.isPending}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <button className="absolute !top-[8px] !right-[8px]" onClick={onClose}>
          <CROSS_ICON className="text-black dark:text-white blue:text-white" />
        </button>
        <h2 className="font-bold mb-2 md:text-[24px] text-[20px] text-black dark:text-white blue:text-white leading-none">
          Feedback
        </h2>
        <p className="text-black mb-8 dark:text-white blue:text-white font-normal text-[16px]">
          Your feedback helps us improve and serve you better.
        </p>
        <form
          onSubmit={form.onSubmit(submitFeedback.mutate)}
          className="flex flex-col gap-4"
        >
          <TextInput
            variant="filled"
            placeholder="Enter Summary"
            label="Summary"
            {...form.getInputProps("summary")}
            classNames={{
              input: `!h-[48px] !rounded-lg ${
                isBlueTheme
                  ? "!bg-[#31324E] !text-white"
                  : "bg-[#F4F4F4] text-black dark:bg-[#212121] dark:text-white"
              }`,
              label:
                "text-black dark:text-white blue:text-white font-medium text-[14px]",
            }}
          />

          <Textarea
            variant="filled"
            placeholder="Enter Detailed Feedback"
            label="Details"
            autosize
            minRows={4}
            maxRows={6}
            {...form.getInputProps("details")}
            classNames={{
              input: `!h-[48px] !rounded-lg ${
                isBlueTheme
                  ? "!bg-[#31324E] !text-white"
                  : "bg-[#F4F4F4] text-black dark:bg-[#212121] dark:text-white"
              }`,
              label:
                "text-black dark:text-white blue:text-white font-medium text-[14px]",
            }}
          />

          <div className="grid md:grid-cols-2 gap-4">
            <TextInput
              variant="filled"
              placeholder="Your Name"
              label="Name"
              {...form.getInputProps("name")}
              className="flex-1"
              classNames={{
                input: `!h-[48px] !rounded-lg ${
                  isBlueTheme
                    ? "!bg-[#31324E] !text-white"
                    : "bg-[#F4F4F4] text-black dark:bg-[#212121] dark:text-white"
                }`,
                label:
                  "text-black dark:text-white blue:text-white font-medium text-[14px]",
              }}
            />
            <TextInput
              variant="filled"
              placeholder="Your Email"
              label="Email"
              {...form.getInputProps("email")}
              className="flex-1"
              classNames={{
                input: `!h-[48px] !rounded-lg ${
                  isBlueTheme
                    ? "!bg-[#31324E] !text-white"
                    : "bg-[#F4F4F4] text-black dark:bg-[#212121] dark:text-white"
                }`,
                label:
                  "text-black dark:text-white blue:text-white font-medium text-[14px]",
              }}
            />
          </div>
          <Button
            unstyled
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium h-[48px] px-10 mt-8 rounded-lg w-fit"
          >
            Submit
          </Button>
        </form>
      </div>
    </Modal>
  );
};

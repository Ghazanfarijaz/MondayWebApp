import { Modal } from "@mantine/core";

const InvalidSubscriptionModal = () => {
  return (
    <Modal
      opened={true}
      onClose={() => {}}
      centered
      withCloseButton={false}
      title="Invalid Subscription"
      w={"100%"}
      maw={600}
      classNames={{
        title: "!text-xl !font-semibold",
        content: "!rounded-lg !px-3 !py-2",
      }}
      size={"lg"}
    >
      <p className="text-gray-500 text-md">
        You have not subscribed to any plan yet. Please contact your
        administrator to subscribe.
      </p>
    </Modal>
  );
};

export default InvalidSubscriptionModal;

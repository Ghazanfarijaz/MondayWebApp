import { Modal, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";

export const NewColumnValueModal = ({ opened, onClose, onSaveValue }) => {
  const newValueForm = useForm({
    initialValues: {
      label: "",
    },
    validate: {
      label: (value) => (value.trim().length > 0 ? null : "Label is required"),
    },
  });

  const handleSave = () => {
    newValueForm.validate();
    if (newValueForm.isValid()) {
      onSaveValue(newValueForm.values.label);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        newValueForm.reset();
        onClose();
      }}
      centered
      title="Add a Label"
      withCloseButton={false}
      radius="md"
      padding="md"
      classNames={{
        content: "!rounded-lg",
        title: "!font-bold !text-[#228be6]",
      }}
    >
      <div className="flex flex-col gap-6">
        <TextInput
          label="Label"
          placeholder="Enter label..."
          {...newValueForm.getInputProps("label")}
          classNames={{
            label: "!mb-2 !leading-none",
          }}
        />
        <div className="flex justify-end gap-2">
          <Button type="button" onClick={handleSave}>
            Save
          </Button>
          <Button
            type="button"
            variant="default"
            onClick={() => {
              newValueForm.reset();
              onClose();
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

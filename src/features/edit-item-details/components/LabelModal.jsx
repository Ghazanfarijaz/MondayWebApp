import { Modal, TextInput, Button, LoadingOverlay } from "@mantine/core";
import { useState } from "react";

export const LabelModal = ({ opened, onClose, onSave, isLoading = false }) => {
  const [label, setLabel] = useState("");

  const handleSave = () => {
    console.log(label);
    setLabel("");
  };

  const handleClose = () => {
    setLabel("");
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      centered
      title="Add a Label"
      withCloseButton={false}
      padding="md"
    >
      <LoadingOverlay visible={isLoading} />
      <TextInput
        label="Label"
        placeholder="Enter label"
        value={label}
        onChange={(e) => setLabel(e.currentTarget.value)}
        required
        classNames={{
          label: "mb-2", 
        }}
      />
      <div className="flex justify-end gap-2 mt-6">
        <Button variant="default" onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!label.trim()}>
          Save
        </Button>
      </div>
    </Modal>
  );
};

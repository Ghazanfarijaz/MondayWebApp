import { useEffect, useState } from "react";
import compressImageFile from "./../services/compressImageFile";
import { DEFAULT_PROFILE_ICON } from "../../../assets/icons/DefaultIcon";
import { Loader } from "@mantine/core";

const ProfilePictureInput = ({
  pictureURL,
  onUploadPicture,
  showUploadButton,
}) => {
  const [selectedImage, setSelectedImage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const inputFile = e.target;

    if (!file) {
      return console.log("No file selected");
    }
    setIsLoading(true);

    const compressedFile = await compressImageFile(file);

    // Reset the input field value so onChange can be triggered again if the same image is uploaded
    inputFile.value = null;
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(compressedFile);

    onUploadPicture(compressedFile);
    return setIsLoading(false);
  };

  useEffect(() => {
    if (pictureURL && pictureURL instanceof Blob) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(pictureURL);
    } else {
      setSelectedImage(pictureURL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pictureURL]);

  return (
    <div className="space-y-[16px]">
      <h2 className="font-medium text-[16px] text-black blue:text-white dark:text-white">
        Avatar
      </h2>
      <div className="flex items-center gap-[24px] relative">
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="avatar-icon"
            className={`w-[100px] h-[100px] rounded-full`}
          />
        ) : (
          <DEFAULT_PROFILE_ICON />
        )}

        {isLoading && (
          <div className="w-[100px] h-[100px] rounded-full bg-black/20 absolute top-0 left-0 flex justify-center items-center">
            <Loader color="#fff" size="sm" />
          </div>
        )}

        {showUploadButton && isLoading ? (
          <div className="p-[8px_12px] min-w-[105px] bg-gray-400 rounded-[8px] font-semibold text-[16px] text-white flex justify-center items-center hover:cursor-not-allowed">
            Uploading...
          </div>
        ) : (
          showUploadButton && (
            <label
              htmlFor="upload-avatar"
              className="p-[8px_12px] min-w-[105px] bg-[#2A85FF] rounded-[8px] font-semibold text-[16px] text-white flex justify-center items-center hover:cursor-pointer"
            >
              {pictureURL ? "Update" : "Upload"}
              <input
                id="upload-avatar"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(e)}
              />
            </label>
          )
        )}
      </div>
    </div>
  );
};

export default ProfilePictureInput;

import Resizer from "react-image-file-resizer";

const rezise = (file: File, maxWith: number, maxHeight: number) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWith,
      maxHeight,
      "JPEG",
      100,
      0,
      (blob) => {
        resolve(blob);
      },
      "blob"
    );
  });

export default rezise;


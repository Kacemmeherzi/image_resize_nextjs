"use client";
import { useState } from "react";
import rezise from "./utilities";
export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [width, setWidth] = useState<number | null>(null);

  async function resizeImage() {
    if (!image || !height || !width) {
      return;
    }

    await rezise(image, height, width)
      .then((resizedImage) => {
        const resizedFile = new File([resizedImage as Blob], image.name, {
          type: image.type,
        });

        setImage(resizedFile);
        downloadImage();
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function downloadImage() {
    if (!image) {
      return;
    }

    const url = URL.createObjectURL(image);
    const a = document.createElement("a");
    a.href = url;
    a.download = image.name;
    a.click();
  }
  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
    const img = new Image();
    img.src = URL.createObjectURL(file!);
    img.onload = () => {
      setHeight(img.height);
      setWidth(img.width);
      console.log(img.height, img.width);

      // Revoke object URL to save memory
      URL.revokeObjectURL(img.src);
    };
  }
// todo  responsive design imporvments 
// todo button to manually download the image 5ater tawa just after the resize 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Upload and Resize Your Image
      </h1>
      
      <div className="flex justify-center  mb-6">
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="Uploaded Preview"
            className="w-1/2 object-fit rounded-lg p-4 shadow-lg"
          />
        ) : (
          <div className="w-40 h-40 flex items-center justify-center bg-gray-200 rounded-lg shadow-lg text-gray-500">
            No Image
          </div>
        )}
      </div>

      <div className="mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e)}
          className="block w-full text-sm font-bold text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-3/4 mb-6">
        <div className="flex flex-col">
          <label
            htmlFor="height"
            className="text-sm font-bold text-gray-700 mb-2"
          >
            Height
          </label>
          <input
            type="number"
            id="height"
            value={JSON.stringify(height)}
            placeholder="Height"
            onChange={(e) => {
              setHeight(parseFloat(e.target.value));
            }}
            className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="weight"
            className="text-sm font-bold text-gray-700 mb-2"
          >
            Width
          </label>
          <input
            type="Number"
            id="weight"
            value={JSON.stringify(width)}
            placeholder="Width"
            onChange={(e) => {
              setWidth(parseFloat(e.target.value));
            }}
            className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        onClick={resizeImage}
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
      >
        Resize
      </button>
    </div>
  );
}

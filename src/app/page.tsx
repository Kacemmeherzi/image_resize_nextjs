"use client";
import { useState } from "react";


export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [width, setWidth] = useState<number | null>(null);

  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300 py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Upload and Resize Your Image
      </h1>

      <div className="mb-6">
        {image ? (
          <img
            src={URL.createObjectURL(image)}
            alt="Uploaded Preview"
            className="w-40 h-40 object-cover rounded-lg shadow-lg"
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
          onChange={(e) => {
            setImage(e.target.files?.[0] || null);
          }}
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
            placeholder="Height" onChange={(e) => {setHeight(parseFloat(e.target.value));
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
            placeholder="Width" onChange={(e) => {setWidth(parseFloat(e.target.value)); 
              console.log(width);
            }} 
            className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200">
        Resize
      </button>
    </div>
  );
}

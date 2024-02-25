import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import imge1 from '../assets/1.jpg'
import imge2 from '../assets/2.jpg'
import imge3 from '../assets/3.jpg'

export default function ImageUpload() {
    
  const [imageSrc, setImageSrc] = useState<string>("");
  const [file, setFile] = useState<Blob>(null!);
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const f = e.target.files[0];
    setFile(f);
    const imgURL = URL.createObjectURL(f);
    setImageSrc(imgURL);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    const id = toast.loading("Predicting....");
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/upload-img",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
    //   setImageSrc("");
    //   setFile(null!);
      toast.loading("Loading", {
          id
      })
      setTimeout(() => {
        // setCount((count) => count + 1);
        setIsImageUploaded(true);
        return toast.success(`${res.data?.data}`, {
            id,
          });
      }, 5000);
    //   console.log(imageSrc);
    } catch (error) {
      console.log(error);
      toast.error(`${error}`, {
        id,
      });
    }
  };  

  return (
    <div className="flex flex-col space-y-5 p-10">
        <h1 className="font-bold text-3xl mt-10">Send a criminal's image</h1>
        <div className="flex items-start justify-around p-10">
          <div className="border-2 ml-10 border-dotted flex items-center justify-center border-black p-3 rounded-3xl text-gray-500">
            {imageSrc === "" ? (
              <div>
                <p>Upload a file with .png/.jpg extension.</p>
                <p>Portrait photo is prefered</p>
              </div>
            ) : (
              <div>
                <img
                    src={imageSrc}
                    alt=""
                    className="object-cover h-[300px] w-[300px] rounded-md"
                />
                <p className="text-center">Masked Image</p>
              </div>
            )}
          </div>
          {
            !isImageUploaded?
            <div className="flex flex-col">
                <div className="border-none p-[5px] rounded-[7px] text-slate-600 bg-slate-400 mt-5">
                <input type="file" onChange={handleChange} />
                </div>

                <button
                    className="p-2 bg-red-600 text-white rounded-lg mt-5"
                    onClick={handleSubmit}
                >
                Generate
                </button>
            </div>:
            <div className="border-2 ml-10 border-dotted flex items-center justify-center border-black p-3 rounded-3xl text-gray-500">
                {imageSrc === "" ? (
                <div>
                    <p>Upload a file with .png/.jpg extension.</p>
                    <p>Portrait photo is prefered</p>
                </div>
                ) : (
                <div>
                    <img
                        src={imge2}
                        alt="unmasked image"
                        className="object-cover h-[300px] w-[300px] rounded-md"
                    />
                    <p className="text-center">Predicted Unmasked Image</p>
                </div>
                )}
            </div>
          }

        </div>
        {isImageUploaded && <div className="text-2xl -mt-10 text-green-600 font-semibold text-center">Successfully Uploaded to the Database</div>}
      </div>
  )
}

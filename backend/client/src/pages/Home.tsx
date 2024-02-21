import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Home = () => {
  const [file, setFile] = useState<Blob>(null!);
  const [imageSrc, setImageSrc] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const f = e.target.files[0];
    setFile(f);
    const imgURL = URL.createObjectURL(f);
    setImageSrc(imgURL);
  };

  const handleSubmit = async () => {
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
      setImageSrc("");
      setFile(null!);
      toast.success(`${res.data?.data}`, {
        id,
      });
    } catch (error) {
      console.log(error);
      toast.error(`${error}`, {
        id,
      });
    }
  };

  return (
    <div className="flex flex-col space-y-5 ml-5 mt-5">
      <div className="h-[80vh] w-[95%] p-16 bg-red-100 rounded-xl ml-5">
        <h1 className="text-5xl font-extrabold"> Catching Criminals </h1>
        <div className="flex items-center">
          <p className="mt-10 flex-1 text-xl tracking-widel text-gray-600">
            Introducing the future of crime prevention: our cutting-edge system harnesses the power of generative AI and real-time camera surveillance to revolutionize law enforcement. By seamlessly integrating advanced algorithms with state-of-the-art technology, we've created a groundbreaking solution capable of identifying criminals as they act, ensuring swift and decisive action. Say goodbye to outdated methods and hello to proactive security. With our system, the streets are safer, justice is swifter, and peace of mind is guaranteed. It's time to embrace the power of innovation and take a stand against crime like never before.
          </p>
          <img className="flex-1" src="https://www.tbsnews.net/sites/default/files/styles/big_2/public/images/2022/09/24/tech.png" alt="poster" />
        </div>
      </div>
      <div className="flex flex-col ml-5 space-y-5">
        <h1 className="font-bold text-3xl mt-10">Send a criminal's image</h1>
        <div className="flex items-center justify-center space-x-20">
          <div className="border-2 h-[300px] w-[600px] ml-10 border-dotted flex items-center justify-center border-black p-3 rounded-3xl text-gray-500">
            {imageSrc === "" ? (
              <div>
                <p>Upload a file with .png/.jpg extension.</p>
                <p>Portrait photo is prefered</p>
              </div>
            ) : (
              <img
                src={imageSrc}
                alt=""
                className="object-cover h-[300px] w-[600px] rounded-md"
              />
            )}
          </div>
          <div className="flex flex-col space-x-10">
            <div className="border-none p-[5px] rounded-[7px] bg-blue-400 mt-5">
              <input type="file" onChange={handleChange} />
            </div>

            <button
              className="p-2 bg-red-300 rounded-lg mt-5"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="mt-20"></div>
    </div>
  );
};

export default Home;

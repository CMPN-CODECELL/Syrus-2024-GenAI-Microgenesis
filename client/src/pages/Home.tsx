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
      <div className="h-[500px] w-[95%] p-5 bg-green-300 rounded-md ml-5 ">
        <h1 className="text-5xl font-semibold"> Catching Criminals </h1>
        <div className="flex">
          <p className="mt-20 flex-1 text-xl tracking-widel">
            {" "}
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
            explicabo debitis quod quo minima sed consectetur saepe accusantium
            atque dignissimos. Corporis nobis praesentium tenetur? Quia quos
            laboriosam iste sed magnam harum ea quidem, omnis quasi aliquid
            sapiente laudantium aperiam est porro ipsam non dolor nam eos
            assumenda saepe quod? Unde? Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Repudiandae dolorem neque magni libero similique
            iusto veniam? Sint nostrum voluptates aliquid ipsa similique culpa
            possimus mollitia doloremque! Maxime quam inventore architecto
            facere aliquid id perferendis ut natus alias corrupti dolor amet
            impedit ex corporis, fugit enim error quod illum consectetur
            dolorem.
          </p>
          <p className="flex-1"></p>
        </div>
      </div>
      <div className="flex flex-col ml-5 space-y-5">
        <h1 className="font-bold text-3xl">Send a criminal's image</h1>
        <div className="flex items-center justify-center space-x-20">
          <div className="border-2 h-[300px] w-[600px] ml-10 border-dotted flex items-center justify-center border-black p-3 rounded-md text-gray-500">
            {imageSrc === "" ? (
              <>
                <p>Upload a file with .csv extension.</p>
                <p>Should contain one row of all the required fields</p>
              </>
            ) : (
              <img
                src={imageSrc}
                alt=""
                className="h-[300px] w-[600px] rounded-md"
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

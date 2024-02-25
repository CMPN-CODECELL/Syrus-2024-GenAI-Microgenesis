import ImageUpload from "../components/ImageUpload";

const Home = () => {

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
      <ImageUpload></ImageUpload>
    </div>
  );
};

export default Home;

import Doodle from "@assets/images/doodle.png";

const CardName = () => {
  return (
    <div
      className="relative flex items-center h-40 p-4 rounded-lg shadow-lg bg-accent-light"
      style={{
        backgroundImage: `url(${Doodle})`,
        backgroundSize: "cover",
        backgroundPosition: "right",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col px-5 text-white">
        <h1 className="z-10 text-2xl font-bold md:text-5xl">
          Selamat Datang Farhan
        </h1>
        <p className="z-10 text-lg ">21450410030</p>
      </div>
      <div className="absolute inset-0 bg-black opacity-50"></div>
    </div>
  );
};

export default CardName;

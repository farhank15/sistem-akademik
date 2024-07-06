import Doodle from "@assets/images/doodle.png";

const HeaderCard = ({ children, className }) => {
  return (
    <div
      className={`relative flex items-center w-full h-32 p-4 rounded-lg shadow-lg bg-accent-light ${className}`}
      style={{
        backgroundImage: `url(${Doodle})`,
        backgroundSize: "cover",
        backgroundPosition: "right",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
      <div className="absolute inset-0 bg-black opacity-50"></div>
    </div>
  );
};

export default HeaderCard;

import Gorilla from "@assets/Icons/gorilla.png";
import Chicken from "@assets/Icons/chicken.png";
import Rabbit from "@assets/Icons/rabbit.png";
import Dinosaur from "@assets/Icons/dinosaur.png";
import Bear from "@assets/Icons/bear.png";

const avatars = [Gorilla, Chicken, Rabbit, Dinosaur, Bear];

const getRandomAvatar = () => {
  const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
  return randomAvatar;
};

const RandomAvatars = ({ selectedAvatar }) => {
  return (
    <img src={selectedAvatar} alt="Random Avatar" className="rounded-full" />
  );
};

export { RandomAvatars, getRandomAvatar };

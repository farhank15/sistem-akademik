import Button from "@components/atoms/Button";

const HomePage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Button
        name="Button"
        className="text-white rounded-lg bg-primary hover:bg-primary-light"
      />
      <h1>haloo</h1>
    </div>
  );
};

export default HomePage;

const Card = ({ children, className, onClick }) => {
  return (
    <div
      className={`rounded-lg shadow-lg text-neutral-light shadow-primary-dark bg-primary ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;

// src/components/atoms/Paragraph.jsx

const Paragraph = ({ children, className }) => {
  return <p className={`text-base font-poppins ${className}`}>{children}</p>;
};

export default Paragraph;

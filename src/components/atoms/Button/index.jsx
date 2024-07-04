import React from "react";

const Button = ({
  type = "button",
  onClick,
  className = "",
  name,
  variant = "",
  size = "md",
  disabled = false,
  icon = null,
}) => {
  const baseStyles =
    "btn inline-flex items-center justify-center font-medium rounded focus:outline-none transition duration-150 ease-in-out";

  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    accent: "btn-accent",
    neutral: "btn-neutral",
    info: "btn-info",
    success: "btn-success",
    warning: "btn-warning",
    error: "btn-error",
    gray: "bg-gray-500 text-white hover:bg-gray-700", // Custom gray variant
  };

  const sizes = {
    sm: "btn-sm",
    md: "btn-md",
    lg: "btn-lg",
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedStyles}
      disabled={disabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {name}
    </button>
  );
};

export default Button;

const FormInput = ({
  className,
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="form-control">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`input input-bordered ${className}`}
      />
    </div>
  );
};

export default FormInput;

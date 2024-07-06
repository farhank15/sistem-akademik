const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2 border border-gray-300 rounded-lg shadow-sm placeholder:text-slate-400 bg-neutral-light focus:outline-none text-slate-600 focus:border-primary"
    />
  );
};

export default SearchBar;

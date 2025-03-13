export function Input({ type, value, onChange, ...props }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="border p-2 rounded w-full"
      {...props}
    />
  );
}

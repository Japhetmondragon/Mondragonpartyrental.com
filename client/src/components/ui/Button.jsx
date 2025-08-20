export default function Button({ children, variant="primary", size="md", fullWidth=false, className="", ...props }) {
  const base = "font-display uppercase tracking-wide inline-flex items-center justify-center rounded-xl transition duration-200";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-neutral-300 text-neutral-800 hover:bg-neutral-50",
    ghost:   "text-neutral-700 hover:bg-neutral-100"
  };
  const sizes = { sm:"px-4 py-2 text-sm", md:"px-6 py-3 text-base", lg:"px-8 py-4 text-lg" };
  return <button className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth?"w-full":""} ${className}`} {...props}>{children}</button>;
}

export default function MyButton({
    label,
    id,
    variant = "primary",
    onClick,
    type = "button", disabled = false,
}) {
    const variants = {
        primary: "bg-blue-500 text-white hover:bg-blue-700 cursor-pointer",
        disable: "bg-stone-200 text-stone-400 cursor-not-allowed",
    };

    const selectedVariant = variants[variant] || variants.primary;

    return (
        <button
            id={id}
            onClick={onClick}
            type={type}
            disabled={disabled || variant === "disable"}
            className={`
        ${selectedVariant}
        rounded-sm px-3 py-1.5 text-sm font-medium transition-colors
      `}
        >
            {label}
        </button>
    );
}
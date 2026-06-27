export default function StatusCard({ label, Icon, variant = "natural", data }) {
    const variants = {
        success: "bg-green-100/50",
        danger: "bg-red-100/50",
        warning: "bg-yellow-100/50",
        sky: "bg-blue-100/50",
        natural: "bg-stone-100/50"
    }
    const selectedVariant = variants[variant] || variants.natural;
    return (
        <div className={`${selectedVariant}
        text-xs text-stone-400 min-w-25 p-2 rounded-lg`}>
            <div className="flex w-full justify-between items-center ">
                <p>{label}</p>
                <Icon />
            </div>
            <div className="text-xl text-stone-950">{data}</div>
        </div>
    )
}
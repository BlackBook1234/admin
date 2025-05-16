import Link from "next/link";

export default function Logo() {
  return (
    <Link href={'/'} className="flex gap-1 items-center">
      {/* SVG logo replaced with your custom SVG content */}
    
      {/* Text to replace "EcommerceAdmin" with "Менежер" */}
      <span className="font-bold text-xl ml-2">Менежер</span>
    </Link>
  );
}

import Link from "next/link";
import { palette } from "@/lib/palette";

// Shown on quiz completion screens once the ranger stamp has been awarded.
export default function StampEarned() {
  return (
    <p className="mt-3">
      <Link
        href="/#passport"
        className="stamp-in inline-flex items-center gap-1.5 rounded-full border-2 px-3 py-1 font-heading text-xs uppercase tracking-widest"
        style={{ borderColor: palette.rust, color: palette.rust, transform: "rotate(-2deg)" }}
      >
        ★ Stamp added to your Ranger Passport →
      </Link>
    </p>
  );
}

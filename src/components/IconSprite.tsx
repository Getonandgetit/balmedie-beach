// Single 2x2 icon sheet at /images/icon-sprite.png:
// top-left = pillbox/building, top-right = tern, bottom-left = signpost, bottom-right = dune
const QUADRANTS = {
  pillbox: "0% 0%",
  tern: "100% 0%",
  signpost: "0% 100%",
  dune: "100% 100%",
} as const;

export type IconName = keyof typeof QUADRANTS;

export default function IconSprite({
  name,
  size = 20,
}: {
  name: IconName;
  size?: number;
}) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        width: size,
        height: size,
        backgroundImage: "url(/images/icon-sprite.png)",
        backgroundSize: "200% 200%",
        backgroundPosition: QUADRANTS[name],
        backgroundRepeat: "no-repeat",
        borderRadius: 4,
        flexShrink: 0,
      }}
    />
  );
}

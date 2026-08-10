interface AvatarProps {
  name: string;
  size?: number;
  photoUrl?: string;
  className?: string;
}

export default function Avatar({ name, size = 64, photoUrl, className = "" }: AvatarProps) {
  const initials =
    name
      .trim()
      .split(/\s+/)
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?";

  if (photoUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={photoUrl}
        alt={name}
        width={size}
        height={size}
        className={`rounded-full object-cover ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className={`rounded-full bg-green-100 text-green-700 font-semibold flex items-center justify-center shrink-0 mx-auto ${className}`}
      style={{ width: size, height: size, fontSize: size / 2.5 }}
    >
      {initials}
    </div>
  );
}

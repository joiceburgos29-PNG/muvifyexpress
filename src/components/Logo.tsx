type LogoProps = {
  className?: string;
  height?: number;
};

export default function Logo({ className = '', height }: LogoProps) {
  const h = height ?? 56;
  return (
    <img
      src="/logo-muvify-express.png"
      alt="Muvify Express — Precio claro hoy, mudanza tranquila mañana"
      style={{ height: `${h}px`, width: 'auto', objectFit: 'contain' }}
      className={className}
    />
  );
}

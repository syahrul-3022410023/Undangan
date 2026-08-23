interface TapeProps {
  className?: string;
}

export default function Tape({ className = "" }: TapeProps) {
  return (
    <div
      className={`tape-edge ${className}`}
      style={{
        clipPath: "polygon(0% 15%, 5% 0%, 15% 10%, 25% 0%, 35% 15%, 50% 0%, 65% 15%, 75% 0%, 85% 15%, 95% 0%, 100% 15%, 100% 85%, 95% 100%, 85% 85%, 75% 100%, 65% 85%, 50% 100%, 35% 85%, 25% 100%, 15% 85%, 5% 100%, 0% 85%)",
      }}
    />
  );
}

export function Cube({ size = "", style }: { size?: "" | "md" | "sm" | "xs"; style?: React.CSSProperties }) {
  return (
    <div className="stage3d" aria-hidden="true" style={style}>
      <div className={`cube ${size}`}>
        <div className="face f1" /><div className="face f2" /><div className="face f3" />
        <div className="face f4" /><div className="face f5" /><div className="face f6" />
      </div>
    </div>
  );
}

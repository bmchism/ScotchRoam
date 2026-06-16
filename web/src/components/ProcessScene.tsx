import type { SceneId } from "../data/process";


// Original animated SVG scenes for the bourbon-making process.
// Each is stylized in the bourbon-premium palette and lightly animated.

export default function ProcessScene({ id, accent }: { id: SceneId; accent: string }) {
  return (
    <div className="scene" style={{ ["--acc" as any]: accent }}>
      <svg viewBox="0 0 200 150" width="100%" height="100%" role="img" aria-label={id}>
        {SCENES[id] || <rect width="200" height="150" fill="none" />}
      </svg>
    </div>
  );
}

const SCENES: Record<string, JSX.Element> = {
  // 1 — Fields of grain (corn, rye, wheat, barley) under the sun
  grain: (
    <g>
      <circle cx="158" cy="34" r="16" fill="#F2C14E" opacity="0.85" className="anim-pulse" />
      <rect x="0" y="110" width="200" height="40" fill="#C28A3D" opacity="0.25" rx="4" />
      {[24, 48, 72, 96, 120, 144, 168].map((x, i) => (
        <g key={i} className="anim-sway" style={{ transformOrigin: `${x}px 115px` }}>
          <line x1={x} y1="70" x2={x} y2="115" stroke="var(--acc)" strokeWidth="2" opacity="0.8" />
          <ellipse cx={x} cy="66" rx="4" ry="9" fill="var(--acc)" opacity="0.7" />
        </g>
      ))}
    </g>
  ),
  // 2 — Milling: grinding grain into meal
  mill: (
    <g>
      <rect x="70" y="40" width="60" height="50" rx="8" fill="#8B4513" opacity="0.4" />
      <circle cx="100" cy="65" r="20" fill="#A0522D" opacity="0.5" />
      <circle cx="100" cy="65" r="20" fill="none" stroke="var(--acc)" strokeWidth="2" className="anim-spin" style={{ transformOrigin: "100px 65px" }} />
      <path d="M100 53 L100 77 M88 65 L112 65 M92 57 L108 73 M108 57 L92 73" stroke="var(--acc)" strokeWidth="1.5" opacity="0.6" />
      <rect x="80" y="92" width="40" height="6" rx="3" fill="#6B4423" opacity="0.5" />
      {[86, 96, 106, 116].map((x, i) => (
        <circle key={i} cx={x} cy={104 + (i % 2) * 4} r="2.5" fill="var(--acc)" opacity="0.5" />
      ))}
    </g>
  ),
  // 3 — Mashing / cooking in a vat
  mash: (
    <g>
      <ellipse cx="100" cy="120" rx="55" ry="14" fill="#6B4423" opacity="0.4" />
      <path d="M48 70 Q48 120 100 120 Q152 120 152 70 Z" fill="#A0522D" opacity="0.4" />
      <ellipse cx="100" cy="70" rx="52" ry="16" fill="var(--acc)" opacity="0.5" />
      <ellipse cx="100" cy="70" rx="52" ry="16" fill="none" stroke="#8B4513" strokeWidth="2" opacity="0.5" />
      {[80, 100, 120].map((x, i) => (
        <circle key={i} cx={x} cy={68 - (i % 2) * 4} r="3" fill="#fff" opacity="0.3" className="anim-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
      ))}
      <path d="M82 50 Q86 40 82 32 M100 48 Q104 38 100 30 M118 50 Q122 40 118 32" stroke="#fff" strokeWidth="1.5" opacity="0.25" fill="none" />
    </g>
  ),
  // 4 — Fermentation tanks (cypress fermenters)
  ferment: (
    <g>
      {[55, 100, 145].map((x, i) => (
        <g key={i}>
          <rect x={x - 18} y="50" width="36" height="80" rx="6" fill="#8B4513" opacity="0.4" />
          <rect x={x - 15} y="55" width="30" height="70" rx="4" fill="var(--acc)" opacity="0.3" />
          <line x1={x - 15} y1="75" x2={x + 15} y2="75" stroke="#6B4423" strokeWidth="1" opacity="0.4" />
          <line x1={x - 15} y1="105" x2={x + 15} y2="105" stroke="#6B4423" strokeWidth="1" opacity="0.4" />
          {[70, 82, 94].map((y, j) => (
            <circle key={j} cx={x + (j % 2 ? 4 : -4)} cy={y} r="2" fill="#fff" opacity="0.4" className="anim-pulse" style={{ animationDelay: `${j * 0.25}s` }} />
          ))}
        </g>
      ))}
    </g>
  ),
  // 5 — Distillation: column still + doubler
  distill: (
    <g>
      <rect x="56" y="24" width="22" height="106" rx="6" fill="#C0C0C0" opacity="0.45" />
      <rect x="59" y="28" width="16" height="98" rx="3" fill="#E8E8E8" opacity="0.3" />
      {[44, 60, 76, 92, 108].map((y, i) => (
        <line key={i} x1="56" y1={y} x2="78" y2={y} stroke="#8B8B8B" strokeWidth="1.5" opacity="0.4" />
      ))}
      <path d="M78 36 Q110 30 124 52" stroke="#B87333" strokeWidth="3" fill="none" opacity="0.7" />
      <ellipse cx="132" cy="92" rx="20" ry="30" fill="#B87333" opacity="0.5" />
      <ellipse cx="132" cy="92" rx="20" ry="30" fill="none" stroke="#8B5A2B" strokeWidth="2" opacity="0.5" />
      <path d="M124 52 L132 62" stroke="#B87333" strokeWidth="3" opacity="0.7" />
      <path d="M132 122 L132 132 L150 132" stroke="var(--acc)" strokeWidth="2" opacity="0.6" fill="none" />
    </g>
  ),
  // 6 — Barreling: charring a new oak barrel
  barrel: (
    <g>
      <path d="M78 40 Q72 75 78 110 L122 110 Q128 75 122 40 Z" fill="#A0522D" opacity="0.6" />
      <path d="M76 55 L124 55 M74 75 L126 75 M76 95 L124 95" stroke="#5a2f17" strokeWidth="2.5" opacity="0.6" />
      <ellipse cx="100" cy="40" rx="22" ry="7" fill="#8B4513" opacity="0.6" />
      <ellipse cx="100" cy="40" rx="14" ry="4" fill="#2a1810" opacity="0.7" />
      {[92, 100, 108].map((x, i) => (
        <path key={i} d={`M${x} 38 Q${x + 2} 28 ${x} 20`} stroke="#E8743B" strokeWidth="2" fill="none" opacity="0.7" className="anim-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
      ))}
    </g>
  ),
  // 7 — Aging in rickhouse stacks
  age: (
    <g>
      {[0, 1, 2].map((row) => (
        <g key={row}>
          {[0, 1, 2].map((col) => {
            const x = 40 + col * 50;
            const y = 40 + row * 35;
            return (
              <g key={`${row}-${col}`}>
                <ellipse cx={x} cy={y} rx="22" ry="14" fill="#8B4513" opacity="0.6" />
                <ellipse cx={x} cy={y} rx="18" ry="11" fill="var(--acc)" opacity="0.45" />
                <ellipse cx={x} cy={y} rx="4" ry="3" fill="#2a2118" opacity="0.4" />
              </g>
            );
          })}
        </g>
      ))}
    </g>
  ),
  // 8 — Proofing & bottling
  bottle: (
    <g>
      <rect x="88" y="30" width="24" height="100" rx="6" fill="var(--acc)" opacity="0.7" />
      <rect x="92" y="20" width="16" height="15" rx="4" fill="#8B4513" opacity="0.6" />
      <rect x="94" y="10" width="12" height="12" rx="3" fill="#A0522D" opacity="0.5" />
      <rect x="90" y="70" width="20" height="40" rx="2" fill="rgba(255,255,255,0.12)" />
      <text x="100" y="92" textAnchor="middle" fontSize="6" fill="rgba(255,255,255,0.65)">BOURBON</text>
      <ellipse cx="100" cy="130" rx="8" ry="3" fill="rgba(0,0,0,0.1)" />
    </g>
  ),
};

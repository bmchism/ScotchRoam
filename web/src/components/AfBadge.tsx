// Bottled-in-Bond badge. Shown on any bottle that is Bottled-in-Bond —
// the gold standard of bourbon authenticity. Links to the
// "what is bourbon" explainer when interactive.
import { Link } from "react-router-dom";

interface Props {
  size?: "sm" | "md";
  asLink?: boolean;
  label?: string;
}

export default function AfBadge({ size = "sm", asLink = true, label = "Bottled-in-Bond" }: Props) {
  const inner = (
    <>
      <span className="af-icon" aria-hidden>🏛️</span>
      <span>{label}</span>
    </>
  );
  if (asLink) {
    return (
      <Link to="/learn/what-is-bourbon" className={`af-badge af-${size}`} title={`${label} — 100 proof, single distillery, single season, aged 4+ years. A legal guarantee of authenticity. Tap to learn more.`}>
        {inner}
      </Link>
    );
  }
  return <span className={`af-badge af-${size}`}>{inner}</span>;
}

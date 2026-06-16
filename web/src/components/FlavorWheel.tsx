// Bourbon flavor vocabulary + a tappable chip wheel. Used by the tasting
// guide (Learn) and the notes/review editor (quick-add flavors).
export interface FlavorGroup {
  label: string;
  color: string;
  notes: string[];
}
export const FLAVOR_GROUPS: FlavorGroup[] = [
  { label: "Caramel & Sweet", color: "#B5651D", notes: ["Caramel", "Brown Sugar", "Toffee", "Butterscotch", "Maple", "Molasses"] },
  { label: "Vanilla & Cream", color: "#D4A574", notes: ["Vanilla", "Cream", "Custard", "Marshmallow", "Honey"] },
  { label: "Oak & Wood", color: "#A66A33", notes: ["Charred Oak", "Toasted Oak", "Cedar", "Sawdust", "Tannin"] },
  { label: "Grain", color: "#C28A3D", notes: ["Corn", "Rye Bread", "Biscuit", "Cereal", "Malt"] },
  { label: "Spice", color: "#8B4513", notes: ["Cinnamon", "Black Pepper", "Clove", "Nutmeg", "Allspice", "Ginger"] },
  { label: "Fruit", color: "#9E3A2A", notes: ["Cherry", "Dried Fig", "Orange Peel", "Apple", "Raisin", "Stone Fruit"] },
  { label: "Nutty", color: "#897a63", notes: ["Almond", "Pecan", "Walnut", "Hazelnut", "Peanut"] },
  { label: "Smoke & Char", color: "#5E4B3B", notes: ["Smoke", "Char", "Tobacco", "Espresso", "Dark Chocolate"] },
  { label: "Floral & Herbal", color: "#7C8C5A", notes: ["Mint", "Rose", "Tea", "Eucalyptus", "Dried Herbs"] },
  { label: "Earthy", color: "#6B5D4A", notes: ["Leather", "Tobacco Leaf", "Cocoa", "Earth"] },
];

export const ALL_NOTES = FLAVOR_GROUPS.flatMap((g) => g.notes);

interface Props {
  selected: string[];
  onToggle: (note: string) => void;
}

export default function FlavorWheel({ selected, onToggle }: Props) {
  return (
    <div className="flavor-wheel">
      {FLAVOR_GROUPS.map((g) => (
        <div key={g.label} className="fg-group">
          <div className="fg-label" style={{ color: g.color }}>{g.label}</div>
          <div className="tags">
            {g.notes.map((n) => (
              <button
                key={n}
                className={`tag${selected.includes(n) ? " solid" : ""}`}
                style={selected.includes(n) ? { background: g.color } : undefined}
                onClick={() => onToggle(n)}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

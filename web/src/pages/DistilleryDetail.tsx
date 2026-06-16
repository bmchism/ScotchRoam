import { useParams, Link } from "react-router-dom";
import AppBar from "../components/AppBar";
import { distilleries } from "../data/distilleries";
import { bottles } from "../data/bottles";
import { BarrelIcon } from "../icons";

export default function DistilleryDetail() {
  const { id } = useParams<{ id: string }>();
  const distillery = id ? distilleries[id] : undefined;

  if (!distillery) {
    return (
      <>
        <AppBar title="Distillery" back />
        <main className="screen">
          <div className="stub">
            <div className="icn">🥃</div>
            <h3>Distillery not found</h3>
            <p>We don't have this distillery in our database yet.</p>
          </div>
        </main>
      </>
    );
  }

  const distilleryBottles = bottles.filter((b) => b.distilleryId === id);

  return (
    <>
      <AppBar title={distillery.name} back />
      <main className="screen">
        <div className="hero" style={{ background: `linear-gradient(145deg, #722F37, #4a1c22)` }}>
          <span style={{ display: "inline-flex", background: "rgba(255,255,255,.15)", borderRadius: 10, padding: 8 }}>
            <BarrelIcon size={28} />
          </span>
          <div className="brand">{distillery.name}</div>
          <div className="hero-sub">{distillery.region}{distillery.country ? ` · ${distillery.country}` : ""}</div>
        </div>

        {distillery.notes && (
          <div className="notes">
            <span className="qt">"</span>
            {distillery.notes}
          </div>
        )}

        <div className="spec-grid">
          {distillery.region && <div className="spec"><div className="k">Region</div><div className="v">{distillery.region}</div></div>}
          {distillery?.masterDistiller && <div className="spec"><div className="k">Master distiller</div><div className="v">{distillery?.masterDistiller}</div></div>}
          {distillery?.otherBrands && distillery?.otherBrands.length > 0 && (
            <div className="spec full"><div className="k">Other brands</div><div className="v">{distillery?.otherBrands.join(", ")}</div></div>
          )}
          {distillery.website && (
            <div className="spec full"><div className="k">Website</div><div className="v"><a href={distillery.website} target="_blank" rel="noreferrer" style={{ color: "var(--amber)" }}>{distillery.website.replace(/https?:\/\//, "")}</a></div></div>
          )}
        </div>

        {distilleryBottles.length > 0 && (
          <>
            <div className="section-head">
              <span className="kicker">In our collection</span>
              <h2>Bottles from {distillery.name}</h2>
            </div>
            <div className="list">
              {distilleryBottles.map((b) => (
                <Link key={b.id} to={`/bottle/${b.id}`} className="card tap" style={{ display: "block" }}>
                  <div style={{ fontFamily: "var(--serif)", fontWeight: 600, fontSize: 16 }}>{b.name}</div>
                  <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 3 }}>
                    {b.style ?? b.expression}{b.age ? ` · ${b.age}` : ""} · {b.region}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}

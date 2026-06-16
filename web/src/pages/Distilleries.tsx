import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AppBar from "../components/AppBar";
import { distilleries } from "../data/distilleries";
import { BarrelIcon } from "../icons";

const all = Object.values(distilleries);
const countries = [...new Set(all.map((w) => w.country || "Other"))].sort();

export default function Distilleries() {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? all : all.filter((w) => (w.country || "Other") === filter);

  return (
    <>
      <AppBar title="Distilleries" back />
      <main className="screen">
        <div className="page-title">
          <span className="kicker">Meet the producers</span>
          <h1>Bourbon Distilleries</h1>
          <p>From Buffalo Trace to Heaven Hill — the people and places behind the bottles.</p>
        </div>

        <div className="chips">
          <button className={`chip ${filter === "All" ? "active" : ""}`} onClick={() => setFilter("All")}>All</button>
          {countries.map((c) => (
            <button key={c} className={`chip ${filter === c ? "active" : ""}`} onClick={() => setFilter(c)}>{c}</button>
          ))}
        </div>

        <div className="list">
          {shown.map((w, i) => (
            <motion.div
              key={w.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Link to={`/distillery/${w.id}`} className="card tap" style={{ display: "block" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(150deg, #722F37, #4a1c22)", display: "grid", placeItems: "center", color: "#fff", flexShrink: 0 }}>
                    <BarrelIcon size={20} />
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontFamily: "var(--serif)", fontWeight: 600, fontSize: 16 }}>{w.name}</div>
                    <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>
                      {w.region}{w.country ? ` · ${w.country}` : ""}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </>
  );
}

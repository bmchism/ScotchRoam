import { Link } from "react-router-dom";
import AppBar from "../components/AppBar";
import VideoEmbed from "../components/VideoEmbed";
import { articles } from "../data/learn";
import { PHOTOS } from "../data/process";
import { wineTypeGuides } from "../data/learn";

const VIDEOS = [
  { id: "Wq3HvFCgTfk", title: "Bourbon 101 — A Beginner's Guide" },
  { id: "8wBfStXP6PE", title: "How to Taste Bourbon Like a Pro" },
];

export default function Learn() {
  return (
    <>
      <AppBar title="Learn" back />
      <main className="screen">
        <div className="page-title">
          <span className="kicker">Bourbon 101</span>
          <h1>Learn the Barrel</h1>
          <p>
            What bourbon is, how it's made, and what sets each style apart —
            the foundation for a great tasting.
          </p>
        </div>

        <figure className="learn-hero">
          <img
            src={PHOTOS.barrels}
            alt="Bourbon barrels aging in a Kentucky rickhouse"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => { (e.currentTarget.closest("figure") as HTMLElement).style.display = "none"; }}
          />
          <figcaption>Bourbon barrels aging in a rickhouse</figcaption>
        </figure>

        <div className="section-head">
          <span className="kicker">Start here</span>
          <h2>How to Taste</h2>
        </div>
        <Link to="/learn/how-to-taste-bourbon" className="journey-cta tap">
          <div className="journey-scene" style={{ display: "grid", placeItems: "center", fontSize: 44 }}>🥃</div>
          <div className="journey-body">
            <div className="journey-title">The Bourbon Tasting Method</div>
            <p>Look, nose, taste, finish — a structured approach to any pour of bourbon.</p>
            <span className="journey-go">Learn to taste →</span>
          </div>
        </Link>

        <div className="section-head">
          <span className="kicker">Bourbon styles</span>
          <h2>The Eight Styles</h2>
        </div>
        <div className="list">
          {wineTypeGuides.map((e) => (
            <div key={e.wineType} className="card">
              <div className="exp-row">
                <div className="swatch" style={{ background: e.accent }} />
                <div>
                  <div className="ttl">{e.wineType}</div>
                  <div className="ag">{e.description}</div>
                  <div className="pf">{e.profile}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="section-head">
          <span className="kicker">Articles</span>
          <h2>Essential Reading</h2>
        </div>
        <div className="list">
          {articles.map((a) => (
            <Link key={a.slug} to={`/learn/${a.slug}`} className="card tap" style={{ display: "block" }}>
              <span className="kicker">{a.kicker}</span>
              <div style={{ fontFamily: "var(--serif)", fontWeight: 600, fontSize: 17, marginTop: 3 }}>{a.title}</div>
              <div className="muted" style={{ marginTop: 3 }}>{a.subtitle}</div>
            </Link>
          ))}
        </div>

        <div className="section-head">
          <span className="kicker">Watch</span>
          <h2>Videos</h2>
        </div>
        <div className="list">
          {VIDEOS.map((v) => (
            <VideoEmbed key={v.id} id={v.id} title={v.title} />
          ))}
        </div>

        <div className="section-head">
          <span className="kicker">Deep dive</span>
          <h2>How Bourbon Is Made</h2>
        </div>
        <Link to="/learn/process" className="journey-cta tap">
          <div className="journey-scene" style={{ display: "grid", placeItems: "center", fontSize: 44 }}>🛢️</div>
          <div className="journey-body">
            <div className="journey-title">The 8-stage journey</div>
            <p>Grain to glass — tap through an interactive, illustrated walkthrough of how bourbon is made.</p>
            <span className="journey-go">Start the journey →</span>
          </div>
        </Link>
      </main>
    </>
  );
}

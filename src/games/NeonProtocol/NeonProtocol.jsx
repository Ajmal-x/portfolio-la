
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import NeonRush from "./NeonRush";
import FinalProtocol from "./FinalProtocol";
import WordMatrix from "./WordMatrix";

const modes = [
  {
    id: "racing",
    number: "01",
    title: "NEON RUSH",
    category: "ARCADE / RACING",
    description: "Dodge obstacles. Push your limits. Own the track.",
    icon: "↗",
    color: "#00bcd4",
  },
  {
    id: "puzzle",
    number: "02",
    title: "WORD MATRIX",
    category: "WORD / PUZZLE",
    description: "Discover hidden words. Connect letters. Challenge your mind.",
    icon: "⌘",
    color: "#9b6bdb",
  },
  {
    id: "challenge",
    number: "03",
    title: "FINAL PROTOCOL",
    category: "SPEED / CHALLENGE",
    description: "Test your reflexes in a race against time.",
    icon: "ϟ",
    color: "#e99a35",
  },
];

export default function NeonProtocol() {
  const { dark } = useTheme();

  const [activeMode, setActiveMode] = useState(null);
  const [bestScore, setBestScore] = useState(0);

  const exitGame = () => {
    setActiveMode(null);
  };

  const startGame = (mode) => {
    setActiveMode(mode);
  };

  return (
    <main
      className="np-shell"
      data-theme={dark ? "dark" : "light"}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700;800&display=swap');

        .np-shell {
          --np-bg: #070912;
          --np-text: #f4f7ff;
          --np-muted: #929bb0;
          --np-subtle: #77839b;
          --np-border: #252d40;
          --np-border-strong: #202638;
          --np-card-bg: linear-gradient(145deg, #141b2b, #0b101c);
          --np-stat-bg: rgba(17,22,37,.72);
          --np-play-text: #eaf3ff;
          --np-footer-strong: #a8b4c9;
          --np-back-text: #c7d4e8;
          --np-grid-color: rgba(0,229,255,.035);
          --np-shadow: 0 15px 45px #0008;
          --np-panel-bg: rgba(12,17,30,.65);
          --np-input-bg: #111827;
          --np-heading-color: #00e5ff;

          min-height: 100vh;
          background: var(--np-bg);
          color: var(--np-text);
          font-family: Inter, sans-serif;
          padding: 24px;
          position: relative;
          overflow: hidden;
          isolation: isolate;
          transition: background .35s ease, color .35s ease;
        }

        .np-shell[data-theme="light"] {
          --np-bg: #f5f7fb;
          --np-text: #172033;
          --np-muted: #647087;
          --np-subtle: #78849a;
          --np-border: #dce3ee;
          --np-border-strong: #dce3ee;
          --np-card-bg: linear-gradient(145deg, #ffffff, #f0f4fa);
          --np-stat-bg: rgba(255,255,255,.85);
          --np-play-text: #26334a;
          --np-footer-strong: #35445c;
          --np-back-text: #35445c;
          --np-grid-color: rgba(0,130,160,.055);
          --np-shadow: 0 15px 40px rgba(30,50,80,.10);
          --np-panel-bg: rgba(255,255,255,.8);
          --np-input-bg: #ffffff;
          --np-heading-color: #009bb5;
        }

        .np-shell,
        .np-shell * {
          box-sizing: border-box;
        }

        .np-shell button {
          font-family: inherit;
        }

        .np-shell::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -2;
          background-image:
            linear-gradient(var(--np-grid-color) 1px, transparent 1px),
            linear-gradient(90deg, var(--np-grid-color) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: linear-gradient(to bottom, black, transparent 90%);
          pointer-events: none;
        }

        .np-glow {
          position: absolute;
          width: 440px;
          height: 440px;
          border-radius: 50%;
          filter: blur(120px);
          opacity: .13;
          pointer-events: none;
          z-index: -1;
        }

        .np-glow.one {
          background: #00d9ff;
          top: 5%;
          left: -240px;
        }

        .np-glow.two {
          background: #7b35ff;
          right: -240px;
          top: 35%;
        }

        .np-shell[data-theme="light"] .np-glow {
          opacity: .09;
        }

        .np-container {
          max-width: 1180px;
          margin: auto;
          position: relative;
        }

        .np-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--np-border-strong);
          padding: 12px 0 22px;
          gap: 15px;
        }

        .np-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: Orbitron, sans-serif;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .np-brand-icon {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          color: #00bcd4;
          border: 1px solid #00bcd466;
          background: #00bcd410;
          font-size: 22px;
        }

        .np-nav-right {
          display: flex;
          align-items: center;
          gap: 20px;
          font-size: 11px;
          color: var(--np-muted);
          letter-spacing: 1px;
        }

        .np-live {
          color: #159b68;
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .np-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #24c982;
          box-shadow: 0 0 12px #24c982;
        }

        .np-hero {
          padding: 86px 0 55px;
          text-align: center;
        }

        .np-eyebrow {
          color: var(--np-heading-color);
          font-size: 10px;
          letter-spacing: 4px;
          font-weight: 700;
          margin-bottom: 24px;
        }

        .np-title {
          font-family: Orbitron, sans-serif;
          font-size: clamp(36px, 7vw, 76px);
          line-height: 1.12;
          font-weight: 900;
          letter-spacing: -3px;
          margin: 0;
          text-shadow: 0 0 45px rgba(0,190,220,.10);
        }

        .np-title span {
          color: var(--np-heading-color);
          text-shadow: 0 0 25px rgba(0,190,220,.20);
        }

        .np-subtitle {
          color: var(--np-muted);
          font-size: 14px;
          line-height: 1.8;
          max-width: 520px;
          margin: 24px auto 0;
        }

        .np-stats {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 38px;
          flex-wrap: wrap;
        }

        .np-stat {
          border: 1px solid var(--np-border);
          background: var(--np-stat-bg);
          padding: 13px 22px;
          min-width: 135px;
          transition: .3s ease;
        }

        .np-stat-label {
          color: var(--np-subtle);
          font-size: 9px;
          letter-spacing: 1.5px;
        }

        .np-stat-value {
          font-family: Orbitron, sans-serif;
          font-size: 18px;
          margin-top: 8px;
          color: var(--np-text);
        }

        .np-section-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
          gap: 12px;
        }

        .np-section-heading h2 {
          font-family: Orbitron, sans-serif;
          font-size: 13px;
          letter-spacing: 2px;
          margin: 0;
        }

        .np-section-heading span {
          font-size: 10px;
          color: var(--np-subtle);
          letter-spacing: 1px;
        }

        .np-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 17px;
        }

        .np-card {
          position: relative;
          min-height: 255px;
          padding: 25px;
          background: var(--np-card-bg);
          border: 1px solid var(--np-border);
          overflow: hidden;
          transition: .3s ease;
          cursor: pointer;
          color: var(--np-text);
        }

        .np-card:hover {
          transform: translateY(-6px);
          border-color: var(--accent);
          box-shadow: var(--np-shadow),
            0 0 25px color-mix(in srgb, var(--accent) 12%, transparent);
        }

        .np-card:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 4px;
        }

        .np-card::after {
          content: "";
          position: absolute;
          width: 170px;
          height: 170px;
          border-radius: 50%;
          background: var(--accent);
          filter: blur(90px);
          opacity: .12;
          right: -80px;
          top: -70px;
          pointer-events: none;
        }

        .np-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .np-card-number {
          color: var(--np-subtle);
          font-family: Orbitron, sans-serif;
          font-size: 11px;
        }

        .np-card-icon {
          color: var(--accent);
          font-size: 30px;
        }

        .np-card-category {
          font-size: 9px;
          color: var(--accent);
          letter-spacing: 2px;
          margin-top: 25px;
        }

        .np-card h3 {
          font-family: Orbitron, sans-serif;
          font-size: 18px;
          margin: 10px 0;
          letter-spacing: 1px;
          color: var(--np-text);
        }

        .np-card p {
          color: var(--np-muted);
          font-size: 12px;
          line-height: 1.7;
          min-height: 42px;
        }

        .np-play {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 0;
          border-top: 1px solid var(--np-border);
          background: transparent;
          color: var(--np-play-text);
          width: 100%;
          padding: 16px 0 0;
          margin-top: 17px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
          cursor: pointer;
          transition: color .2s ease;
        }

        .np-play:hover {
          color: var(--accent);
        }

        .np-footer {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          border-top: 1px solid var(--np-border-strong);
          margin-top: 65px;
          padding: 23px 0 10px;
          color: var(--np-subtle);
          font-size: 10px;
          letter-spacing: 1px;
        }

        .np-footer strong {
          color: var(--np-footer-strong);
        }

        .np-back {
          background: var(--np-panel-bg);
          border: 1px solid var(--np-border);
          color: var(--np-back-text);
          padding: 11px 16px;
          cursor: pointer;
          font-size: 10px;
          letter-spacing: 1px;
          margin-bottom: 25px;
          transition: .2s ease;
        }

        .np-back:hover {
          border-color: #00bcd4;
          color: var(--np-heading-color);
        }

        .np-game-panel {
          max-width: 1000px;
          margin: 55px auto;
          text-align: center;
          color: var(--np-text);
        }

        .np-game-panel h2 {
          font-family: Orbitron, sans-serif;
          color: var(--np-heading-color);
          letter-spacing: 2px;
        }

        .np-game-panel p {
          color: var(--np-muted);
          line-height: 1.8;
        }

        .np-game-button {
          padding: 13px 20px;
          border: 1px solid #00bcd4;
          background: rgba(0,188,212,.07);
          color: var(--np-heading-color);
          cursor: pointer;
          font-weight: 700;
          letter-spacing: 1px;
          margin: 8px;
        }

        .np-game-button:hover {
          background: rgba(0,188,212,.15);
        }

        @media(max-width: 760px) {
          .np-shell {
            padding: 16px;
          }

          .np-hero {
            padding: 65px 0 40px;
          }

          .np-grid {
            grid-template-columns: 1fr;
          }

          .np-card {
            min-height: 225px;
          }

          .np-nav-right {
            gap: 9px;
            font-size: 9px;
          }

          .np-title {
            letter-spacing: -2px;
          }

          .np-footer {
            flex-direction: column;
          }
        }

        @media(prefers-reduced-motion: reduce) {
          .np-shell *,
          .np-shell *::before,
          .np-shell *::after {
            transition-duration: .01ms !important;
            animation-duration: .01ms !important;
          }
        }
      `}</style>

      <div className="np-glow one" />
      <div className="np-glow two" />

      <div className="np-container">
        <nav className="np-nav">
          <div className="np-brand">
            <div className="np-brand-icon">ϟ</div>
            NEON PROTOCOL
          </div>

          <div className="np-nav-right">
            <span className="np-live">
              <span className="np-dot" />
              SYSTEM ONLINE
            </span>
            <span>V.01 / 2027</span>
          </div>
        </nav>

        {!activeMode ? (
          <>
            <section className="np-hero">
              <div className="np-eyebrow">
                [ INTERACTIVE GAMING EXPERIENCE ]
              </div>

              <h1 className="np-title">
                ENTER THE <span>UNKNOWN.</span>
              </h1>

              <p className="np-subtitle">
                Three challenges. One protocol. Test your reflexes, sharpen
                your mind and prove what you are capable of.
              </p>

              <div className="np-stats">
                <div className="np-stat">
                  <div className="np-stat-label">GAME MODES</div>
                  <div className="np-stat-value">03</div>
                </div>

                <div className="np-stat">
                  <div className="np-stat-label">BEST SCORE</div>
                  <div className="np-stat-value">{bestScore}</div>
                </div>

                <div className="np-stat">
                  <div className="np-stat-label">STATUS</div>
                  <div
                    className="np-stat-value"
                    style={{ color: "#24b879" }}
                  >
                    READY
                  </div>
                </div>
              </div>
            </section>

            <section>
              <div className="np-section-heading">
                <h2>SELECT YOUR PROTOCOL</h2>
                <span>CHOOSE YOUR CHALLENGE →</span>
              </div>

              <div className="np-grid">
                {modes.map((mode) => (
                  <article
                    className="np-card"
                    key={mode.id}
                    style={{ "--accent": mode.color }}
                    onClick={() => startGame(mode.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        startGame(mode.id);
                      }
                    }}
                  >
                    <div className="np-card-top">
                      <span className="np-card-number">
                        /{mode.number}
                      </span>
                      <span className="np-card-icon">
                        {mode.icon}
                      </span>
                    </div>

                    <div className="np-card-category">
                      {mode.category}
                    </div>

                    <h3>{mode.title}</h3>
                    <p>{mode.description}</p>

                    <button
                      type="button"
                      className="np-play"
                      onClick={(e) => {
                        e.stopPropagation();
                        startGame(mode.id);
                      }}
                    >
                      <span>INITIALIZE GAME</span>
                      <span>↗</span>
                    </button>
                  </article>
                ))}
              </div>
            </section>

            <footer className="np-footer">
              <span>
                DESIGNED & DEVELOPED BY{" "}
                <strong>ABDULLAH AHMADI</strong>
              </span>
              <span>NEON PROTOCOL © 2027</span>
            </footer>
          </>
        ) : (
          <section className="np-game-panel">
            {activeMode !== "racing" && activeMode !== "puzzle" && (
              <button
                type="button"
                className="np-back"
                onClick={exitGame}
              >
                ← BACK TO MAIN MENU
              </button>
            )}

            {activeMode === "racing" && (
              <NeonRush
                bestScore={bestScore}
                setBestScore={setBestScore}
                onExit={exitGame}
              />
            )}

            {activeMode === "puzzle" && (
              <WordMatrix
                onExit={exitGame}
                setBestScore={setBestScore}
              />
            )}

            {activeMode === "challenge" && (
              <FinalProtocol
                onExit={exitGame}
                setBestScore={setBestScore}
              />
            )}
          </section>
        )}
      </div>
    </main>
  );
}

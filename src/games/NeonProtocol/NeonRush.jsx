
import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const WIDTH = 640;
const HEIGHT = 420;

export default function NeonRush({ bestScore, setBestScore, onExit }) {
  const { dark } = useTheme();
  const canvasRef = useRef(null);

  const gameRef = useRef({
    lane: 1,
    obstacles: [],
    particles: [],
    score: 0,
    spawnTimer: 0,
    lastTime: 0,
    running: false,
    crashTime: 0,
  });

  const [status, setStatus] = useState("ready");
  const [score, setScore] = useState(0);
  const [crashEffect, setCrashEffect] = useState(false);

  const movePlayer = (direction) => {
    const game = gameRef.current;
    if (!game.running) return;

    game.lane = Math.max(0, Math.min(2, game.lane + direction));
  };

  const startGame = () => {
    gameRef.current = {
      lane: 1,
      obstacles: [],
      particles: [],
      score: 0,
      spawnTimer: 0,
      lastTime: 0,
      running: true,
      crashTime: 0,
    };

    setScore(0);
    setCrashEffect(false);
    setStatus("playing");
  };

  useEffect(() => {
    if (status !== "playing") return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const game = gameRef.current;

    let animationId;
    let lastScoreUpdate = 0;
    let crashTimeout;

    const keyHandler = (event) => {
      if (
        ["ArrowLeft", "ArrowRight", "a", "d", "A", "D"].includes(event.key)
      ) {
        event.preventDefault();
      }

      if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        movePlayer(-1);
      }

      if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        movePlayer(1);
      }
    };

    window.addEventListener("keydown", keyHandler);

    const drawCar = (x, y, color, width = 42, height = 65) => {
      ctx.shadowBlur = 20;
      ctx.shadowColor = color;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, width, height);

      ctx.shadowBlur = 0;
      ctx.fillStyle = "#073344";
      ctx.fillRect(x + 7, y + 10, width - 14, 19);

      ctx.fillStyle = "#d9fbff";
      ctx.fillRect(x + 7, y + 4, 8, 5);
      ctx.fillRect(x + width - 15, y + 4, 8, 5);

      ctx.fillStyle = "#ff426b";
      ctx.fillRect(x + 7, y + height - 10, 8, 5);
      ctx.fillRect(x + width - 15, y + height - 10, 8, 5);
    };

    const createExplosion = (x, y) => {
      game.particles = [];

      for (let i = 0; i < 32; i++) {
        const angle = Math.random() * Math.PI * 2;
        const force = 70 + Math.random() * 220;

        game.particles.push({
          x,
          y,
          vx: Math.cos(angle) * force,
          vy: Math.sin(angle) * force,
          life: 0.65 + Math.random() * 0.35,
          maxLife: 1,
          size: 2 + Math.random() * 5,
        });
      }

      game.crashTime = 0.45;
    };

    const draw = (time) => {
      const delta = Math.min((time - (game.lastTime || time)) / 1000, 0.04);
      game.lastTime = time;

      const laneWidth = WIDTH / 3;
      const playerWidth = 42;
      const playerHeight = 65;
      const playerY = HEIGHT - 90;
      const playerX =
        game.lane * laneWidth + laneWidth / 2 - playerWidth / 2;

      game.score += delta * 10;

      const speed = Math.min(750, 320 + game.score * 2);
      const spawnInterval = Math.max(0.7, 1.1 - game.score * 0.001);

      game.spawnTimer += delta;

      if (game.spawnTimer >= spawnInterval) {
        game.spawnTimer = 0;

        const availableLanes = [0, 1, 2].filter(
          (lane) =>
            !game.obstacles.some(
              (obstacle) => obstacle.lane === lane && obstacle.y < 100,
            ),
        );

        if (availableLanes.length > 0) {
          const lane =
            availableLanes[
              Math.floor(Math.random() * availableLanes.length)
            ];

          game.obstacles.push({
            lane,
            y: -65,
            width: 42,
            height: 58,
          });
        }
      }

      game.obstacles.forEach((obstacle) => {
        obstacle.y += speed * delta;
      });

      game.obstacles = game.obstacles.filter(
        (obstacle) => obstacle.y < HEIGHT + 70,
      );

      const hitObstacle = game.obstacles.find((obstacle) => {
        const obstacleX =
          obstacle.lane * laneWidth + laneWidth / 2 - obstacle.width / 2;

        return (
          playerX < obstacleX + obstacle.width - 8 &&
          playerX + playerWidth > obstacleX + 8 &&
          playerY < obstacle.y + obstacle.height - 8 &&
          playerY + playerHeight > obstacle.y + 8
        );
      });

      if (hitObstacle && game.running) {
        game.running = false;

        createExplosion(
          playerX + playerWidth / 2,
          playerY + playerHeight / 2,
        );

        setBestScore((previous) =>
          Math.max(previous, Math.floor(game.score)),
        );

        setScore(Math.floor(game.score));
        setCrashEffect(true);

        crashTimeout = setTimeout(() => {
          setCrashEffect(false);
          setStatus("over");
        }, 450);
      }

      // Theme-aware canvas colors
      const canvasColors = dark
        ? {
            background: "#080d19",
            road: "#111a2b",
            lanes: "#40516c",
            border: "#00e5ff",
            score: "#ffffff",
          }
        : {
            background: "#edf3f8",
            road: "#d7e2ec",
            lanes: "#9aafc1",
            border: "#009bb5",
            score: "#172b40",
          };

      // Background
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      ctx.fillStyle = canvasColors.background;
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      // Road
      ctx.fillStyle = canvasColors.road;
      ctx.fillRect(35, 0, WIDTH - 70, HEIGHT);

      // Road borders
      ctx.strokeStyle = canvasColors.border;
      ctx.lineWidth = 2;
      ctx.shadowBlur = dark ? 12 : 5;
      ctx.shadowColor = canvasColors.border;

      ctx.beginPath();
      ctx.moveTo(35, 0);
      ctx.lineTo(35, HEIGHT);
      ctx.moveTo(WIDTH - 35, 0);
      ctx.lineTo(WIDTH - 35, HEIGHT);
      ctx.stroke();

      ctx.shadowBlur = 0;

      // Animated lane dividers
      ctx.strokeStyle = canvasColors.lanes;
      ctx.lineWidth = 2;
      ctx.setLineDash([25, 20]);
      ctx.lineDashOffset = -(time * 0.12);

      for (let i = 1; i <= 2; i++) {
        ctx.beginPath();
        ctx.moveTo(i * laneWidth, 0);
        ctx.lineTo(i * laneWidth, HEIGHT);
        ctx.stroke();
      }

      ctx.setLineDash([]);
      ctx.lineDashOffset = 0;

      // Obstacles
      game.obstacles.forEach((obstacle) => {
        const x =
          obstacle.lane * laneWidth + laneWidth / 2 - obstacle.width / 2;

        drawCar(x, obstacle.y, "#ff426b", obstacle.width, obstacle.height);
      });

      // Player
      if (game.running) {
        drawCar(playerX, playerY, "#00d9ff");
      }

      // Explosion particles
      game.particles.forEach((particle) => {
        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;
        particle.vx *= 0.96;
        particle.vy *= 0.96;
        particle.life -= delta;

        if (particle.life > 0) {
          ctx.globalAlpha = Math.max(0, particle.life / particle.maxLife);
          ctx.fillStyle = "#00e5ff";
          ctx.shadowBlur = 15;
          ctx.shadowColor = "#00e5ff";

          ctx.beginPath();
          ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2,
          );
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      game.particles = game.particles.filter(
        (particle) => particle.life > 0,
      );

      // Crash flash
      if (game.crashTime > 0) {
        game.crashTime -= delta;
        ctx.fillStyle = `rgba(0, 229, 255, ${game.crashTime * 0.35})`;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
      }

      // Score
      ctx.fillStyle = canvasColors.score;
      ctx.font = "bold 18px Arial";
      ctx.fillText(`SCORE: ${Math.floor(game.score)}`, 52, 32);

      if (time - lastScoreUpdate > 150) {
        setScore(Math.floor(game.score));
        lastScoreUpdate = time;
      }

      if (game.running || game.particles.length > 0) {
        animationId = requestAnimationFrame(draw);
      }
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(crashTimeout);
      window.removeEventListener("keydown", keyHandler);
    };
  }, [status, setBestScore, dark]);

  return (
    <section
      className="nr-container"
      data-theme={dark ? "dark" : "light"}
    >
      <style>{`
        .nr-container {
          --nr-text: #f4f7ff;
          --nr-muted: #a5b2c8;
          --nr-subtle: #74829b;
          --nr-border: #344158;
          --nr-panel: #070912e8;
          --nr-panel-bg: #111a2b;
          --nr-button-text: #00e5ff;
          --nr-button-bg: #00e5ff15;
          --nr-control-text: #00e5ff;

          width: 100%;
          max-width: 720px;
          margin: 45px auto;
          color: var(--nr-text);
          text-align: center;
        }

        .nr-container[data-theme="light"] {
          --nr-text: #172033;
          --nr-muted: #586981;
          --nr-subtle: #74849a;
          --nr-border: #cbd7e4;
          --nr-panel: rgba(255,255,255,.94);
          --nr-panel-bg: #e8eff6;
          --nr-button-text: #008ba3;
          --nr-button-bg: rgba(0,155,181,.08);
          --nr-control-text: #008ba3;
        }

        .nr-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          margin-bottom: 18px;
          flex-wrap: wrap;
        }

        .nr-header h2 {
          font-family: Orbitron, sans-serif;
          color: var(--nr-button-text);
          font-size: 20px;
          letter-spacing: 2px;
          margin: 0;
        }

        .nr-score {
          color: var(--nr-button-text);
          font-family: Orbitron, sans-serif;
          font-size: 13px;
        }

        .nr-canvas-wrap {
          position: relative;
          border: 1px solid rgba(0,188,212,.55);
          background: var(--nr-panel-bg);
          box-shadow: 0 0 35px rgba(0,188,212,.08);
          overflow: hidden;
          transition: transform 0.08s ease;
        }

        .nr-canvas-wrap.crashed {
          animation: nr-shake 0.4s ease;
          border-color: #ff426b;
          box-shadow: 0 0 35px #ff426b55;
        }

        @keyframes nr-shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-7px); }
          40% { transform: translateX(7px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }

        .nr-canvas {
          display: block;
          width: 100%;
          height: auto;
        }

        .nr-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: var(--nr-panel);
          backdrop-filter: blur(6px);
        }

        .nr-overlay h3 {
          font-family: Orbitron, sans-serif;
          color: var(--nr-button-text);
          font-size: clamp(22px, 5vw, 34px);
          margin: 0 0 12px;
        }

        .nr-overlay p {
          color: var(--nr-muted);
          font-size: 13px;
          line-height: 1.8;
        }

        .nr-final-score {
          color: var(--nr-text);
          font-family: Orbitron, sans-serif;
          font-size: 22px;
          margin: 8px 0;
        }

        .nr-best-score {
          color: var(--nr-button-text);
          font-size: 12px;
          letter-spacing: 1px;
        }

        .nr-button {
          padding: 13px 23px;
          border: 1px solid var(--nr-button-text);
          background: var(--nr-button-bg);
          color: var(--nr-button-text);
          font-weight: 700;
          letter-spacing: 1px;
          cursor: pointer;
          margin-top: 12px;
          transition: 0.2s ease;
        }

        .nr-button:hover {
          background: rgba(0,188,212,.16);
          box-shadow: 0 0 20px rgba(0,188,212,.2);
        }

        .nr-controls {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 15px;
          margin: 18px 0;
        }

        .nr-control {
          width: 65px;
          height: 45px;
          border: 1px solid var(--nr-border);
          background: var(--nr-panel-bg);
          color: var(--nr-control-text);
          font-size: 22px;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .nr-control:hover {
          border-color: var(--nr-button-text);
          background: var(--nr-button-bg);
        }

        .nr-control:active {
          background: rgba(0,188,212,.2);
          transform: scale(0.95);
        }

        .nr-hint {
          color: var(--nr-subtle);
          font-size: 11px;
          letter-spacing: 1px;
          margin: 12px 0 20px;
        }

        .nr-back {
          display: block;
          margin: 25px auto 0;
          border: 0;
          background: transparent;
          color: var(--nr-muted);
          cursor: pointer;
          font-size: 11px;
          letter-spacing: 1px;
        }

        .nr-back:hover {
          color: var(--nr-button-text);
        }

        @media (max-width: 500px) {
          .nr-header {
            justify-content: center;
          }

          .nr-hint {
            font-size: 9px;
          }
        }

        @media(prefers-reduced-motion: reduce) {
          .nr-container *,
          .nr-container *::before,
          .nr-container *::after {
            animation-duration: .01ms !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>

      <div className="nr-header">
        <h2>NEON RUSH</h2>
        <div className="nr-score">
          SCORE: {score} / BEST: {bestScore}
        </div>
      </div>

      <div className={`nr-canvas-wrap ${crashEffect ? "crashed" : ""}`}>
        <canvas
          ref={canvasRef}
          className="nr-canvas"
          width={WIDTH}
          height={HEIGHT}
        />

        {status !== "playing" && (
          <div className="nr-overlay">
            <h3>{status === "ready" ? "READY TO RACE?" : "GAME OVER"}</h3>

            <p>
              {status === "ready"
                ? "Dodge the obstacles and survive as long as possible."
                : "Your race has ended. Can you beat your record?"}
            </p>

            {status === "over" && (
              <>
                <div className="nr-final-score">{score}</div>
                <div className="nr-best-score">
                  PERSONAL BEST: {bestScore}
                </div>
              </>
            )}

            <button className="nr-button" onClick={startGame}>
              {status === "ready" ? "START GAME" : "PLAY AGAIN"}
            </button>
          </div>
        )}
      </div>

      <div className="nr-controls">
        <button
          className="nr-control"
          onClick={() => movePlayer(-1)}
          aria-label="Move left"
        >
          ←
        </button>

        <button
          className="nr-control"
          onClick={() => movePlayer(1)}
          aria-label="Move right"
        >
          →
        </button>
      </div>

      <p className="nr-hint">
        KEYBOARD: ← → OR A / D &nbsp; • &nbsp; AVOID THE RED OBSTACLES
      </p>

      <button className="nr-back" onClick={onExit}>
        ← BACK TO MAIN MENU
      </button>
    </section>
  );
}

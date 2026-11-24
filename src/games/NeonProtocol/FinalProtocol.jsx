
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowDown,
  ArrowUp,
  ArrowRight,
  Pause,
  Play,
  RotateCcw,
  Trophy,
  Zap,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const COLS = 10;
const ROWS = 20;

const SHAPES = [
  { shape: [[1, 1, 1, 1]], color: "#22d3ee" },
  { shape: [[1, 1], [1, 1]], color: "#facc15" },
  { shape: [[0, 1, 0], [1, 1, 1]], color: "#c084fc" },
  { shape: [[1, 0, 0], [1, 1, 1]], color: "#fb923c" },
  { shape: [[0, 0, 1], [1, 1, 1]], color: "#60a5fa" },
  { shape: [[0, 1, 1], [1, 1, 0]], color: "#4ade80" },
  { shape: [[1, 1, 0], [0, 1, 1]], color: "#f472b6" },
];

const createBoard = () =>
  Array.from({ length: ROWS }, () => Array(COLS).fill(null));

const randomPiece = () => {
  const item = SHAPES[Math.floor(Math.random() * SHAPES.length)];

  return {
    shape: item.shape.map((row) => [...row]),
    color: item.color,
    x: Math.floor((COLS - item.shape[0].length) / 2),
    y: 0,
  };
};

const rotateShape = (shape) =>
  shape[0].map((_, i) => shape.map((row) => row[i]).reverse());

export default function FinalProtocol({ onExit, setBestScore }) {
  const { dark } = useTheme();

  const [board, setBoard] = useState(createBoard);
  const [piece, setPiece] = useState(randomPiece);
  const [nextPiece, setNextPiece] = useState(randomPiece);
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [status, setStatus] = useState("ready");
  const [particles, setParticles] = useState([]);
  const [flash, setFlash] = useState(false);

  const boardRef = useRef(board);
  const pieceRef = useRef(piece);
  const nextRef = useRef(nextPiece);
  const statusRef = useRef(status);
  const scoreRef = useRef(score);
  const flashTimerRef = useRef(null);
  const particleTimerRef = useRef(null);

  useEffect(() => {
    boardRef.current = board;
    pieceRef.current = piece;
    nextRef.current = nextPiece;
    statusRef.current = status;
    scoreRef.current = score;
  }, [board, piece, nextPiece, status, score]);

  const collides = useCallback((p, b) => {
    return p.shape.some((row, dy) =>
      row.some((value, dx) => {
        if (!value) return false;

        const x = p.x + dx;
        const y = p.y + dy;

        return (
          x < 0 ||
          x >= COLS ||
          y >= ROWS ||
          (y >= 0 && b[y][x])
        );
      })
    );
  }, []);

  const spawnNext = useCallback((currentBoard) => {
    const next = nextRef.current;

    const fresh = {
      ...next,
      shape: next.shape.map((row) => [...row]),
      x: Math.floor((COLS - next.shape[0].length) / 2),
      y: 0,
    };

    const upcoming = randomPiece();

    nextRef.current = upcoming;
    setNextPiece(upcoming);

    if (collides(fresh, currentBoard)) {
      setStatus("over");
      statusRef.current = "over";
      return null;
    }

    pieceRef.current = fresh;
    setPiece(fresh);

    return fresh;
  }, [collides]);

  const lockPiece = useCallback((currentPiece, currentBoard) => {
    const merged = currentBoard.map((row) => [...row]);

    currentPiece.shape.forEach((row, dy) => {
      row.forEach((value, dx) => {
        const y = currentPiece.y + dy;
        const x = currentPiece.x + dx;

        if (value && y >= 0 && y < ROWS && x >= 0 && x < COLS) {
          merged[y][x] = currentPiece.color;
        }
      });
    });

    const clearedRows = merged.filter((row) => row.every(Boolean)).length;
    const remaining = merged.filter((row) => !row.every(Boolean));

    const newBoard = [
      ...Array.from({ length: clearedRows }, () => Array(COLS).fill(null)),
      ...remaining,
    ];

    if (clearedRows > 0) {
      const points = [0, 100, 300, 500, 800][clearedRows] || 800;
      const newScore = scoreRef.current + points * level;

      scoreRef.current = newScore;
      setScore(newScore);

      setLines((old) => {
        const updatedLines = old + clearedRows;
        setLevel(Math.floor(updatedLines / 10) + 1);
        return updatedLines;
      });

      setFlash(true);

      clearTimeout(flashTimerRef.current);
      flashTimerRef.current = setTimeout(() => {
        setFlash(false);
      }, 180);

      const newParticles = Array.from({ length: 18 }, (_, i) => ({
        id: `${Date.now()}-${i}`,
        x: Math.random() * 100,
        y: 20 + Math.random() * 60,
      }));

      setParticles(newParticles);

      clearTimeout(particleTimerRef.current);
      particleTimerRef.current = setTimeout(() => {
        setParticles([]);
      }, 550);
    }

    boardRef.current = newBoard;
    setBoard(newBoard);

    spawnNext(newBoard);
  }, [level, spawnNext]);

  const moveDown = useCallback(() => {
    if (statusRef.current !== "playing") return;

    const current = pieceRef.current;
    const moved = { ...current, y: current.y + 1 };

    if (!collides(moved, boardRef.current)) {
      pieceRef.current = moved;
      setPiece(moved);
    } else {
      lockPiece(current, boardRef.current);
    }
  }, [collides, lockPiece]);

  const moveHorizontal = useCallback((direction) => {
    if (statusRef.current !== "playing") return;

    const current = pieceRef.current;
    const moved = { ...current, x: current.x + direction };

    if (!collides(moved, boardRef.current)) {
      pieceRef.current = moved;
      setPiece(moved);
    }
  }, [collides]);

  const rotate = useCallback(() => {
    if (statusRef.current !== "playing") return;

    const current = pieceRef.current;
    const rotated = rotateShape(current.shape);

    const candidates = [
      { x: current.x, y: current.y },
      { x: current.x - 1, y: current.y },
      { x: current.x + 1, y: current.y },
      { x: current.x, y: current.y - 1 },
    ];

    for (const position of candidates) {
      const test = { ...current, ...position, shape: rotated };

      if (!collides(test, boardRef.current)) {
        pieceRef.current = test;
        setPiece(test);
        break;
      }
    }
  }, [collides]);

  const hardDrop = useCallback(() => {
    if (statusRef.current !== "playing") return;

    let current = { ...pieceRef.current };

    while (
      !collides(
        { ...current, y: current.y + 1 },
        boardRef.current
      )
    ) {
      current.y += 1;
    }

    pieceRef.current = current;
    setPiece(current);

    lockPiece(current, boardRef.current);
  }, [collides, lockPiece]);

  const startGame = () => {
    const freshBoard = createBoard();
    const freshPiece = randomPiece();
    const freshNext = randomPiece();

    boardRef.current = freshBoard;
    pieceRef.current = freshPiece;
    nextRef.current = freshNext;
    statusRef.current = "playing";
    scoreRef.current = 0;

    setBoard(freshBoard);
    setPiece(freshPiece);
    setNextPiece(freshNext);
    setScore(0);
    setLines(0);
    setLevel(1);
    setParticles([]);
    setFlash(false);
    setStatus("playing");
  };

  const togglePause = () => {
    setStatus((old) => {
      const next = old === "playing" ? "paused" : "playing";
      statusRef.current = next;
      return next;
    });
  };

  useEffect(() => {
    if (status !== "playing") return;

    const interval = setInterval(() => {
      moveDown();
    }, Math.max(100, 750 - (level - 1) * 65));

    return () => clearInterval(interval);
  }, [status, level, moveDown]);

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") {
        if (
          statusRef.current === "playing" ||
          statusRef.current === "paused"
        ) {
          togglePause();
        }
        return;
      }

      if (statusRef.current !== "playing") return;

      if (
        ["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", " "]
          .includes(event.key)
      ) {
        event.preventDefault();
      }

      switch (event.key) {
        case "ArrowLeft":
        case "a":
        case "A":
          moveHorizontal(-1);
          break;

        case "ArrowRight":
        case "d":
        case "D":
          moveHorizontal(1);
          break;

        case "ArrowDown":
        case "s":
        case "S":
          moveDown();
          break;

        case "ArrowUp":
        case "w":
        case "W":
          rotate();
          break;

        case " ":
          hardDrop();
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [moveHorizontal, moveDown, rotate, hardDrop]);

  useEffect(() => {
    return () => {
      clearTimeout(flashTimerRef.current);
      clearTimeout(particleTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (status === "over" && setBestScore) {
      setBestScore((old) => Math.max(old, scoreRef.current));
    }
  }, [status, setBestScore]);

  const renderCell = (color, key) => (
    <div
      key={key}
      className="fp-cell"
      style={{
        background: color || (dark
          ? "rgba(255,255,255,0.035)"
          : "rgba(15,35,65,0.045)"),
        border: color
          ? `1px solid ${color}`
          : `1px solid ${dark
              ? "rgba(255,255,255,0.07)"
              : "rgba(15,35,65,0.11)"}`,
        boxShadow: color
          ? `inset 0 0 8px ${color}55, 0 0 8px ${color}55`
          : "none",
      }}
    />
  );

  const displayBoard = board.map((row) => [...row]);

  if (piece && status !== "over") {
    piece.shape.forEach((row, dy) => {
      row.forEach((value, dx) => {
        const x = piece.x + dx;
        const y = piece.y + dy;

        if (value && y >= 0 && y < ROWS && x >= 0 && x < COLS) {
          displayBoard[y][x] = piece.color;
        }
      });
    });
  }

  const panelClass = dark
    ? "border-white/10 bg-white/[0.035]"
    : "border-slate-200 bg-white shadow-sm";

  const mutedClass = dark ? "text-slate-400" : "text-slate-600";
  const labelClass = dark ? "text-slate-500" : "text-slate-500";
  const textClass = dark ? "text-white" : "text-slate-900";

  return (
    <section
      data-theme={dark ? "dark" : "light"}
      className={`fp-shell relative w-full overflow-hidden rounded-3xl border p-4 shadow-xl transition-colors duration-300 sm:p-7 ${
        dark
          ? "border-cyan-400/20 bg-[#070b16] text-white shadow-[0_0_60px_rgba(34,211,238,0.08)]"
          : "border-slate-200 bg-slate-50 text-slate-900 shadow-[0_15px_50px_rgba(30,50,80,0.10)]"
      }`}
    >
      <style>{`
        @keyframes fp-pop {
          0% { transform: scale(.4); opacity: 1; }
          100% { transform: scale(1.8); opacity: 0; }
        }

        .fp-grid {
          display: grid;
          grid-template-columns: repeat(10, minmax(0, 1fr));
          gap: 3px;
          width: 100%;
        }

        .fp-board {
          width: min(100%, 360px);
          margin: auto;
        }

        .fp-cell {
          aspect-ratio: 1 / 1;
          width: 100%;
          min-width: 0;
          border-radius: 5px;
          transition: background 100ms;
        }

        .fp-control {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 48px;
          border: 1px solid var(--fp-control-border);
          border-radius: 12px;
          background: var(--fp-control-bg);
          color: var(--fp-control-text);
          transition: .15s;
        }

        .fp-control:hover:not(:disabled) {
          background: var(--fp-control-hover);
          border-color: #22d3ee;
        }

        .fp-control:active:not(:disabled) {
          transform: scale(.94);
        }

        .fp-control:disabled {
          opacity: .3;
          cursor: not-allowed;
        }

        .fp-shell[data-theme="dark"] {
          --fp-control-border: rgba(34,211,238,.25);
          --fp-control-bg: rgba(34,211,238,.07);
          --fp-control-text: #67e8f9;
          --fp-control-hover: rgba(34,211,238,.2);
          --fp-overlay: rgba(3,7,18,.90);
        }

        .fp-shell[data-theme="light"] {
          --fp-control-border: rgba(8,145,178,.25);
          --fp-control-bg: rgba(8,145,178,.06);
          --fp-control-text: #087e9b;
          --fp-control-hover: rgba(8,145,178,.15);
          --fp-overlay: rgba(238,243,250,.94);
        }

        @media (max-width: 420px) {
          .fp-board {
            width: min(100%, 320px);
          }

          .fp-grid {
            gap: 2px;
          }

          .fp-cell {
            border-radius: 3px;
          }

          .fp-control {
            width: 46px;
            height: 44px;
          }
        }
      `}</style>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: dark ? 0.2 : 0.35,
          backgroundImage:
            "linear-gradient(rgba(34,211,238,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.08) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative z-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="mb-1 flex items-center gap-2 text-xs font-bold tracking-[.3em] text-cyan-500">
              <Zap size={14} /> NEON PROTOCOL / 03
            </div>

            <h2 className={`text-2xl font-black tracking-wider sm:text-3xl ${textClass}`}>
              FINAL <span className="text-cyan-500">PROTOCOL</span>
            </h2>

            <p className={`mt-1 text-xs ${mutedClass}`}>
              Stack blocks. Clear lines. Survive the system.
            </p>
          </div>

          <button
            onClick={onExit}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm transition ${
              dark
                ? "border-white/10 text-slate-300 hover:border-cyan-400/50 hover:text-cyan-300"
                : "border-slate-300 text-slate-700 hover:border-cyan-500 hover:text-cyan-700"
            }`}
          >
            <ArrowLeft size={16} /> Exit
          </button>
        </div>

        <div className="mb-5 grid grid-cols-3 gap-2">
          {[
            ["SCORE", score],
            ["LINES", lines],
            ["LEVEL", level],
          ].map(([label, value]) => (
            <div
              key={label}
              className={`rounded-xl border p-3 text-center ${panelClass}`}
            >
              <p className={`text-[10px] font-bold tracking-[.2em] ${labelClass}`}>
                {label}
              </p>
              <p className="mt-1 text-xl font-black tabular-nums text-cyan-500">
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-6 lg:flex-row lg:items-start">
          <div className="relative w-full max-w-[380px]">
            <div
              className={`fp-board relative overflow-hidden rounded-xl border p-2 transition ${
                dark
                  ? "border-cyan-400/30 bg-[#030712]"
                  : "border-slate-300 bg-slate-200"
              } ${flash ? "ring-4 ring-cyan-300/50" : ""}`}
            >
              <div className="fp-grid">
                {displayBoard.map((row, y) =>
                  row.map((color, x) => (
                    <div key={`${y}-${x}`}>
                      {renderCell(color, `${y}-${x}`)}
                    </div>
                  ))
                )}
              </div>

              {particles.length > 0 && (
                <div className="pointer-events-none absolute inset-0">
                  {particles.map((particle) => (
                    <span
                      key={particle.id}
                      className="absolute h-2 w-2 rounded-full bg-cyan-300"
                      style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        boxShadow: "0 0 12px #22d3ee",
                        animation: "fp-pop .5s ease-out forwards",
                      }}
                    />
                  ))}
                </div>
              )}

              {status !== "playing" && (
                <div
                  className="absolute inset-0 flex items-center justify-center p-4 backdrop-blur-sm"
                  style={{ background: "var(--fp-overlay)" }}
                >
                  <div className="text-center">
                    {status === "ready" && (
                      <>
                        <Zap className="mx-auto mb-3 text-cyan-500" size={38} />

                        <h3 className={`text-xl font-black tracking-widest ${textClass}`}>
                          READY?
                        </h3>

                        <p className={`mt-2 text-xs ${mutedClass}`}>
                          Initialize the block system
                        </p>

                        <button
                          onClick={startGame}
                          className="mt-5 rounded-xl bg-cyan-400 px-6 py-3 text-xs font-black tracking-widest text-slate-950 transition hover:bg-cyan-300"
                        >
                          START GAME
                        </button>
                      </>
                    )}

                    {status === "paused" && (
                      <>
                        <Pause className="mx-auto mb-3 text-cyan-500" size={38} />

                        <h3 className={`text-xl font-black tracking-widest ${textClass}`}>
                          PAUSED
                        </h3>

                        <button
                          onClick={togglePause}
                          className="mt-5 rounded-xl bg-cyan-400 px-6 py-3 text-xs font-black tracking-widest text-slate-950"
                        >
                          RESUME
                        </button>
                      </>
                    )}

                    {status === "over" && (
                      <>
                        <div className="mb-3 text-4xl">⚠️</div>

                        <h3 className="text-xl font-black tracking-widest text-rose-500">
                          SYSTEM OVERLOAD
                        </h3>

                        <p className={`mt-2 text-xs ${mutedClass}`}>
                          The grid has been filled.
                        </p>

                        <p className="mt-3 text-2xl font-black text-cyan-500">
                          {score}
                        </p>

                        <p className={`text-[10px] tracking-widest ${labelClass}`}>
                          FINAL SCORE
                        </p>

                        <button
                          onClick={startGame}
                          className="mt-5 flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 text-xs font-black tracking-widest text-slate-950"
                        >
                          <RotateCcw size={14} /> RESTART
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex w-full max-w-[320px] flex-col gap-3">
            <div className={`rounded-xl border p-4 ${panelClass}`}>
              <p className={`mb-3 text-[10px] font-bold tracking-[.2em] ${labelClass}`}>
                NEXT BLOCK
              </p>

              <div className="flex min-h-[75px] items-center justify-center">
                <div className="flex flex-col gap-1">
                  {nextPiece.shape.map((row, y) => (
                    <div key={y} className="flex gap-1">
                      {row.map((value, x) => (
                        <div
                          key={x}
                          className="h-5 w-5 rounded"
                          style={{
                            background: value ? nextPiece.color : "transparent",
                            boxShadow: value
                              ? `0 0 8px ${nextPiece.color}88`
                              : "none",
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`rounded-xl border p-4 ${panelClass}`}>
              <div className="mb-3 flex items-center justify-between">
                <p className={`text-[10px] font-bold tracking-[.2em] ${labelClass}`}>
                  SYSTEM CONTROLS
                </p>

                <button
                  onClick={togglePause}
                  disabled={status === "ready" || status === "over"}
                  className="flex items-center gap-2 rounded-lg border border-cyan-500/30 px-3 py-2 text-xs text-cyan-600 disabled:opacity-30"
                >
                  {status === "paused" ? (
                    <Play size={13} />
                  ) : (
                    <Pause size={13} />
                  )}
                  {status === "paused" ? "Resume" : "Pause"}
                </button>
              </div>

              <div className="grid grid-cols-3 justify-items-center gap-2">
                <span />

                <button
                  className="fp-control"
                  onClick={rotate}
                  disabled={status !== "playing"}
                  aria-label="Rotate block"
                >
                  <ArrowUp />
                </button>

                <span />

                <button
                  className="fp-control"
                  onClick={() => moveHorizontal(-1)}
                  disabled={status !== "playing"}
                  aria-label="Move left"
                >
                  <ArrowLeft />
                </button>

                <button
                  className="fp-control"
                  onClick={moveDown}
                  disabled={status !== "playing"}
                  aria-label="Move down"
                >
                  <ArrowDown />
                </button>

                <button
                  className="fp-control"
                  onClick={() => moveHorizontal(1)}
                  disabled={status !== "playing"}
                  aria-label="Move right"
                >
                  <ArrowRight />
                </button>
              </div>

              <button
                onClick={hardDrop}
                disabled={status !== "playing"}
                className="mt-3 w-full rounded-lg border border-purple-400/30 bg-purple-400/10 py-2.5 text-xs font-bold tracking-widest text-purple-500 disabled:opacity-30"
              >
                HARD DROP ↓
              </button>
            </div>

            <div className={`rounded-xl border p-4 ${panelClass}`}>
              <p className={`mb-2 text-[10px] font-bold tracking-[.2em] ${labelClass}`}>
                HOW TO PLAY
              </p>

              <div className={`space-y-2 text-xs ${mutedClass}`}>
                <p><span className="text-cyan-500">← →</span> Move blocks</p>
                <p><span className="text-cyan-500">↑</span> Rotate block</p>
                <p><span className="text-cyan-500">↓</span> Move down</p>
                <p><span className="text-cyan-500">SPACE</span> Hard drop</p>
                <p><span className="text-cyan-500">ESC</span> Pause / Resume</p>
              </div>
            </div>
          </div>
        </div>

        <div className={`mt-5 flex items-center justify-center gap-2 text-[10px] tracking-[.2em] ${labelClass}`}>
          <Trophy size={12} /> CLEAR LINES • BUILD YOUR SCORE • SURVIVE
        </div>
      </div>
    </section>
  );
}

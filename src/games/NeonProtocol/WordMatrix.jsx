
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  Delete,
  Lightbulb,
  Lock,
  Medal,
  RotateCcw,
  Settings,
  Shuffle,
  Sparkles,
  Star,
  Target,
  Trophy,
  Volume2,
  VolumeX,
  X,
  Zap,
  Flame,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const LEVELS = [
  { letters: ["C", "A", "R", "E"], words: ["CARE", "RACE", "EAR", "ARE", "ARC"] },
  { letters: ["S", "T", "O", "N", "E"], words: ["STONE", "NOTES", "TONES", "NOTE", "ONES", "TONE"] },
  { letters: ["P", "L", "A", "N", "E", "T"], words: ["PLANET", "PLANE", "PANEL", "PLANT", "LATE", "NEAT"] },
  { letters: ["S", "I", "L", "V", "E", "R"], words: ["SILVER", "LIVER", "RILES", "RISE", "VILE", "LIVE"] },
  { letters: ["G", "A", "R", "D", "E", "N"], words: ["GARDEN", "DANGER", "RANGE", "GRADE", "ANGLE", "DARE"] },
];

const STORAGE_KEY = "neon-protocol-word-matrix-v5";

const ACHIEVEMENTS = [
  { id: "first-word", title: "FIRST DISCOVERY", description: "Find your first word", icon: Star },
  { id: "word-master", title: "WORD MASTER", description: "Discover 20 words", icon: Medal },
  { id: "combo-master", title: "COMBO MASTER", description: "Reach a 5-word combo", icon: Flame },
  { id: "level-master", title: "LEVEL MASTER", description: "Complete 3 levels", icon: Trophy },
  { id: "high-score", title: "HIGH SCORER", description: "Reach 1000 points", icon: Zap },
  { id: "daily-player", title: "DAILY PLAYER", description: "Complete a daily challenge", icon: CalendarDays },
];

const getToday = () => {
  const date = new Date();

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
};

const getDailyLevel = () => {
  const number = Number(getToday().replaceAll("-", ""));
  return LEVELS[number % LEVELS.length];
};

const DEFAULT_DATA = {
  score: 0,
  bestScore: 0,
  level: 0,
  foundWords: [],
  bonusWords: [],
  totalWordsFound: 0,
  levelsCompleted: 0,
  bestCombo: 0,
  achievements: [],
  dailyCompletedDate: "",
  dailyProgressDate: getToday(),
  dailyScore: 0,
  dailyWords: [],
  dailyBonusWords: [],
  soundEnabled: true,
};

const getInitialData = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return { ...DEFAULT_DATA };

    const parsed = JSON.parse(saved);
    const dailyIsNew = parsed.dailyProgressDate !== getToday();

    return {
      ...DEFAULT_DATA,
      ...parsed,
      level: Math.min(
        Math.max(Number(parsed.level) || 0, 0),
        LEVELS.length - 1
      ),
      foundWords: Array.isArray(parsed.foundWords) ? parsed.foundWords : [],
      bonusWords: Array.isArray(parsed.bonusWords) ? parsed.bonusWords : [],
      achievements: Array.isArray(parsed.achievements) ? parsed.achievements : [],
      dailyWords: dailyIsNew
        ? []
        : Array.isArray(parsed.dailyWords) ? parsed.dailyWords : [],
      dailyBonusWords: dailyIsNew
        ? []
        : Array.isArray(parsed.dailyBonusWords) ? parsed.dailyBonusWords : [],
      dailyProgressDate: getToday(),
    };
  } catch {
    return { ...DEFAULT_DATA };
  }
};

export default function WordMatrix({ onExit, setBestScore }) {
  const { dark } = useTheme();
  const isLight = !dark;

  const [savedData, setSavedData] = useState(getInitialData);

  const [level, setLevel] = useState(savedData.level);
  const [mode, setMode] = useState("campaign");

  const [foundWords, setFoundWords] = useState(savedData.foundWords);
  const [bonusWords, setBonusWords] = useState(savedData.bonusWords);
  const [dailyWords, setDailyWords] = useState(savedData.dailyWords);
  const [dailyBonusWords, setDailyBonusWords] = useState(savedData.dailyBonusWords);

  const [score, setScore] = useState(savedData.score);
  const [totalWordsFound, setTotalWordsFound] = useState(savedData.totalWordsFound);
  const [levelsCompleted, setLevelsCompleted] = useState(savedData.levelsCompleted);
  const [bestCombo, setBestCombo] = useState(savedData.bestCombo);
  const [combo, setCombo] = useState(0);
  const [achievements, setAchievements] = useState(savedData.achievements);

  const [soundEnabled, setSoundEnabled] = useState(savedData.soundEnabled);
  const [dailyCompletedDate, setDailyCompletedDate] = useState(savedData.dailyCompletedDate);
  const [dailyScore, setDailyScore] = useState(savedData.dailyScore);

  const [selected, setSelected] = useState([]);
  const [hintCount, setHintCount] = useState(3);
  const [hintReveal, setHintReveal] = useState("");
  const [message, setMessage] = useState("Swipe across letters to form words");
  const [messageType, setMessageType] = useState("info");
  const [checkingWord, setCheckingWord] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [activePanel, setActivePanel] = useState("");

  const selectedRef = useRef([]);
  const isSwiping = useRef(false);
  const checkingRef = useRef(false);
  const finishSwipeRef = useRef(null);
  const dictionaryCache = useRef(new Map());

  const currentLevel = mode === "daily" ? getDailyLevel() : LEVELS[level];

  const activeFoundWords = mode === "daily" ? dailyWords : foundWords;
  const activeBonusWords = mode === "daily" ? dailyBonusWords : bonusWords;

  const completed = activeFoundWords.length === currentLevel.words.length;
  const dailyAlreadyCompleted = dailyCompletedDate === getToday();

  const currentWord = selected
    .map((index) => currentLevel.letters[index])
    .join("");

  const [shuffledLetters, setShuffledLetters] = useState(
    currentLevel.letters.map((_, index) => index)
  );

  const bestScore = Math.max(score, savedData.bestScore);

  const progress = Math.round(
    (activeFoundWords.length / currentLevel.words.length) * 100
  );

  const unlockedAchievements = useMemo(
    () => new Set(achievements),
    [achievements]
  );

  // Persist game progress.
  useEffect(() => {
    const data = {
      score,
      bestScore: Math.max(score, savedData.bestScore),
      level,
      foundWords,
      bonusWords,
      totalWordsFound,
      levelsCompleted,
      bestCombo,
      achievements,
      dailyCompletedDate,
      dailyProgressDate: getToday(),
      dailyScore,
      dailyWords,
      dailyBonusWords,
      soundEnabled,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Storage may be unavailable.
    }
  }, [
    score,
    level,
    foundWords,
    bonusWords,
    totalWordsFound,
    levelsCompleted,
    bestCombo,
    achievements,
    dailyCompletedDate,
    dailyScore,
    dailyWords,
    dailyBonusWords,
    soundEnabled,
    savedData.bestScore,
  ]);

  useEffect(() => {
    setBestScore?.((old) => Math.max(old || 0, score));
  }, [score, setBestScore]);

  const speak = useCallback((text) => {
    if (
      !soundEnabled ||
      typeof window === "undefined" ||
      !("speechSynthesis" in window)
    ) {
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.95;
    utterance.pitch = 1.05;

    window.speechSynthesis.speak(utterance);
  }, [soundEnabled]);

  const clearSelection = () => {
    selectedRef.current = [];
    setSelected([]);
  };

  const showMessage = (text, type = "info") => {
    setMessage(text);
    setMessageType(type);
  };

  const unlockAchievement = (id) => {
    setAchievements((old) => {
      if (old.includes(id)) return old;
      return [...old, id];
    });

    const item = ACHIEVEMENTS.find((achievement) => achievement.id === id);

    if (item) {
      showMessage(`ACHIEVEMENT UNLOCKED: ${item.title}`, "success");
      speak("Achievement unlocked!");
    }
  };

  const checkAchievements = (newScore, newTotal, newCombo) => {
    if (newTotal >= 1) unlockAchievement("first-word");
    if (newTotal >= 20) unlockAchievement("word-master");
    if (newScore >= 1000) unlockAchievement("high-score");
    if (newCombo >= 5) unlockAchievement("combo-master");
  };

  const addLetter = (index) => {
    if (completed || gameComplete || checkingRef.current) return;
    if (selectedRef.current.includes(index)) return;

    const next = [...selectedRef.current, index];

    selectedRef.current = next;
    setSelected(next);
    showMessage("Keep swiping...");
  };

  const startSwipe = (index) => {
    if (completed || gameComplete || checkingRef.current) return;

    isSwiping.current = true;
    selectedRef.current = [];
    setSelected([]);
    addLetter(index);
  };

  const continueSwipe = (index) => {
    if (!isSwiping.current) return;
    addLetter(index);
  };

  const checkDictionary = async (word) => {
    if (dictionaryCache.current.has(word)) {
      return dictionaryCache.current.get(word);
    }

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word.toLowerCase())}`
      );

      const valid = response.ok;
      dictionaryCache.current.set(word, valid);
      return valid;
    } catch {
      throw new Error("DICTIONARY_UNAVAILABLE");
    }
  };

  const submitWord = async (word) => {
    if (!word || checkingRef.current) return;

    if (
      activeFoundWords.includes(word) ||
      activeBonusWords.includes(word)
    ) {
      showMessage("WORD ALREADY FOUND", "error");
      setCombo(0);
      clearSelection();
      return;
    }

    if (currentLevel.words.includes(word)) {
      const nextCombo = combo + 1;
      const multiplier = Math.min(nextCombo, 5);
      const points = word.length * 10 * multiplier;
      const newScore = score + points;
      const newTotal = totalWordsFound + 1;

      // Derive the next list synchronously to preserve every discovered word.
      const nextFound = [...activeFoundWords, word];

      if (mode === "daily") {
        setDailyWords(nextFound);
      } else {
        setFoundWords(nextFound);
      }

      setScore(newScore);
      setTotalWordsFound(newTotal);
      setCombo(nextCombo);
      setBestCombo((old) => Math.max(old, nextCombo));

      clearSelection();
      setHintReveal("");

      const praise =
        word.length >= 5 ? "EXCELLENT" : word.length >= 4 ? "GREAT" : "GOOD";

      speak(praise);

      showMessage(
        `${word}  +${points} POINTS  ${
          multiplier > 1 ? `x${multiplier} COMBO` : praise
        }`,
        "success"
      );

      checkAchievements(newScore, newTotal, nextCombo);

      if (nextFound.length === currentLevel.words.length) {
        const bonus = mode === "campaign" ? (level + 1) * 100 : 200;
        const finalScore = newScore + bonus;

        setScore(finalScore);
        setCombo(0);

        if (mode === "daily") {
          setDailyCompletedDate(getToday());
          setDailyScore(finalScore);
          unlockAchievement("daily-player");
          showMessage(`DAILY COMPLETED! +${bonus} BONUS`, "success");
          speak("Daily challenge completed!");
        } else {
          setLevelsCompleted((old) => {
            const next = old + 1;

            if (next >= 3) unlockAchievement("level-master");

            return next;
          });

          if (level === LEVELS.length - 1) {
            setGameComplete(true);
            showMessage("ALL LEVELS COMPLETED!", "success");
            speak("Congratulations! You completed Word Matrix!");
          } else {
            showMessage(`LEVEL COMPLETED! +${bonus} BONUS`, "success");
            speak("Level completed!");
          }
        }
      }

      return;
    }

    if (word.length < 3) {
      showMessage("WORD NOT IN THIS LEVEL", "error");
      setCombo(0);
      clearSelection();
      return;
    }

    checkingRef.current = true;
    setCheckingWord(true);
    showMessage(`CHECKING "${word}"...`);
    clearSelection();

    try {
      const valid = await checkDictionary(word);

      if (!valid) {
        showMessage("NOT A VALID ENGLISH WORD", "error");
        setCombo(0);
        return;
      }

      const latestBonusWords =
        mode === "daily" ? dailyBonusWords : bonusWords;

      if (latestBonusWords.includes(word)) {
        showMessage("WORD ALREADY FOUND", "error");
        setCombo(0);
        return;
      }

      const points = word.length * 5;
      const newScore = score + points;
      const newTotal = totalWordsFound + 1;

      if (mode === "daily") {
        setDailyBonusWords((old) =>
          old.includes(word) ? old : [...old, word]
        );
      } else {
        setBonusWords((old) =>
          old.includes(word) ? old : [...old, word]
        );
      }

      setScore(newScore);
      setTotalWordsFound(newTotal);
      setCombo(0);
      setHintReveal("");

      showMessage(`BONUS WORD: ${word}  +${points} POINTS`, "success");
      speak("Bonus word!");

      checkAchievements(newScore, newTotal, 0);
    } catch {
      showMessage("DICTIONARY UNAVAILABLE - CHECK YOUR INTERNET", "error");
      setCombo(0);
    } finally {
      checkingRef.current = false;
      setCheckingWord(false);
    }
  };

  const finishSwipe = () => {
    if (!isSwiping.current) return;

    isSwiping.current = false;

    const word = selectedRef.current
      .map((index) => currentLevel.letters[index])
      .join("");

    if (word.length < 2) {
      clearSelection();
      showMessage("Swipe across letters to form a word");
      return;
    }

    submitWord(word);
  };

  // Keep the latest callback available to the global pointer listener.
  finishSwipeRef.current = finishSwipe;

  useEffect(() => {
    const handlePointerUp = () => {
      finishSwipeRef.current?.();
    };

    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, []);

  const removeLast = () => {
    const next = selectedRef.current.slice(0, -1);

    selectedRef.current = next;
    setSelected(next);
  };

  const shuffleLetters = () => {
    const shuffled = [...shuffledLetters];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setShuffledLetters(shuffled);
    clearSelection();
    showMessage("LETTERS SHUFFLED");
  };

  const useHint = () => {
    if (hintCount <= 0 || completed || gameComplete) return;

    const nextWord = currentLevel.words.find(
      (word) => !activeFoundWords.includes(word)
    );

    if (!nextWord) return;

    setHintCount((old) => old - 1);
    setHintReveal(`${nextWord[0]}  ·  ${nextWord.length} LETTERS`);
    showMessage("HINT ACTIVATED");
    speak("Here is your hint.");
  };

  const startCampaign = () => {
    const latest = getInitialData();

    setSavedData(latest);
    setMode("campaign");
    setLevel(latest.level);
    setFoundWords(latest.foundWords);
    setBonusWords(latest.bonusWords);
    setHintCount(3);
    setCombo(0);
    setGameComplete(false);
    setHintReveal("");
    setShuffledLetters(
      LEVELS[latest.level].letters.map((_, index) => index)
    );

    clearSelection();
    showMessage("CAMPAIGN MODE");
    setMenuOpen(false);
    setActivePanel("");
  };

  const startDailyChallenge = () => {
    const today = getToday();

    if (savedData.dailyProgressDate !== today) {
      setDailyWords([]);
      setDailyBonusWords([]);
      setSavedData((old) => ({
        ...old,
        dailyProgressDate: today,
        dailyWords: [],
        dailyBonusWords: [],
      }));
    }

    setMode("daily");
    setHintCount(3);
    setCombo(0);
    setGameComplete(false);
    setHintReveal("");
    setShuffledLetters(
      getDailyLevel().letters.map((_, index) => index)
    );

    clearSelection();

    showMessage(
      dailyAlreadyCompleted
        ? "TODAY'S CHALLENGE COMPLETED"
        : "DAILY CHALLENGE STARTED"
    );

    setMenuOpen(false);
    setActivePanel("");
  };

  const nextLevel = () => {
    if (level >= LEVELS.length - 1) return;

    const next = level + 1;

    setLevel(next);
    setMode("campaign");
    setFoundWords([]);
    setBonusWords([]);
    setHintCount(3);
    setCombo(0);
    setHintReveal("");
    setShuffledLetters(
      LEVELS[next].letters.map((_, index) => index)
    );

    setSavedData((old) => ({
      ...old,
      level: next,
      foundWords: [],
      bonusWords: [],
    }));

    clearSelection();
    showMessage("NEW LEVEL. FIND EVERY WORD!");
  };

  const resetCurrentLevel = () => {
    if (mode === "daily" && dailyAlreadyCompleted) {
      showMessage("TODAY'S CHALLENGE IS ALREADY COMPLETED", "error");
      setMenuOpen(false);
      return;
    }

    if (mode === "campaign") {
      setFoundWords([]);
      setBonusWords([]);

      setSavedData((old) => ({
        ...old,
        foundWords: [],
        bonusWords: [],
      }));
    } else {
      setDailyWords([]);
      setDailyBonusWords([]);

      setSavedData((old) => ({
        ...old,
        dailyWords: [],
        dailyBonusWords: [],
      }));
    }

    setHintCount(3);
    setCombo(0);
    setHintReveal("");
    setShuffledLetters(
      currentLevel.letters.map((_, index) => index)
    );

    clearSelection();
    showMessage("LEVEL RESTARTED");
    setActivePanel("");
    setMenuOpen(false);
  };

  const restartGame = () => {
    if (
      typeof window !== "undefined" &&
      "speechSynthesis" in window
    ) {
      window.speechSynthesis.cancel();
    }

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors.
    }

    setSavedData({ ...DEFAULT_DATA });
    setMode("campaign");
    setLevel(0);
    setFoundWords([]);
    setBonusWords([]);
    setDailyWords([]);
    setDailyBonusWords([]);
    setSelected([]);
    selectedRef.current = [];
    setShuffledLetters(LEVELS[0].letters.map((_, index) => index));
    setScore(0);
    setCombo(0);
    setHintCount(3);
    setHintReveal("");
    setGameComplete(false);
    setTotalWordsFound(0);
    setLevelsCompleted(0);
    setBestCombo(0);
    setAchievements([]);
    setDailyCompletedDate("");
    setDailyScore(0);
    setMenuOpen(false);
    setActivePanel("");
    setSoundEnabled(true);
    showMessage("NEW GAME STARTED");
  };

  const togglePanel = (panel) => {
    setActivePanel((old) => (old === panel ? "" : panel));
    setMenuOpen(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setActivePanel("");
  };

  const statusColor =
    messageType === "success"
      ? "text-emerald-500"
      : messageType === "error"
        ? "text-rose-500"
        : isLight
          ? "text-violet-600"
          : "text-cyan-300";

  const panelClass = isLight
    ? "border-violet-200 bg-white/80"
    : "border-white/10 bg-white/[0.035]";

  const mutedText = isLight ? "text-slate-600" : "text-slate-400";
  const buttonText = isLight ? "text-slate-700" : "text-slate-300";

  return (
    <section
      className={`wm-root relative mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border p-3 shadow-[0_0_60px_rgba(168,85,247,0.08)] transition-colors duration-300 sm:p-5 ${
        isLight
          ? "wm-light border-violet-200 bg-[#f7f6ff] text-slate-900"
          : "wm-dark border-purple-400/20 bg-[#080b18] text-white"
      }`}
    >
      <style>{`
        @keyframes wm-glow {
          0%, 100% { box-shadow: 0 0 12px rgba(168,85,247,.12); }
          50% { box-shadow: 0 0 22px rgba(168,85,247,.28); }
        }

        @keyframes wm-pop {
          0% { transform: scale(.75); opacity: .5; }
          100% { transform: scale(1); opacity: 1; }
        }

        .wm-letter {
          animation: wm-glow 2s infinite;
          transition: .18s ease;
          touch-action: none;
          user-select: none;
          -webkit-user-select: none;
          -webkit-tap-highlight-color: transparent;
        }

        .wm-letter:active {
          transform: translate(-50%, -50%) scale(.92) !important;
        }

        .wm-wheel {
          touch-action: none;
          user-select: none;
          -webkit-user-select: none;
        }

        .wm-panel {
          border: 1px solid rgba(255,255,255,.09);
          background: rgba(255,255,255,.035);
        }

        .wm-light {
          background-color: #f7f6ff;
          color: #17152b;
        }

        .wm-light .text-white {
          color: #211d38 !important;
        }

        .wm-light .text-slate-200,
        .wm-light .text-slate-300 {
          color: #39344f !important;
        }

        .wm-light .text-slate-400 {
          color: #625d78 !important;
        }

        .wm-light .text-slate-500 {
          color: #77718f !important;
        }

        .wm-light .text-slate-600 {
          color: #77718f !important;
        }

        .wm-light .border-white\\/5,
        .wm-light .border-white\\/10 {
          border-color: rgba(80,65,130,.14) !important;
        }

        .wm-light .bg-white\\/\\[0\\.035\\],
        .wm-light .bg-white\\/5,
        .wm-light .bg-white\\/\\[0\\.04\\] {
          background-color: rgba(255,255,255,.8) !important;
        }

        .wm-light .bg-black\\/20 {
          background-color: rgba(230,226,245,.75) !important;
        }

        .wm-light .wm-panel {
          background: rgba(255,255,255,.8);
          border-color: rgba(110,90,170,.15);
        }

        .wm-light .wm-letter:not(.bg-purple-400) {
          background-color: #ffffff;
          color: #6d42c1;
          border-color: rgba(139,92,246,.35);
        }

        .wm-light .wm-letter.bg-purple-400 {
          color: #ffffff !important;
        }

        .wm-light .wm-wheel > div:nth-child(1) {
          background: rgba(139,92,246,.035);
          border-color: rgba(139,92,246,.18);
        }

        .wm-light .wm-wheel > div:nth-child(2) {
          border-color: rgba(139,92,246,.22);
        }

        .wm-light .wm-wheel > div:nth-child(3) {
          background: #eee9ff;
          border-color: rgba(139,92,246,.2);
        }

        .wm-light .wm-wheel > div:nth-child(3) svg {
          color: #8054ce;
        }

        .wm-light [class*="bg-[#111326]"] {
          background-color: #ffffff !important;
        }

        .wm-light [class*="bg-[#111027]"] {
          background-color: #eee9ff !important;
        }

        .wm-light [class*="bg-[#17132a]"] {
          background-color: #ffffff !important;
        }

        .wm-light .text-purple-200 {
          color: #6941b5 !important;
        }

        .wm-light .text-purple-300 {
          color: #8054ce !important;
        }

        .wm-light .text-cyan-300 {
          color: #087f9e !important;
        }

        .wm-light .text-yellow-300 {
          color: #a66a00 !important;
        }

        .wm-light .text-orange-300 {
          color: #b85b17 !important;
        }

        .wm-light .text-emerald-300,
        .wm-light .text-emerald-200 {
          color: #087d58 !important;
        }

        .wm-light .text-cyan-200 {
          color: #087f9e !important;
        }

        .wm-light .text-yellow-200 {
          color: #946000 !important;
        }

        .wm-light .text-rose-300 {
          color: #c03956 !important;
        }

        .wm-light .text-purple-200,
        .wm-light .text-purple-300 {
          text-shadow: none;
        }

        .wm-light .border-purple-400\\/20,
        .wm-light .border-purple-400\\/15 {
          border-color: rgba(139,92,246,.22);
        }

        .wm-light .border-cyan-400\\/20 {
          border-color: rgba(8,127,158,.2);
        }

        @media (prefers-reduced-motion: reduce) {
          .wm-letter {
            animation: none;
            transition: none;
          }
        }
      `}</style>

      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: isLight
            ? "linear-gradient(rgba(139,92,246,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,.08) 1px, transparent 1px)"
            : "linear-gradient(rgba(168,85,247,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,.08) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <header className="mb-4 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-[.25em] text-purple-300">
              <Sparkles size={13} />
              NEON PROTOCOL / 02
            </div>

            <h2 className="mt-1 text-xl font-black tracking-wider sm:text-2xl">
              WORD <span className="text-purple-300">MATRIX</span>
            </h2>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setSoundEnabled((old) => !old)}
              title={soundEnabled ? "Mute sound" : "Enable sound"}
              aria-label={soundEnabled ? "Mute sound" : "Enable sound"}
              className={`flex h-10 w-10 items-center justify-center rounded-xl border transition hover:border-purple-400/40 hover:text-purple-300 ${
                isLight
                  ? "border-violet-200 bg-white text-slate-600"
                  : "border-white/10 bg-white/[0.035] text-slate-300"
              }`}
            >
              {soundEnabled ? <Volume2 size={17} /> : <VolumeX size={17} />}
            </button>

            <button
              onClick={() => {
                setMenuOpen((old) => !old);
                setActivePanel("");
              }}
              className={`flex h-10 items-center gap-2 rounded-xl border px-3 text-xs font-bold transition ${
                menuOpen
                  ? "border-purple-400/40 bg-purple-400/15 text-purple-500"
                  : isLight
                    ? "border-violet-200 bg-white text-slate-700 hover:border-purple-400/40"
                    : "border-white/10 bg-white/[0.035] text-slate-300 hover:border-purple-400/40"
              }`}
            >
              <Settings size={15} />
              <span>MENU</span>
              <ChevronDown size={13} />
            </button>

            <button
              onClick={onExit}
              title="Exit game"
              aria-label="Exit game"
              className={`flex h-10 w-10 items-center justify-center rounded-xl border transition hover:border-rose-400/40 hover:text-rose-400 ${
                isLight
                  ? "border-violet-200 text-slate-500"
                  : "border-white/10 text-slate-400"
              }`}
            >
              <ArrowLeft size={17} />
            </button>
          </div>
        </header>

        {/* Dropdown menu */}
        {menuOpen && (
          <div className="relative z-30 mb-4">
            <div className={`absolute right-0 top-0 w-full max-w-[290px] rounded-2xl border border-purple-400/25 p-2 shadow-2xl sm:w-72 ${
              isLight ? "bg-white" : "bg-[#111326]"
            }`}>
              <p className="px-3 py-2 text-[9px] font-bold tracking-[.2em] text-slate-500">
                GAME OPTIONS
              </p>

              {[
                { id: "stats", label: "Statistics", icon: BarChart3 },
                { id: "words", label: "Word Discovery", icon: BookOpen },
                { id: "achievements", label: "Achievements", icon: Trophy },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    onClick={() => togglePanel(item.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-xs font-semibold transition hover:bg-purple-400/10 hover:text-purple-500 ${buttonText}`}
                  >
                    <Icon size={16} />
                    {item.label}
                    <ArrowRight size={13} className="ml-auto opacity-50" />
                  </button>
                );
              })}

              <div className={`my-1 border-t ${isLight ? "border-violet-100" : "border-white/10"}`} />

              <button
                onClick={startCampaign}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-xs font-semibold transition hover:bg-purple-400/10 ${buttonText}`}
              >
                <Target size={16} />
                Campaign Mode
              </button>

              <button
                onClick={startDailyChallenge}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-xs font-semibold transition hover:bg-cyan-400/10 ${buttonText}`}
              >
                <CalendarDays size={16} />
                Daily Challenge
                {dailyAlreadyCompleted && (
                  <Check size={14} className="ml-auto text-emerald-400" />
                )}
              </button>

              <div className={`my-1 border-t ${isLight ? "border-violet-100" : "border-white/10"}`} />

              <button
                onClick={resetCurrentLevel}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-xs font-semibold transition hover:bg-white/5 ${mutedText}`}
              >
                <RotateCcw size={15} />
                Restart Current Level
              </button>

              <button
                onClick={restartGame}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-xs font-semibold text-rose-400 transition hover:bg-rose-400/10"
              >
                <X size={15} />
                Reset All Progress
              </button>
            </div>
          </div>
        )}

        {/* Statistics panel */}
        {activePanel === "stats" && (
          <div className={`mb-4 rounded-2xl border p-4 ${panelClass}`}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xs font-black tracking-widest text-purple-500">
                GAME STATISTICS
              </h3>
              <button onClick={closeMenu} className={mutedText}>
                <X size={17} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {[
                ["WORDS FOUND", totalWordsFound],
                ["BONUS WORDS", bonusWords.length + dailyBonusWords.length],
                ["LEVELS CLEARED", levelsCompleted],
                ["BEST COMBO", `${bestCombo}x`],
                ["DAILY SCORE", dailyScore],
                ["BEST SCORE", bestScore.toLocaleString()],
              ].map(([label, value]) => (
                <div key={label} className="wm-panel rounded-xl p-3">
                  <p className="text-[9px] font-bold tracking-widest text-slate-500">
                    {label}
                  </p>
                  <p className="mt-1 text-lg font-black text-purple-500">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Word discovery panel */}
        {activePanel === "words" && (
          <div className={`mb-4 rounded-2xl border p-4 ${panelClass}`}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-xs font-black tracking-widest text-emerald-500">
                <BookOpen size={15} />
                BONUS WORDS
              </h3>
              <button onClick={closeMenu} className={mutedText}>
                <X size={17} />
              </button>
            </div>

            {activeBonusWords.length ? (
              <div className="flex flex-wrap gap-2">
                {activeBonusWords.map((word) => (
                  <span
                    key={word}
                    className="rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs font-bold text-emerald-500"
                  >
                    {word}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">
                Extra English words you discover will appear here.
              </p>
            )}
          </div>
        )}

        {/* Achievements panel */}
        {activePanel === "achievements" && (
          <div className={`mb-4 rounded-2xl border p-4 ${panelClass}`}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xs font-black tracking-widest text-yellow-600">
                ACHIEVEMENTS ({achievements.length}/{ACHIEVEMENTS.length})
              </h3>
              <button onClick={closeMenu} className={mutedText}>
                <X size={17} />
              </button>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {ACHIEVEMENTS.map((achievement) => {
                const unlocked = unlockedAchievements.has(achievement.id);
                const Icon = achievement.icon;

                return (
                  <div
                    key={achievement.id}
                    className={`flex items-center gap-3 rounded-xl border p-3 ${
                      unlocked
                        ? "border-yellow-400/25 bg-yellow-400/[0.07]"
                        : isLight
                          ? "border-violet-100 bg-slate-100"
                          : "border-white/5 bg-black/20 opacity-50"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={unlocked ? "text-yellow-500" : "text-slate-500"}
                    />
                    <div>
                      <p className={`text-[10px] font-black ${isLight ? "text-slate-800" : "text-slate-200"}`}>
                        {achievement.title}
                      </p>
                      <p className="mt-1 text-[9px] text-slate-500">
                        {achievement.description}
                      </p>
                    </div>
                    {unlocked && (
                      <Check size={15} className="ml-auto text-emerald-500" />
                    )}
                    {!unlocked && (
                      <Lock size={14} className="ml-auto text-slate-500" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Main statistics */}
        <div className="mb-4 grid grid-cols-3 gap-2">
          <div className="rounded-xl border border-purple-400/15 bg-purple-400/[0.06] p-2.5 text-center">
            <p className="text-[9px] font-bold tracking-widest text-slate-500">
              SCORE
            </p>
            <p className="mt-1 text-lg font-black text-purple-500">
              {score.toLocaleString()}
            </p>
          </div>

          <div className={`rounded-xl border p-2.5 text-center ${panelClass}`}>
            <p className="text-[9px] font-bold tracking-widest text-slate-500">
              LEVEL
            </p>
            <p className={`mt-1 text-lg font-black ${isLight ? "text-slate-900" : "text-white"}`}>
              {mode === "daily" ? "DAILY" : `${level + 1}/${LEVELS.length}`}
            </p>
          </div>

          <div className="rounded-xl border border-orange-400/15 bg-orange-400/[0.045] p-2.5 text-center">
            <p className="text-[9px] font-bold tracking-widest text-slate-500">
              COMBO
            </p>
            <p className="mt-1 text-lg font-black text-orange-500">
              {combo}x
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[9px] font-bold tracking-widest text-slate-500">
              {mode === "daily" ? "DAILY PROGRESS" : "LEVEL PROGRESS"}
            </span>
            <span className="text-[10px] font-bold text-purple-500">
              {activeFoundWords.length}/{currentLevel.words.length} · {progress}%
            </span>
          </div>

          <div className={`h-1.5 overflow-hidden rounded-full ${isLight ? "bg-violet-100" : "bg-white/5"}`}>
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {mode === "daily" && (
          <div className={`mb-4 flex items-center justify-between rounded-xl border px-3 py-2 ${
            isLight
              ? "border-cyan-200 bg-cyan-50"
              : "border-cyan-400/20 bg-cyan-400/[0.045]"
          }`}>
            <span className="flex items-center gap-2 text-[10px] font-bold tracking-wider text-cyan-600">
              <CalendarDays size={14} />
              DAILY CHALLENGE
            </span>

            {dailyAlreadyCompleted && (
              <span className="text-[9px] font-bold text-emerald-500">
                COMPLETED
              </span>
            )}
          </div>
        )}

        {/* Campaign complete */}
        {gameComplete ? (
          <div className={`rounded-2xl border px-5 py-10 text-center ${
            isLight ? "border-purple-200 bg-white" : "border-purple-400/30 bg-purple-400/5"
          }`}>
            <Trophy size={48} className="mx-auto mb-3 text-yellow-500" />

            <h3 className="text-2xl font-black tracking-widest">
              YOU DID IT!
            </h3>

            <p className={`mt-2 text-xs ${mutedText}`}>
              All campaign levels completed.
            </p>

            <p className="mt-4 text-4xl font-black text-purple-500">
              {score.toLocaleString()}
            </p>

            <p className="text-[9px] tracking-widest text-slate-500">
              FINAL SCORE
            </p>

            <button
              onClick={restartGame}
              className="mt-6 rounded-xl bg-purple-500 px-7 py-3 text-xs font-black tracking-widest text-white hover:bg-purple-600"
            >
              PLAY AGAIN
            </button>
          </div>
        ) : (
          <>
            {/* Hidden word grid */}
            <div className={`mb-4 rounded-2xl border p-3 sm:p-4 ${panelClass}`}>
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className={`text-[10px] font-black tracking-widest ${isLight ? "text-slate-800" : "text-slate-300"}`}>
                    FIND THE WORDS
                  </p>
                  <p className="mt-1 text-[9px] text-slate-500">
                    Discover every hidden word
                  </p>
                </div>

                <span className="rounded-lg border border-purple-400/20 bg-purple-400/10 px-2.5 py-1 text-[9px] font-bold text-purple-500">
                  {mode === "daily" ? "DAILY" : `LEVEL ${level + 1}`}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {currentLevel.words.map((word) => {
                  const found = activeFoundWords.includes(word);

                  return (
                    <div
                      key={word}
                      className={`flex min-h-10 items-center justify-center gap-1 rounded-lg border px-1 py-2 text-xs font-black tracking-wider transition ${
                        found
                          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-500"
                          : isLight
                            ? "border-violet-200 bg-violet-50 text-slate-400"
                            : "border-white/10 bg-black/20 text-slate-500"
                      }`}
                    >
                      {found ? (
                        <>
                          <Check size={12} />
                          {word}
                        </>
                      ) : (
                        Array.from(word).map((_, index) => (
                          <span key={index}>_</span>
                        ))
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Letter wheel */}
            <div className={`rounded-2xl border p-3 sm:p-5 ${
              isLight
                ? "border-purple-200 bg-white/70"
                : "border-purple-400/20 bg-purple-400/[0.035]"
            }`}>
              <div className="flex items-center justify-center gap-2">
                <Target size={13} className="text-purple-500" />
                <p className="text-[9px] font-bold tracking-[.25em] text-slate-500">
                  YOUR WORD
                </p>
              </div>

              <div className="mt-2 flex min-h-10 flex-wrap items-center justify-center gap-1.5">
                {currentWord ? (
                  currentWord.split("").map((letter, index) => (
                    <div
                      key={`${index}-${letter}`}
                      className="flex h-9 w-8 animate-[wm-pop_.15s_ease-out] items-center justify-center rounded-lg border border-purple-300/40 bg-purple-400/15 text-lg font-black text-purple-500"
                    >
                      {letter}
                    </div>
                  ))
                ) : (
                  <p className="text-xs tracking-widest text-slate-500">
                    SWIPE ACROSS LETTERS
                  </p>
                )}
              </div>

              {hintReveal && (
                <div className="mt-2 text-center text-[10px] font-bold tracking-widest text-yellow-600">
                  <Lightbulb size={12} className="mr-1 inline" />
                  {hintReveal}
                </div>
              )}

              <p className={`mt-2 min-h-4 text-center text-[10px] font-bold ${statusColor}`}>
                {checkingWord ? "CHECKING WORD..." : message}
              </p>

              <p className="mt-1 text-center text-[8px] tracking-widest text-slate-500">
                PRESS AND DRAG TO CONNECT LETTERS
              </p>

              <div className="wm-wheel relative mx-auto mt-3 aspect-square w-full max-w-[290px]">
                <div className={`pointer-events-none absolute inset-[10%] rounded-full border shadow-[inset_0_0_35px_rgba(168,85,247,.06)] ${
                  isLight
                    ? "border-purple-200 bg-purple-100/30"
                    : "border-purple-400/15 bg-purple-400/[0.025]"
                }`} />

                <div className={`pointer-events-none absolute inset-[21%] rounded-full border border-dashed ${
                  isLight ? "border-purple-300/50" : "border-purple-400/20"
                }`} />

                <div className={`pointer-events-none absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-purple-400/20 shadow-[0_0_30px_rgba(168,85,247,.12)] ${
                  isLight ? "bg-[#eee9ff]" : "bg-[#111027]"
                }`}>
                  <Sparkles size={23} className="text-purple-500" />
                </div>

                {shuffledLetters.map((originalIndex, index) => {
                  const letter = currentLevel.letters[originalIndex];
                  const used = selected.includes(originalIndex);

                  const angle =
                    (index / shuffledLetters.length) * Math.PI * 2 -
                    Math.PI / 2;

                  const left = 50 + 37 * Math.cos(angle);
                  const top = 50 + 37 * Math.sin(angle);

                  return (
                    <button
                      key={originalIndex}
                      type="button"
                      onPointerDown={(event) => {
                        event.preventDefault();
                        startSwipe(originalIndex);
                      }}
                      onPointerEnter={() => continueSwipe(originalIndex)}
                      disabled={completed || gameComplete || checkingWord}
                      style={{
                        left: `${left}%`,
                        top: `${top}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      className={`wm-letter absolute z-10 flex h-12 w-12 items-center justify-center rounded-full border text-xl font-black sm:h-14 sm:w-14 ${
                        used
                          ? "border-purple-200 bg-purple-500 text-white shadow-[0_0_25px_rgba(168,85,247,.65)]"
                          : isLight
                            ? "border-purple-300/50 bg-white text-purple-700 shadow-[0_0_18px_rgba(168,85,247,.13)] hover:border-purple-400 hover:bg-purple-50"
                            : "border-purple-300/40 bg-[#17132a] text-purple-200 shadow-[0_0_18px_rgba(168,85,247,.13)] hover:border-purple-200 hover:bg-purple-400/20"
                      } disabled:cursor-default`}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>

              {/* Controls */}
              <div className="mx-auto mt-3 grid max-w-[420px] grid-cols-4 gap-2">
                <button
                  onClick={removeLast}
                  disabled={!selected.length || completed || checkingWord}
                  className={`flex flex-col items-center justify-center gap-1 rounded-xl border py-2 text-[9px] font-bold transition hover:bg-purple-400/10 disabled:opacity-30 ${
                    isLight ? "border-violet-200 text-slate-700" : "border-white/10 text-slate-300"
                  }`}
                >
                  <Delete size={16} />
                  UNDO
                </button>

                <button
                  onClick={() => {
                    clearSelection();
                    showMessage("LETTERS CLEARED");
                  }}
                  disabled={!selected.length || completed || checkingWord}
                  className={`flex flex-col items-center justify-center gap-1 rounded-xl border py-2 text-[9px] font-bold transition hover:bg-purple-400/10 disabled:opacity-30 ${
                    isLight ? "border-violet-200 text-slate-700" : "border-white/10 text-slate-300"
                  }`}
                >
                  <RotateCcw size={15} />
                  CLEAR
                </button>

                <button
                  onClick={shuffleLetters}
                  disabled={completed || checkingWord}
                  className={`flex flex-col items-center justify-center gap-1 rounded-xl border py-2 text-[9px] font-bold transition hover:bg-purple-400/10 disabled:opacity-30 ${
                    isLight ? "border-violet-200 text-slate-700" : "border-white/10 text-slate-300"
                  }`}
                >
                  <Shuffle size={15} />
                  MIX
                </button>

                <button
                  onClick={useHint}
                  disabled={hintCount <= 0 || completed || checkingWord}
                  className="flex flex-col items-center justify-center gap-1 rounded-xl border border-yellow-400/20 bg-yellow-400/5 py-2 text-[9px] font-bold text-yellow-600 transition hover:bg-yellow-400/10 disabled:opacity-30"
                >
                  <Lightbulb size={15} />
                  HINT {hintCount}
                </button>
              </div>
            </div>

            {/* Campaign level completion */}
            {completed && mode === "campaign" && level < LEVELS.length - 1 && (
              <div className={`mt-4 rounded-2xl border p-4 text-center ${
                isLight ? "border-emerald-200 bg-emerald-50" : "border-emerald-400/30 bg-emerald-400/5"
              }`}>
                <Trophy className="mx-auto mb-2 text-yellow-500" size={27} />

                <h3 className="text-lg font-black tracking-widest text-emerald-600">
                  LEVEL COMPLETED
                </h3>

                <p className={`mt-1 text-[10px] ${mutedText}`}>
                  Excellent! All hidden words discovered.
                </p>

                <button
                  onClick={nextLevel}
                  className="mt-3 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-2.5 text-[10px] font-black tracking-widest text-white hover:bg-emerald-600"
                >
                  NEXT LEVEL <ArrowRight size={14} />
                </button>
              </div>
            )}

            {/* Daily completion */}
            {completed && mode === "daily" && (
              <div className={`mt-4 rounded-2xl border p-4 text-center ${
                isLight ? "border-cyan-200 bg-cyan-50" : "border-cyan-400/30 bg-cyan-400/5"
              }`}>
                <Trophy className="mx-auto mb-2 text-yellow-500" size={27} />

                <h3 className="text-lg font-black tracking-widest text-cyan-600">
                  DAILY CHALLENGE COMPLETE
                </h3>

                <p className={`mt-1 text-[10px] ${mutedText}`}>
                  Come back tomorrow for a new puzzle.
                </p>
              </div>
            )}
          </>
        )}

        {/* Footer */}
        <footer className={`mt-4 flex items-center justify-between border-t pt-3 ${
          isLight ? "border-violet-200" : "border-white/5"
        }`}>
          <span className="text-[8px] font-bold tracking-[.2em] text-slate-500">
            NEON PROTOCOL
          </span>

          <span className="text-[8px] tracking-widest text-slate-500">
            WORD MATRIX
          </span>
        </footer>
      </div>
    </section>
  );
}

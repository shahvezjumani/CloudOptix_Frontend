import { useState, useEffect } from "react";

export const TYPING_PHRASES = [
  "Find my resume",
  "Invoices from March",
  "Trip photos Karachi",
  "Contracts signed last week",
  "Show my flight tickets",
];

export default function useTypingEffect(
  phrases,
  typingSpeed = 65,
  pauseMs = 1600,
  deleteSpeed = 35,
) {
  const [text, setText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    let timeout;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((i) => i + 1), typingSpeed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pauseMs);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((i) => i - 1), deleteSpeed);
    } else {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % phrases.length);
    }

    setText(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [
    charIdx,
    deleting,
    phraseIdx,
    phrases,
    typingSpeed,
    pauseMs,
    deleteSpeed,
  ]);

  return text;
}

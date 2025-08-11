import { useState, useEffect } from 'react';

const TerminalText = ({ lines, onFinished }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setShowCursor(false);
      if (onFinished) onFinished();
      return;
    }

    const currentLine = lines[currentLineIndex];
    let charIndex = 0;
    setDisplayText('');

    const typingInterval = setInterval(() => {
      if (charIndex < currentLine.length) {
        setDisplayText((prev) => prev + currentLine.charAt(charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
        }, 800);
      }
    }, 40);

    return () => clearInterval(typingInterval);
  }, [currentLineIndex, lines, onFinished]);

  useEffect(() => {
    const cursorInterval = setInterval(() => setShowCursor((prev) => !prev), 530);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="font-mono text-xl md:text-3xl text-left min-h-[200px]">
      {lines.slice(0, currentLineIndex).map((line, index) => (
        <p key={index}><span className="text-brand-accent mr-2">&gt;</span>{line}</p>
      ))}
      <p>
        <span className="text-brand-accent mr-2">&gt;</span>
        {displayText}
        {showCursor && <span className="inline-block w-[10px] h-[1.7rem] bg-brand-accent ml-1 animate-cursor-blink" />}
      </p>
    </div>
  );
};

export default TerminalText;
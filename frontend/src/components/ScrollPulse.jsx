import { useEffect, useState } from 'react';
import './ScrollPulse.css';

const ScrollPulse = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const percentage = (scrolled / documentHeight) * 100;
      setScrollPercentage(percentage);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-pulse" style={{ width: `${scrollPercentage}%` }}>
      <div className="pulse-glow"></div>
    </div>
  );
};

export default ScrollPulse;

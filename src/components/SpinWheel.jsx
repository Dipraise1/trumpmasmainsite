import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

function SpinWheel() {
  const wheelRef = useRef();
  const [isSpinning, setIsSpinning] = useState(false);
  const prizes = ['100 TRUMP', '200 TRUMP', '500 TRUMP', '1000 TRUMP', '2000 TRUMP', '5000 TRUMP'];

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    
    const rotations = 5;
    const degrees = rotations * 360 + Math.floor(Math.random() * 360);
    
    gsap.to(wheelRef.current, {
      rotation: degrees,
      duration: 5,
      ease: "power4.out",
      onComplete: () => setIsSpinning(false)
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <motion.div
        ref={wheelRef}
        className="w-64 h-64 rounded-full bg-gradient-to-r from-red-600 to-green-600 relative"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      >
        {prizes.map((prize, index) => (
          <div
            key={index}
            className="absolute w-full h-full flex items-center justify-center text-white"
            style={{
              transform: `rotate(${index * (360 / prizes.length)}deg)`,
            }}
          >
            {prize}
          </div>
        ))}
      </motion.div>
      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className="mt-8 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
      >
        {isSpinning ? 'Spinning...' : 'SPIN TO WIN!'}
      </button>
    </div>
  );
}

export default SpinWheel;

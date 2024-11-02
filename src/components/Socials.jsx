import React, { useEffect, useState } from 'react';
import { SocialIcon } from 'react-social-icons';

function Socials() {  // Changed from const ChristmasSocials to function Socials
  const [snowflakes, setSnowflakes] = useState([]);
  
  const socials = [
    { url: 'https://twitter.com/trumpmass', label: 'Twitter', color: '#ff4444' },
    { url: 'https://t.me/trumpmass', label: 'Telegram', color: '#44ff44' },
    { url: 'https://discord.gg/trumpmass', label: 'Discord', color: '#4444ff' },
  ];

  useEffect(() => {
    const flakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 3 + 2}s`,
      animationDelay: `${Math.random() * 2}s`,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 overflow-hidden">
      {/* Snowflakes */}
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute text-white animate-fall"
          style={{
            left: flake.left,
            animation: `fall ${flake.animationDuration} linear infinite`,
            animationDelay: flake.animationDelay,
            top: '-20px',
          }}
        >
          ❄
        </div>
      ))}

      {/* Content Container */}
      <div className="container mx-auto px-4 py-16 relative">
        {/* Christmas Lights Top Border */}
        <div className="flex justify-center mb-8">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full mx-1 animate-pulse"
              style={{
                backgroundColor: ['#ff4444', '#44ff44', '#4444ff', '#ffff44'][i % 4],
                animation: `pulse ${1 + (i % 3)}s infinite`,
              }}
            />
          ))}
        </div>

        <h1 className="text-5xl font-bold mb-12 text-center text-white relative">
          <span className="block transform hover:scale-110 transition-transform duration-300">
            Join Our Festive Community
          </span>
          {/* Decorative candy canes */}
          <span className="absolute -left-8 top-1/2 transform -translate-y-1/2 text-4xl rotate-45">
            🍬
          </span>
          <span className="absolute -right-8 top-1/2 transform -translate-y-1/2 text-4xl -rotate-45">
            🍬
          </span>
        </h1>

        <div className="flex justify-center space-x-12">
          {socials.map((social, index) => (
            <div
              key={social.url}
              className="group relative transform hover:scale-110 transition-all duration-300"
            >
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              
              {/* Social Icon */}
              <div className="relative flex flex-col items-center">
                <div className="relative">
                  <SocialIcon
                    url={social.url}
                    bgColor="#ffffff"
                    style={{ height: 64, width: 64 }}
                    className="transform transition-transform duration-300 hover:rotate-12"
                  />
                  {/* Christmas decoration */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-xl">
                    {index === 0 ? '🎅' : index === 1 ? '🎄' : '🎁'}
                  </div>
                </div>
                
                {/* Label */}
                <span className="mt-4 text-lg font-semibold text-white group-hover:text-green-300 transition-colors duration-300">
                  {social.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="mt-16 text-center">
          <span className="text-3xl">🎄 🎁 ⛄ 🎄</span>
        </div>
      </div>

      {/* CSS for snowfall animation */}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fall {
          position: absolute;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
}

export default Socials;  // Changed from ChristmasSocials to Socials
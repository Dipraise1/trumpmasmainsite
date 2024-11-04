import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';

// Custom Icon Components to replace Lucide
const CustomIcon = ({ type }) => {
  const icons = {
    twitter: (
      <svg viewBox="0 0 24 24" className="w-12 h-12 fill-current">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5 0-.28-.03-.56-.08-.83A7.72 7.72 0 0 0 23 3z" />
      </svg>
    ),
    telegram: (
      <svg viewBox="0 0 24 24" className="w-12 h-12 fill-current">
        <path d="M21.67 3.17L2.9 10.93c-1.28.53-1.27 1.23-.23 1.55l4.76 1.49 11.05-7.02c.52-.32 1-.15.61.21l-8.95 8.1-.35 4.75c.51 0 .74-.23.98-.5l2.36-2.31 4.9 3.64c.9.5 1.54.24 1.77-.84l3.21-15.1c.32-1.3-.49-1.89-1.34-1.5z" />
      </svg>
    ),
    discord: (
      <svg viewBox="0 0 24 24" className="w-12 h-12 fill-current">
        <path d="M20.32 4.37a19.8 19.8 0 0 0-4.93-1.51 13.78 13.78 0 0 0-.64 1.28 18.27 18.27 0 0 0-5.5 0 12.64 12.64 0 0 0-.64-1.28h-.03A19.74 19.74 0 0 0 3.64 4.4 20.26 20.26 0 0 0 .33 18.3a19.95 19.95 0 0 0 6.07 3.03l.08-.09a13.85 13.85 0 0 0 6.02-3.03l-.02.02.02-.02a13.85 13.85 0 0 0 6.02 3.03l.08.09a19.95 19.95 0 0 0 6.07-3.03A20.25 20.25 0 0 0 20.32 4.37zM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.09 2.16 2.42 0 1.34-.96 2.42-2.16 2.42zm7.92 0c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.09 2.16 2.42 0 1.34-.95 2.42-2.16 2.42z" />
      </svg>
    )
  };
  return icons[type] || null;
};

// Enhanced 3D Scene Component with better performance
function ChristmasScene() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.1;
      groupRef.current.rotation.y += 0.002;
    }
  });

  const spheres = React.useMemo(() => 
    Array.from({ length: 50 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      ],
      key: i
    }))
  , []);

  return (
    <group ref={groupRef}>
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color="#ff0000"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      <mesh position={[0, 2, 0]}>
        <coneGeometry args={[0.7, 1.5, 32]} />
        <meshStandardMaterial 
          color="#2d5a27"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
      
      <mesh position={[0, 2.8, 0]}>
        <tetrahedronGeometry args={[0.3]} />
        <meshStandardMaterial 
          color="#ffd700"
          emissive="#ffb900"
          emissiveIntensity={2}
        />
      </mesh>

      {spheres.map(({ position, key }) => (
        <mesh key={key} position={position}>
          <sphereGeometry args={[0.05]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" />
        </mesh>
      ))}
    </group>
  );
}

// Optimized Stats Card with better animations
const StatsCard = React.memo(({ label, value, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`transform transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-green-600 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-1000"></div>
        <div className="relative bg-black/90 rounded-lg p-8 hover:scale-105 transition-transform duration-300">
          <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-red-500 to-green-500 bg-clip-text text-transparent">
            {value}
          </h3>
          <p className="text-gray-300 text-lg">{label}</p>
        </div>
      </div>
    </div>
  );
});

// Main Home Component with optimized rendering
function Home() {
  const [isHovered, setIsHovered] = useState(false);
  
  const stats = React.useMemo(() => [
    { label: 'Total Supply', value: '1,000,000,000' },
    { label: 'Holders', value: '10,000+(soon)' },
    { label: 'Rewards Given', value: '$1000+' },
  ], []);

  const socialLinks = React.useMemo(() => [
    { type: 'twitter', label: 'Twitter', description: 'Follow us for the latest updates and announcements' },
    { type: 'telegram', label: 'Telegram', description: 'Join our active community chat' },
    { type: 'discord', label: 'Discord', description: 'Join our Discord server' }
  ], []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-950/20 to-green-950/20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={2} />
            <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={2} />
            <ChristmasScene />
          </Canvas>
        </div>

        <div className="relative z-10 text-center px-4 mt-16">
          <div className="relative">
            <h1
              className={`text-7xl md:text-9xl font-bold mb-6 transition-all duration-300 ${
                isHovered ? 'scale-105' : 'scale-100'
              }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="bg-gradient-to-r from-red-500 via-white to-green-500 bg-clip-text text-transparent">
                🎄 TrumpMass 🎄
              </span>
            </h1>
            {isHovered && (
              <div className="absolute -inset-2 bg-gradient-to-r from-red-600 to-green-600 blur-xl opacity-20 -z-10"></div>
            )}
          </div>
          
          <p className="text-2xl md:text-3xl mb-12 max-w-3xl mx-auto text-gray-200 leading-relaxed">
            Spin the wheel and earn TRUMP tokens this Christmas! Join the most festive community in crypto.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="https://trumpmas.vercel.app/"
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-green-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200">
              </div>
              <button className="relative px-12 py-4 bg-black rounded-full text-xl font-bold text-white shadow-2xl hover:shadow-lg transition duration-200">
                Start Spinning!
              </button>
            </Link>

            <a
              href="#tokenomics"
              className="text-xl text-gray-300 hover:text-white transition-colors flex items-center gap-2"
            >
              Learn More ▼
            </a>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 sm:py-32 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 to-green-500 bg-clip-text text-transparent">
              Join Our Community
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-12">
              Be part of the most festive and rewarding community in crypto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {socialLinks.map(({ type, label, description }) => (
              <div key={type} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-1000"></div>
                <a href="#" className="relative flex flex-col items-center p-8 bg-black/90 rounded-lg hover:scale-105 transition-transform duration-300">
                  <CustomIcon type={type} />
                  <h3 className="text-xl font-bold text-white mb-2">{label}</h3>
                  <p className="text-gray-300 text-center">{description}</p>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-900/10 to-transparent"></div>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <StatsCard key={stat.label} {...stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <TokenomicsSection />
    </div>
  );
}

// Separated Tokenomics Section for better organization
const TokenomicsSection = React.memo(() => (
  <section id="tokenomics" className="py-32 relative">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 to-green-500 bg-clip-text text-transparent">
          Tokenomics
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Understanding the distribution and utility of TRUMP tokens
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <TokenDistribution />
        <div className="h-96 relative">
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={2} />
            <ChristmasScene />
          </Canvas>
        </div>
      </div>
    </div>
  </section>
  
));

// Optimized Token Distribution Component
const TokenDistribution = React.memo(() => {
  const data = React.useMemo(() => [
    { label: 'Liquidity Pool', value: 40, color: 'from-red-600 to-red-400' },
    { label: 'Team', value: 15, color: 'from-purple-600 to-purple-400' },
    { label: 'Community Rewards', value: 20, color: 'from-yellow-600 to-yellow-400' },
  ], []);

  return (
    <div className="space-y-6">
      {data.map((item) => (
        <div key={item.label} className="relative group">
          <div className="flex justify-between mb-2 text-lg">
            <span className="font-medium">{item.label}</span>
            <span className="font-bold">{item.value}%</span>
          </div>
          <div className="h-4 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className={`h-full bg-gradient-to-r ${item.color} transform origin-left transition-all duration-1000 group-hover:scale-x-105`}
              style={{ width: `${item.value}%` }}
            />
          </div>
        </div>
        
      ))}
    </div>
  );
});

// Add PropTypes for better development experience
StatsCard.displayName = 'StatsCard';
TokenDistribution.displayName = 'TokenDistribution';
TokenomicsSection.displayName = 'TokenomicsSection';

export default Home;
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Canvas, useFrame, useThree } from '@react-three/fiber';

// Enhanced 3D Scene Component
function ChristmasScene() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Ornament */}
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color="#ff0000"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Tree */}
      <mesh position={[0, 2, 0]}>
        <coneGeometry args={[0.7, 1.5, 32]} />
        <meshStandardMaterial 
          color="#2d5a27"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
      
      {/* Star */}
      <mesh position={[0, 2.8, 0]}>
        <tetrahedronGeometry args={[0.3]} />
        <meshStandardMaterial 
          color="#ffd700"
          emissive="#ffb900"
          emissiveIntensity={2}
        />
      </mesh>

      {/* Background Spheres */}
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh 
          key={i} 
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
          ]}
        >
          <sphereGeometry args={[0.05]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" />
        </mesh>
      ))}
    </group>
  );
}

// Animated Stats Card
const StatsCard = ({ label, value, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting)
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
};

// Enhanced Home Component
function Home() {
  const [isHovered, setIsHovered] = useState(false);
  
  const stats = [
    { label: 'Total Supply', value: '1,000,000,000' },
    { label: 'Holders', value: '10,000+' },
    { label: 'Rewards Given', value: '$500,000+' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-red-950/20 to-green-950/20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={2} />
            <spotLight
              position={[0, 10, 0]}
              angle={0.3}
              penumbra={1}
              intensity={2}
            />
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
        <img 
          src="/1 (1)@2x.png" 
          alt="Learn more icon" 
          className="w-10 h-15 rounded-full"
        />
      </a>
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
    </div>
  );
}

// Enhanced Token Distribution Component
function TokenDistribution() {
  const data = [
    { label: 'Liquidity Pool', value: 40, color: 'from-red-600 to-red-400' },
    { label: 'Marketing', value: 20, color: 'from-green-600 to-green-400' },
    { label: 'Development', value: 15, color: 'from-blue-600 to-blue-400' },
    { label: 'Team', value: 15, color: 'from-purple-600 to-purple-400' },
    { label: 'Community Rewards', value: 10, color: 'from-yellow-600 to-yellow-400' },
  ];

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
}

export default Home;
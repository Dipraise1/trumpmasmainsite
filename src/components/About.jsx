import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Snowflake, Star, PartyPopper } from 'lucide-react';

const SnowflakeBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute text-white/20"
        initial={{
          top: -20,
          left: `${Math.random() * 100}%`,
          scale: Math.random() * 0.5 + 0.5,
        }}
        animate={{
          top: '100vh',
          rotate: 360,
        }}
        transition={{
          duration: Math.random() * 10 + 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <Snowflake />
      </motion.div>
    ))}
  </div>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div 
    className="bg-white/10 backdrop-blur-lg rounded-xl p-6 flex flex-col items-center text-center border border-red-200/20 shadow-lg transform-gpu"
    whileHover={{ scale: 1.05, rotateY: 5 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <motion.div 
      className="mb-4"
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <Icon className="w-12 h-12 text-red-400" />
    </motion.div>
    <h3 className="text-xl font-bold mb-2 text-green-400">{title}</h3>
    <p className="text-gray-200">{description}</p>
  </motion.div>
);

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 via-red-900 to-green-900 text-white p-8 relative overflow-hidden">
      <SnowflakeBackground />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto relative"
      >
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            animate={{ 
              rotate: [0, 2, -2, 0],
              scale: [1, 1.02, 1]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-block"
          >
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-red-400 via-green-400 to-red-400 text-transparent bg-clip-text">
              🎄 TrumpMass 🎄
            </h1>
          </motion.div>
          <p className="text-xl text-red-200 max-w-2xl mx-auto">
            Spread the holiday cheer with our festive spin-to-earn platform on Solana!
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <FeatureCard
            icon={Gift}
            title="Holiday Rewards"
            description="Unwrap TRUMP tokens with every spin! Special Christmas bonuses and surprise gifts await you."
          />
          <FeatureCard
            icon={Star}
            title="Festive Spins"
            description="Each spin brings the magic of Christmas. More spins mean more chances to win bigger prizes!"
          />
          <FeatureCard
            icon={PartyPopper}
            title="Christmas Events"
            description="Join our special holiday events and competitions for exclusive seasonal rewards."
          />
          <FeatureCard
            icon={Snowflake}
            title="Winter Bonuses"
            description="Daily bonus spins and increased rewards during the winter season. The more you participate, the merrier!"
          />
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center"
          whileHover={{ scale: 1.05 }}
        >
          <motion.button
            className="bg-gradient-to-r from-red-500 to-green-500 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform-gpu flex items-center justify-center gap-2 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Gift className="w-6 h-6" />
            Start Your Holiday Adventure
          </motion.button>
        </motion.div>

        {/* Footer Decoration */}
        <div className="mt-16 text-center text-6xl">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ⭐ 🎄 ⭐
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default About;
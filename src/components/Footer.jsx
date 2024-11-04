import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full px-4 py-12 bg-[#34120d] flex sm:flex-row flex-col gap-8 justify-between items-center">
      <div className="flex flex-col items-center justify-start text-center sm:items-start sm:text-left">
        <img
          src="/1 (1)@2x.png" /* Increased placeholder size */
          alt="Logo"
          className="object-contain w-24"
        />
        <p className="text-lg font-medium text-slate-300">TrumpMass</p>
        <p className="text-lg font-medium text-slate-300">
          © 2024 TrumpMass. All rights reserved
        </p>
      </div>
      <div className="flex items-center justify-center gap-4 text-lg font-medium text-slate-300">
        <Link to={""}>Spin</Link>
        <Link to={""}>About</Link>
        <Link to={""}>Social</Link>
        <Link to={""}>Learn More</Link>
      </div>
    </footer>
  );
}

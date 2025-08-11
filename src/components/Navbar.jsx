import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-brand-dark/50 backdrop-blur-sm border-b border-brand-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center gap-2">
            <img className="h-8 w-auto" src={logo} alt="Terragrain Logo" />
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8 font-bold text-brand-secondary">
              <a href="#story" className="hover:text-brand-light transition-colors">Our Story</a>
              <a href="#process" className="hover:text-brand-light transition-colors">Process</a>
              <a href="#contact" className="hover:text-brand-light transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
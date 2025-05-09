
import React from 'react';

const Navigation: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-primary flex items-center">Study Catcher</h1>
        </div>
        <nav>
          <ul className="flex gap-4">
            <li>
              <button className="text-foreground/80 hover:text-primary transition-colors">
                Dashboard
              </button>
            </li>
            <li>
              <button className="text-foreground/80 hover:text-primary transition-colors">
                History
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;

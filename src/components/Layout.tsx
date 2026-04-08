import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Home, CalendarDays, Trophy, User } from 'lucide-react';
import { cn } from '../lib/utils';

export const Layout = () => {
  const navItems = [
    { icon: Home, label: 'Inicio', path: '/' },
    { icon: CalendarDays, label: 'Partidos', path: '/partidos' },
    { icon: Trophy, label: 'Ranking', path: '/ranking' },
    { icon: User, label: 'Perfil', path: '/perfil' },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto relative overflow-hidden shadow-2xl">
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 w-full bg-white border-t border-gray-100 px-6 py-3 flex justify-between items-center z-50">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 text-xs font-medium transition-colors",
                isActive ? "text-violet-900" : "text-gray-400 hover:text-gray-600"
              )
            }
          >
            <item.icon className="w-6 h-6" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

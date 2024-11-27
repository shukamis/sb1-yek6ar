import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const routeLabels: Record<string, string> = {
  dashboard: 'Dashboard',
  setup: 'Configuração',
  profile: 'Perfil',
  premium: 'Premium',
};

export function Breadcrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
      <Link
        to="/"
        className="flex items-center hover:text-gray-700 transition-colors"
      >
        <Home className="h-4 w-4" />
      </Link>
      
      {pathSegments.map((segment, index) => (
        <React.Fragment key={segment}>
          <ChevronRight className="h-4 w-4" />
          <Link
            to={`/${pathSegments.slice(0, index + 1).join('/')}`}
            className="hover:text-gray-700 transition-colors"
          >
            {routeLabels[segment] || segment}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
}
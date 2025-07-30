import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useSound } from '@/hooks/useSound';

const Navbar = () => {
  const location = useLocation();
  const { playHover, playClick } = useSound();

  const navItems = [
    { path: '/', label: 'Главная', icon: 'Home' },
    { path: '/cases', label: 'Кейсы', icon: 'Package' },
    { path: '/opening', label: 'Открытие', icon: 'Zap' },
    { path: '/inventory', label: 'Инвентарь', icon: 'Backpack' },
    { path: '/profile', label: 'Профиль', icon: 'User' },
  ];

  return (
    <nav className="bg-card border-b border-cs2-orange/20 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Icon name="Gamepad2" className="text-cs2-orange" size={32} />
            <span className="text-2xl font-bold text-cs2-orange">CS2 Cases</span>
          </Link>
          
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={location.pathname === item.path ? "default" : "ghost"}
                asChild
                className={location.pathname === item.path ? "bg-cs2-orange text-black cs2-glow" : "hover:bg-cs2-orange/10"}
              >
                <Link 
                  to={item.path} 
                  className="flex items-center space-x-2"
                  onMouseEnter={playHover}
                  onClick={playClick}
                >
                  <Icon name={item.icon as any} size={18} />
                  <span>{item.label}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
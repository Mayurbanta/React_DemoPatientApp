import { useLayoutStore } from '../../store/layoutStore';
import { Menu, Bell } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function Navbar() {
  const setMobileDrawerOpen = useLayoutStore(state => state.setMobileDrawerOpen);

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-4 sticky top-0 z-10 shrink-0">
      <div className="flex items-center">
        <Button variant="ghost" className="lg:hidden p-2 h-auto mr-2" onClick={() => setMobileDrawerOpen(true)}>
          <Menu size={20} />
        </Button>
        <h1 className="text-xl font-semibold hidden sm:block">Dashboard</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block w-64">
          <Input type="text" placeholder="Quick search..." className="rounded-full bg-slate-50" />
        </div>
        <Button variant="ghost" className="relative p-2 h-auto rounded-full">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
      </div>
    </header>
  );
}

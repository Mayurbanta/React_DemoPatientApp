import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useLayoutStore } from '../../store/layoutStore';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { X, LogOut, Calendar, Users, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export function AppShell() {
  const { isMobileDrawerOpen, setMobileDrawerOpen } = useLayoutStore();
  const logout = useAuthStore(state => state.logout);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      
      {/* Mobile Drawer */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileDrawerOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-slate-900 text-slate-100 flex flex-col shadow-xl">
            <div className="p-4 flex items-center justify-between border-b border-slate-800 h-16">
              <span className="font-bold text-lg">Patient Portal</span>
              <Button variant="ghost" className="text-slate-100 p-2 h-auto hover:bg-slate-800 hover:text-white" onClick={() => setMobileDrawerOpen(false)}>
                <X size={20} />
              </Button>
            </div>
            
            <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
               <MobileNavItem to="/appointments" icon={<Calendar size={20} />} label="Appointments" onClick={() => setMobileDrawerOpen(false)} />
               <MobileNavItem to="/patients" icon={<Users size={20} />} label="Directory" onClick={() => setMobileDrawerOpen(false)} />
               <MobileNavItem to="/settings" icon={<Settings size={20} />} label="Settings" onClick={() => setMobileDrawerOpen(false)} />
            </nav>

            <div className="p-4 border-t border-slate-800">
              <Button variant="ghost" onClick={logout} className="w-full flex justify-start text-slate-100 hover:text-white hover:bg-slate-800">
                <LogOut size={20} />
                <span className="ml-2">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col flex-1 min-w-0 h-screen">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

function MobileNavItem({ to, icon, label, onClick }: { to: string, icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) => cn(
        "flex items-center p-2 rounded-md transition-colors",
        isActive ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
      )}
    >
      {icon}
      <span className="ml-3">{label}</span>
    </NavLink>
  );
}

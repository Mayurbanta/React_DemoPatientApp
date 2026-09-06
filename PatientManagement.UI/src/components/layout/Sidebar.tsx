import { NavLink } from 'react-router-dom';
import { useLayoutStore } from '../../store/layoutStore';
import { useAuthStore } from '../../store/authStore';
import { Calendar, Users, Settings, LogOut, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';

export function Sidebar() {
  const { isSidebarCollapsed, toggleSidebar } = useLayoutStore();
  const logout = useAuthStore(state => state.logout);

  return (
    <div className={cn(
      "hidden lg:flex flex-col bg-slate-900 text-slate-100 transition-all duration-300 h-screen",
      isSidebarCollapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 flex items-center justify-between border-b border-slate-800 h-16">
        {!isSidebarCollapsed && <span className="font-bold text-lg truncate">Patient Portal</span>}
        <Button variant="ghost" className="text-slate-100 hover:text-white hover:bg-slate-800 p-2 h-auto" onClick={toggleSidebar}>
          {isSidebarCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
        </Button>
      </div>

      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        <NavItem to="/appointments" icon={<Calendar size={20} />} label="Appointments" collapsed={isSidebarCollapsed} />
        <NavItem to="/patients" icon={<Users size={20} />} label="Directory" collapsed={isSidebarCollapsed} />
        <NavItem to="/settings" icon={<Settings size={20} />} label="Settings" collapsed={isSidebarCollapsed} />
      </nav>

      <div className="p-4 border-t border-slate-800">
        <Button variant="ghost" onClick={logout} className={cn("w-full flex text-slate-100 hover:text-white hover:bg-slate-800", isSidebarCollapsed ? "justify-center" : "justify-start")}>
          <LogOut size={20} />
          {!isSidebarCollapsed && <span className="ml-2">Logout</span>}
        </Button>
      </div>
    </div>
  );
}

function NavItem({ to, icon, label, collapsed }: { to: string, icon: React.ReactNode, label: string, collapsed: boolean }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        "flex items-center p-2 rounded-md transition-colors",
        isActive ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white",
        collapsed && "justify-center"
      )}
      title={collapsed ? label : undefined}
    >
      {icon}
      {!collapsed && <span className="ml-3 truncate">{label}</span>}
    </NavLink>
  );
}

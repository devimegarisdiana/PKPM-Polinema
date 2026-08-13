import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import {
  Newspaper, GraduationCap, Store, BookOpen,
  Handshake, Image, LayoutDashboard, LogOut, ChevronRight
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/berita", label: "Berita", icon: Newspaper },
  { href: "/admin/program", label: "Program", icon: GraduationCap },
  { href: "/admin/umkm", label: "UMKM Binaan", icon: Store },
  { href: "/admin/publikasi", label: "Publikasi", icon: BookOpen },
  { href: "/admin/mitra", label: "Mitra", icon: Handshake },
  { href: "/admin/galeri", label: "Galeri", icon: Image },
];

interface Props {
  children: ReactNode;
  user: string;
  onLogout: () => void;
}

export default function AdminLayout({ children, user, onLogout }: Props) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-60 bg-[#0a2558] flex flex-col shrink-0">
        <div className="px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#f0a500] rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-xs">PK</span>
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-tight">Panel Admin</p>
              <p className="text-white/50 text-xs">PKPM Polinema</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? location === href : location.startsWith(href);
            return (
              <Link key={href} href={href}>
                <a className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-white/15 text-white font-medium"
                    : "text-white/65 hover:text-white hover:bg-white/10"
                }`}>
                  <Icon className="w-4 h-4 shrink-0" />
                  {label}
                  {active && <ChevronRight className="w-3 h-3 ml-auto opacity-60" />}
                </a>
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <div className="flex items-center gap-2 px-3 py-2 mb-1">
            <div className="w-7 h-7 rounded-full bg-[#f0a500] flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-xs uppercase">{user[0]}</span>
            </div>
            <span className="text-white/80 text-sm flex-1 truncate">{user}</span>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 w-full px-3 py-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}

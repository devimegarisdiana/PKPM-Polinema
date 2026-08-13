import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, BookOpen, GraduationCap, Users, LayoutDashboard, Image as ImageIcon, MapPin } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Beranda", path: "/" },
  { name: "Profil", path: "/profil" },
  { name: "Berita", path: "/berita" },
  { name: "Program", path: "/program" },
  { name: "UMKM", path: "/umkm" },
  { name: "Publikasi", path: "/publikasi" },
  { name: "Mitra", path: "/mitra" },
  { name: "Galeri", path: "/galeri" },
  { name: "Kontak", path: "/kontak" },
];

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <h1 className="font-bold text-lg leading-tight tracking-tight text-primary">PKPM Polinema</h1>
                <p className="text-[10px] md:text-xs text-muted-foreground font-medium hidden sm:block">
                  Pusat Kajian Pemberdayaan Masyarakat
                </p>
              </div>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "text-sm font-semibold transition-colors hover:text-primary relative py-2",
                  location === link.path ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.name}
                {location === link.path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button className="hidden md:flex bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold shadow-sm">
              Dukung Kami
            </Button>
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b bg-background absolute w-full pb-4 shadow-lg">
          <nav className="flex flex-col container mx-auto px-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "py-4 border-b border-border/50 text-base font-semibold",
                  location === link.path ? "text-primary" : "text-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-6">
              <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold">
                Dukung Kami
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';
import { Layout } from '@/components/layout/Layout';
import { useAdminAuth } from '@/hooks/useAdmin';
import AdminLayout from '@/components/admin/AdminLayout';

// Public pages
import Home from '@/pages/Home';
import Profile from '@/pages/Profile';
import ArticleList from '@/pages/articles/ArticleList';
import ArticleDetail from '@/pages/articles/ArticleDetail';
import ProgramList from '@/pages/programs/ProgramList';
import ProgramDetail from '@/pages/programs/ProgramDetail';
import UmkmList from '@/pages/umkm/UmkmList';
import UmkmDetail from '@/pages/umkm/UmkmDetail';
import PublicationList from '@/pages/publications/PublicationList';
import PublicationDetail from '@/pages/publications/PublicationDetail';
import PartnerList from '@/pages/partners/PartnerList';
import GalleryList from '@/pages/gallery/GalleryList';
import Contact from '@/pages/Contact';

// Admin pages
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminArticles from '@/pages/admin/AdminArticles';
import AdminPrograms from '@/pages/admin/AdminPrograms';
import AdminUmkm from '@/pages/admin/AdminUmkm';
import AdminPublications from '@/pages/admin/AdminPublications';
import AdminPartners from '@/pages/admin/AdminPartners';
import AdminGallery from '@/pages/admin/AdminGallery';

const queryClient = new QueryClient();

function AdminSection() {
  const { user, loading, setUser, logout } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a2558] flex items-center justify-center">
        <div className="text-white/60 text-sm">Memuat...</div>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin onLogin={setUser} />;
  }

  return (
    <AdminLayout user={user} onLogout={logout}>
      <Switch>
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/berita" component={AdminArticles} />
        <Route path="/admin/program" component={AdminPrograms} />
        <Route path="/admin/umkm" component={AdminUmkm} />
        <Route path="/admin/publikasi" component={AdminPublications} />
        <Route path="/admin/mitra" component={AdminPartners} />
        <Route path="/admin/galeri" component={AdminGallery} />
        <Route component={NotFound} />
      </Switch>
    </AdminLayout>
  );
}

function PublicRouter() {
  return (
    <Layout>
      <RoutedErrorBoundary>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/profil" component={Profile} />
          <Route path="/berita" component={ArticleList} />
          <Route path="/berita/:id" component={ArticleDetail} />
          <Route path="/program" component={ProgramList} />
          <Route path="/program/:id" component={ProgramDetail} />
          <Route path="/umkm" component={UmkmList} />
          <Route path="/umkm/:id" component={UmkmDetail} />
          <Route path="/publikasi" component={PublicationList} />
          <Route path="/publikasi/:id" component={PublicationDetail} />
          <Route path="/mitra" component={PartnerList} />
          <Route path="/galeri" component={GalleryList} />
          <Route path="/kontak" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </RoutedErrorBoundary>
    </Layout>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function RootRouter() {
  const [location] = useLocation();
  if (location.startsWith('/admin')) {
    return <AdminSection />;
  }
  return <PublicRouter />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <RootRouter />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

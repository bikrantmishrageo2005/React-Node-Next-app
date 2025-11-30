import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import MainLayout from "@/components/layout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import MapPage from "@/pages/MapPage";
import AnalysisPage from "@/pages/AnalysisPage";
import GuardiansPage from "@/pages/GuardiansPage";
import OmegaPage from "@/pages/OmegaPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <MainLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/map" component={MapPage} />
        <Route path="/analysis" component={AnalysisPage} />
        <Route path="/guardians" component={GuardiansPage} />
        <Route path="/omega" component={OmegaPage} />
        <Route component={NotFound} />
      </Switch>
    </MainLayout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;

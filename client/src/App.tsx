import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import MainLayout from "@/components/layout/MainLayout";
import Dashboard from "@/pages/Dashboard";
import MapPage from "@/pages/MapPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <MainLayout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/map" component={MapPage} />
        <Route path="/analysis" component={() => <div className="text-neon-cyan font-orbitron text-4xl text-center mt-20">ANALYSIS MODULE LOCKED</div>} />
        <Route path="/guardians" component={() => <div className="text-neon-cyan font-orbitron text-4xl text-center mt-20">GUARDIAN SYSTEMS OFFLINE</div>} />
        <Route path="/omega" component={() => <div className="text-neon-cyan font-orbitron text-4xl text-center mt-20">OMEGA CORE INITIALIZING...</div>} />
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

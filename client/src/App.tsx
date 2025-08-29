import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Home from "@/pages/home";
import Articles from "@/pages/articles/index";
import ArticleDetails from "@/pages/articles/[id]";
import Whistleblower from "@/pages/whistleblower";
import Community from "@/pages/community";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Dashboard from "@/pages/dashboard";
import IPFSTest from "@/pages/ipfs-test";
import BlockchainTest from "@/pages/blockchain-test";
import { AuthProvider } from "@/lib/auth";
import { Web3Provider } from "@/hooks/use-web3";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/articles" component={Articles} />
      <Route path="/articles/:id" component={ArticleDetails} />
      <Route path="/whistleblower" component={Whistleblower} />
      <Route path="/community" component={Community} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/ipfs-test" component={IPFSTest} />
      <Route path="/blockchain-test" component={BlockchainTest} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Web3Provider>
          <div className="min-h-screen flex flex-col bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100">
            <Navbar />
            <main className="flex-1">
              <Router />
            </main>
            <Footer />
          </div>
          <Toaster />
        </Web3Provider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

import { Redirect, Route, Switch } from "wouter";
import NotFound from "./pages/NotFound";
import Login from "./pages/login";
import ProtectedRoute from "./lib/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import { Leads } from "./pages/Leads";

export function Router() {
  const dashboard = Dashboard;
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/">
        <Redirect to="/login" />
      </Route>
      <Route
        path="/home"
        component={() => <ProtectedRoute component={dashboard} />}
      />
      <Route
        path="/leads"
        component={() => <ProtectedRoute component={Leads} />}
      />
      <Route component={() => <ProtectedRoute component={NotFound} />} />
    </Switch>
  );
}

import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";

import './index.css'
import Header from "./components/Header";

import Home from "./views/Home";
import About from "./views/About";
import ManageFilters from "./views/ManageFilters";
import NotFound from "./views/NotFound";

const App = props => (
  <>
    <Header />
    {props.children}
  </>
)

render(() => (
  <Router root={App}>
    <Route path="/about" component={About} />
    <Route path="/manage-filters" component={ManageFilters} />
    <Route path="/" component={Home} />
    <Route path="*404" component={NotFound} />
  </Router>
), document.getElementById("root"));

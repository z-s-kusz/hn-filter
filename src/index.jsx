import { Show, render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";

import './index.css'
import Header from "./components/Header";

import Home from "./views/Home";
import About from "./views/About";
import ManageFilters from "./views/ManageFilters";
import NotFound from "./views/NotFound";
import LLMTest from './views/LLM-Test';

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

    <Show when={import.meta.env.DEV}>
      <Route path="/llm-test" component={LLMTest} />
    </Show>

    <Route path="/" component={Home} />
    <Route path="*404" component={NotFound} />
  </Router>
), document.getElementById("root"));

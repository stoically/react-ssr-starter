import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import { FilmList } from "./FilmList";
import { FilmView } from "./FilmView";

export function App(): JSX.Element {
  return (
    <div className="flex flex-col h-full">
      <nav>
        <div className="flex justify-center bg-gray-200">
          <div className="font-bold text-xl p-2">
            <Link to="/">Star Wars</Link>
          </div>
        </div>
      </nav>
      <main>
        <div className="flex justify-center">
          <Switch>
            <Route exact path="/" component={FilmList} />
            <Route path="/film/:id" component={FilmView} />
          </Switch>
        </div>
      </main>
    </div>
  );
}

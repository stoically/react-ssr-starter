import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import { CompanyList } from "./CompanyList";
import { CompanyView } from "./CompanyView";

export function App(): JSX.Element {
  return (
    <div className="flex flex-col h-full">
      <nav>
        <div className="flex justify-center bg-gray-200">
          <div className="font-bold text-xl p-2">
            <Link to="/">Companies</Link>
          </div>
        </div>
      </nav>
      <main>
        <div className="flex justify-center">
          <Switch>
            <Route exact path="/" component={CompanyList} />
            <Route path="/company/:id" component={CompanyView} />
          </Switch>
        </div>
      </main>
    </div>
  );
}

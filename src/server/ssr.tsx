import fs from "fs";
import path from "path";
import cheerio from "cheerio";
import fetch from "node-fetch";
import React from "react";
import ReactDOM from "react-dom/server";
import { StaticRouterContext } from "react-router";
import { StaticRouter } from "react-router-dom";
import { Request, Response } from "express";
import { ApolloProvider } from "@apollo/react-hooks";
import { getDataFromTree } from "@apollo/react-ssr";

import { apollo } from "../client/apollo";
import { App } from "../client/components/App";

const templatePath = path.join(__dirname, "..", "client", "index.html");
const HTML_TEMPLATE = fs.readFileSync(templatePath).toString();

export default async (req: Request, res: Response): Promise<void> => {
  // https://www.apollographql.com/docs/react/performance/server-side-rendering/#server-side-rendering
  const client = apollo({ fetch, ssrMode: true });

  // https://reacttraining.com/react-router/web/guides/server-rendering
  const context: StaticRouterContext = {};
  const router = (
    <StaticRouter location={req.originalUrl} context={context}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </StaticRouter>
  );

  // https://www.apollographql.com/docs/react/performance/server-side-rendering/#using-getdatafromtree
  await getDataFromTree(router);

  // https://reactjs.org/docs/react-dom-server.html#rendertostring
  const html = ReactDOM.renderToString(router);

  if (context.url) {
    res.redirect(301, context.url);
  } else {
    const $ = cheerio.load(HTML_TEMPLATE);
    $("#app").html(html);

    // https://www.apollographql.com/docs/react/performance/server-side-rendering/#store-rehydration
    $("head").append(
      `<script>window.__APOLLO_STATE__= ${JSON.stringify(
        client.extract()
      ).replace(/</g, "\\u003c")};</script>`
    );

    res.send($.html());
  }
};

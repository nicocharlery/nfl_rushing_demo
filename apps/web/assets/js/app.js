// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from "../css/app.css"
import "phoenix_html"
import React from "react";
import ReactDOM from "react-dom";
import { ListingPage } from "./listing_page.jsx"

ReactDOM.render(<ListingPage />, document.querySelector("#root"));

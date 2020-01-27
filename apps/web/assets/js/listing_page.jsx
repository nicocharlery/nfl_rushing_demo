import React from "react";
import ReactDOM from "react-dom";
import { Listing } from "./listing.jsx"

export class ListingPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = {results: []}
  }

  getResults(){
    fetch(`http://localhost:4000/api/rushings`)
      .then( (response) => {
	console.log(response);
        return response.json()
      })
      .then( (json) => {
        this.setState({
          results: json["players"]
        })
      });
  }

  componentDidMount() {
    this.getResults();
  }

  render() {
   return <div>
      <Listing initial_results={this.state.results}/>
    </div>
  }
}

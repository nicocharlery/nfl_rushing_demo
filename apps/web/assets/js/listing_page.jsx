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
    const fields = [
      {accessor: "name", header: "Name"},
      {accessor: "team", header: "Team"},
      {accessor: "att", header: "Att"},
      {accessor: "att_g", header: "Att/G"},
      {accessor: "avg", header: "Avg"},
      {accessor: "first", header: "1st"},
      {accessor: "first_percent", header: "1st%"},
      {accessor: "fum", header: "FUM"},
      {accessor: "pos", header: "Pos"},
      {accessor: "td", header: "TD", sortable: true},
      {accessor: "val_20p", header: "20+"},
      {accessor: "val_40p", header: "40+"},
      {accessor: "yds", header: "Yds", sortable: true},
      {accessor: "yds_g", header: "Yds/G", sortable: true}
    ]
   return <div>
      <Listing initial_results={this.state.results} fields={fields}/>
    </div>
  }
}

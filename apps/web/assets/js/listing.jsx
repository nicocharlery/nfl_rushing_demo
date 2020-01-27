import React from "react";
import ReactDOM from "react-dom";

export class Listing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {name_filter: ""};
    this.onNameFilterChange = this.onNameFilterChange.bind(this);
  }

  onNameFilterChange(event){
    var value = event.target.value;
    this.setState({name_filter: value});
  }

  renderRow(row){
    return <tr key={row["name"]}>
      <td> {row["name"]} </td>
      <td> {row["team"]} </td>
      <td> {row["att"]} </td>
      <td> {row["att_g"]} </td>
      <td> {row["avg"]} </td>
      <td> {row["first"]} </td>
      <td> {row["first_percent"]} </td>
      <td> {row["fum"]} </td>
      <td> {row["lng"]} </td>
      <td> {row["pos"]} </td>
      <td> {row["td"]} </td>
      <td> {row["val_20p"]} </td>
      <td> {row["val_40p"]} </td>
      <td> {row["yds"]} </td>
      <td> {row["yds_g"]} </td>
      </tr>
  }

  filterByName(arr, query) {
    if(query == ""){ return arr }

    return arr.filter(function(el){
      return el["name"].toLowerCase().indexOf(query.toLowerCase()) !== -1
    })
  }

  render() {
    var results = this.filterByName(this.props.initial_results, this.state.name_filter);
    console.log(results);

    return <div>
      <input id="name_filter" onChange={this.onNameFilterChange} />
      <table>
      <thead>
      <tr>
      <td>Name </td>
      <td>Team</td>
      <td>Att</td>
      <td>Att/G</td>
      <td>Avg</td>
      <td>1st</td>
      <td>1st%</td>
      <td>Fum</td>
      <td>Lng</td>
      <td>Pos</td>
      <td>TD</td>
      <td>20+</td>
      <td>40+</td>
      <td>Yds</td>
      <td>Yds/G</td>
      </tr>
      </thead>
      <tbody>
      {results.map(this.renderRow)}
      </tbody>
      </table>
    </div>
  }
}

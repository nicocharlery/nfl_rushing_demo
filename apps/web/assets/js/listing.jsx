import React from "react";
import ReactDOM from "react-dom";

export class Listing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name_filter: "",
      sort_col_direction: {},
    };
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

  onSortChange(field) {
    let current_direction = this.state.sort_col_direction.direction;
    let next_direction;

    if (current_direction === 'asc') next_direction = 'desc';
    else if (current_direction === 'desc') next_direction = 'asc';
    else if (current_direction === 'default') next_direction = 'asc';
    else if (current_direction === undefined) next_direction = 'asc';

    this.setState({ sort_col_direction: { field: field, direction: next_direction }});
  }

  translate_direction(field, sort_col_direction) {
    if(sort_col_direction == {}) return;
    if(sort_col_direction["field"] != field) return;

    let direction = sort_col_direction["direction"]
    if (direction === 'asc') return "asc";
    else if (direction === 'desc') return "desc";
    else if (direction === 'default') return ;
  }

  sortByField(arr, sort_col_direction){
    if(sort_col_direction == {}) return arr;

    let field = sort_col_direction.field;
    let direction = sort_col_direction.direction;

    return arr.sort(function(a, b) {
      if(direction == "asc") return a[field] - b[field];
      if(direction == "desc") return b[field] - a[field];
    });
  }

  render() {
    let results = this.filterByName(this.props.initial_results, this.state.name_filter);
    results = this.sortByField(results, this.state.sort_col_direction);

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
      <td> Fum </td>
      <td>
      <button onClick={() => this.onSortChange("lng")}>
      Lng { this.translate_direction("lng", this.state.sort_col_direction) }
      </button>
      </td>
      <td>Pos</td>
      <td>
      <button onClick={() => this.onSortChange("td")}>
      TD { this.translate_direction("td", this.state.sort_col_direction) }
      </button>
      </td>
      <td>20+</td>
      <td>40+</td>
      <td>
      <button onClick={() => this.onSortChange("yds")}>
      Yds { this.translate_direction("yds", this.state.sort_col_direction) }
      </button>
      </td>
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

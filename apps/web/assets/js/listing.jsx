import React from "react";
import ReactDOM from "react-dom";
import { CSVLink } from "react-csv";
import { Parser } from "json2csv";

export class Listing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name_filter: "",
      sort_col_direction: {},
    };
    this.onNameFilterChange = this.onNameFilterChange.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.generateHeader = this.generateHeader.bind(this);
  }

  onNameFilterChange(event){
    var value = event.target.value;
    this.setState({name_filter: value});
  }

  renderRow(row){
    const fields = this.props.fields.map(function(field){
      return <td key={ `${row['name']}-${field.accessor}` }>{ row[field.accessor] }</td>
    });

    return  <tr key={ row["name"] }>{fields}</tr>
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

  renderCSVLink(results) {
    if(results.length == 0) return;

    const json2csvParser = new Parser();
    const csvData = json2csvParser.parse(results);

    return <CSVLink data={csvData} filename={"rushings.csv"} > Download me </CSVLink>
  }

  generateHeader(field) {
       if(field.sortable){
	return  <td key={field.header} >
	  <button onClick={() => this.onSortChange(field.accessor)}>
	  {field.header} { this.translate_direction(field.accessor, this.state.sort_col_direction) }
	  </button>
	</td>

      }else{
	return <td key={ field.header }>{ field.header }</td>
      }
  }

  render() {
    let results = this.filterByName(this.props.initial_results, this.state.name_filter);
    results = this.sortByField(results, this.state.sort_col_direction);

    let _this = this;
    const headers = this.props.fields.map(this.generateHeader);

    return <div>
      <input id="name_filter" onChange={this.onNameFilterChange} />
      { this.renderCSVLink(results) }

      <table>
      <thead>
      <tr>
      {headers}
      </tr>
      </thead>
      <tbody>
      {results.map(this.renderRow)}
      </tbody>
      </table>
    </div>
  }
}

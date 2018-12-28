import React from "react";
// unistore
import { connect } from "unistore/react";
import { actions } from "../store";
// primereact
import { MultiSelect } from "primereact/multiselect";

class Home extends React.Component {
  state = { cities: [] };

  render() {
    const cityItems = [
      { label: "New York", value: "NY" },
      { label: "Rome", value: "RM" },
      { label: "London", value: "LDN" },
      { label: "Istanbul", value: "IST" },
      { label: "Rome", value: "RM" },
      { label: "New York", value: "NY2" },
      { label: "Rome", value: "RM2" },
      { label: "London", value: "LDN2" },
      { label: "Istanbul", value: "IST2" },
      { label: "Rome", value: "RM2" },
      { label: "New York", value: "NY3" },
      { label: "Rome", value: "RM3" },
      { label: "London", value: "LDN3" },
      { label: "Istanbul", value: "IST3" },
      { label: "Rome", value: "RM3" },
      { label: "Paris", value: "PRS3" }
    ];

    return (
      <div className="home">
        <h1 className="centerAlign">Latest Resto</h1>
        <div className="content centerAlign">
          <MultiSelect
            defaultLabel="Choose open time"
            filter={true}
            value={this.state.cities}
            options={cityItems}
            onChange={e => this.setState({ cities: e.value })}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  "email,password",
  actions
)(Home);

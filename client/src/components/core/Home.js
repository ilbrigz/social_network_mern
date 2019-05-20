import React from "react";
import { connect } from "react-redux";
import axios from "axios";

class Home extends React.Component {
  state = {
    user: "",
    email: ""
  };
  componentDidMount() {
    if (this.props.auth.userId) this.fetchData();
  }

  fetchData = () => {
    axios
      .get(`/user/${this.props.auth.userId}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.response.data));
  };

  render() {
    return (
      <div className="jumbotron">
        <h2>Home</h2>
        <p />
        <p className="lead"> Welcome to React Frontend</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Home);

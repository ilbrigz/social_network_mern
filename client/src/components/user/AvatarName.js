import { Link } from "react-router-dom";
import DefaultProfile from "../../images/avatar.jpg";
import React, { PureComponent } from "react";

export default class AvatarName extends PureComponent {
  render() {
    console.log("rendered");
    const item = this.props.item;
    return (
      <Link to={`/user/${item._id}`}>
        <img
          height="30px"
          src={`http://localhost:8080/uploads/${item.image}`}
          alt={item.name}
          onError={i => (i.target.src = `${DefaultProfile}`)}
          className="float-left mr-2"
        />
        <div className="float-right">
          <p style={{ clear: "both" }}>{item.name}</p>
        </div>
      </Link>
    );
  }
}

import React from "react";
import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
import { Back_URL } from "../API/URL";
function Post({ title, summary, author, cover, content, createdAt, _id }) {
  return (
    <div className="post">
      <div className="image">
        <Link to={"/posts/" + _id}>
          <img src={`${Back_URL}/` + cover} alt="" />
        </Link>
      </div>

      <div className="details">
        <Link to={"/posts/" + _id}>
          <h1> {title} </h1>
        </Link>
        <p className="info">
          <span className="user">{author.username}</span>{" "}
          <time> {formatISO9075(new Date(createdAt))} </time>
        </p>
        <p>{summary}</p>
      </div>
    </div>
  );
}

export default Post;

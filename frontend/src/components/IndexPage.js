import React, { useEffect, useState } from "react";
import Post from "./Post";
import { Back_URL } from "../API/URL";

function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${Back_URL}/posts`, { credentials: "include" }).then((res) => {
      res.json().then((p) => {
        setPosts(p);
      });
    });
  }, []);

  return (
    <>{posts.length > 0 && posts.map((p) => <Post key={p._id} {...p} />)}</>
  );
}

export default IndexPage;

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserStateContext } from "./Usercontext";
import { Navigate } from "react-router-dom";
import { Back_URL } from "../API/URL";

function PostPage() {
  const [userInfos, SetUserInfo] = useState(null);
  const { userInfo, setUserInfo } = useContext(UserStateContext);
  const [redirect, SetRedirect] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetch(`${Back_URL}/posts/` + id).then((res) =>
      res.json().then((res) => SetUserInfo(res))
    );
  }, []);

  if (!userInfos) return "";

  async function handleDelete(e) {
    e.preventDefault();

    const response = await fetch(`${Back_URL}/delete`, {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      response.json().then((res) => {
        console.log(res);
        SetRedirect(true);
      });
    } else {
      alert("Try again Later");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="postSite">
      {}
      <h1 className="title">{userInfos.title}</h1>
      <p className="info">
        <span className="user">By {userInfos.author.username}</span>{" "}
        <time> {formatISO9075(new Date(userInfos.createdAt))} </time>
        {userInfo.id === userInfos.author._id && (
          <button onClick={handleDelete}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 24 24"
            >
              <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"></path>
            </svg>
          </button>
        )}
      </p>
      <div className="image">
        <img src={Back_URL + "/" + userInfos.cover} alt="" />
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: userInfos.content }}
      ></div>
    </div>
  );
}

export default PostPage;

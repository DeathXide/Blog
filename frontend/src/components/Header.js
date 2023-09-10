import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserStateContext } from "./Usercontext";
import { Back_URL } from "../API/URL";

function Header() {
  const { userInfo, setUserInfo } = useContext(UserStateContext);

  useEffect(() => {
    const response = fetch(`${Back_URL}/profile`, {
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        res.json().then((res) => {
          setUserInfo(res);
        });
      }
    });

    if (!response.ok) {
      setUserInfo(null);
    }
  }, []);

  function logout() {
    fetch(`${Back_URL}/logout`, {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  return (
    <header>
      <Link className="logo" to="/">
        My Blog
      </Link>

      <nav>
        {userInfo && (
          <>
            <Link to="/create">Create a post</Link>
            <a onClick={logout}>Log Out</a>
          </>
        )}

        {!userInfo && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;

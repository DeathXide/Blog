import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import { Back_URL } from "../API/URL";

function CreatPost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [text, setText] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, SetRedirect] = useState(false);

  async function handleData(e) {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("text", text);
    data.set("file", files[0]);

    const response = await fetch(`${Back_URL}/posts`, {
      method: "POST",
      body: data,
      credentials: "include",
    });

    if (response.ok) {
      SetRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <form onSubmit={handleData} className="postform">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <input
        type="text"
        value={summary}
        placeholder="Summary"
        onChange={(e) => {
          setSummary(e.target.value);
        }}
      />
      <input
        type="file"
        onChange={(e) => {
          setFiles(e.target.files);
        }}
      />
      <ReactQuill theme="snow" value={text} onChange={setText} />
      <button>Create</button>
    </form>
  );
}

export default CreatPost;

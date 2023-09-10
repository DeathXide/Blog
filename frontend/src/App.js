import "./App.css";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./components/IndexPage";
import Layout from "./components/Layout";
import Login from "./components/Login";
import Register from "./components/Register";
import { UserContext } from "./components/Usercontext";
import CreatPost from "./components/CreatPost";
import PostPage from "./components/PostPage";

function App() {
  return (
    <div className="App">
      <UserContext>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreatPost />} />
            <Route path="/posts/:id" element={<PostPage />} />
          </Route>
        </Routes>
      </UserContext>
    </div>
  );
}

export default App;

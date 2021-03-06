import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "../components/Footer";
import Login from "./Login";
import Buttons from "./Buttons";
import CreatePost from "./CreatePost";
import Wall from "./Wall";
import AdminPage from "./AdminPage";
import "../styles/App.css";

function App() {
  return (
    <div className="g-div-app">
      <header>
        <Header />
      </header>
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route
              exact
              path="/wall"
              element={
                <>
                  <Buttons />
                  <CreatePost />
                  <Wall />
                </>
              }
            />
            <Route exact path="/wall/adminpage" element={<AdminPage />} />
          </Routes>
        </Router>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;

import "./App.css";
import ButtonAppBar from "./components/navbar/navbar";
import TemporaryDrawer from "./components/sidebar/sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Worldwide from "./components/worldwide/worldwide";
import About from "./components/about/About";
import CountryStats from "./components/Countrystats/CountryStats";
function App() {
  return (
    <Router>
      <div className="App">
        <ButtonAppBar />
        <Routes>
          <Route path="/countrystats" element = {<CountryStats />}/>
          <Route path="/worldwide" element = {<Worldwide />}/>
          <Route path="/about" element = {<About />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import "./App.css";
import Authentication from "./Components/Authentication";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OptionComponent from "./Components/OptionComponent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<Authentication />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

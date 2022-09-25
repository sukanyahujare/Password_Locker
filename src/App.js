import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Register from './Components/Register';
import Login from "./Components/Login";
import Home from "./Components/Home";
import{database} from './firebaseConfig';

function App() {
  return (
    <div className="App">
  <BrowserRouter>
        <Routes>
          {/* <Route path="/register" element={<Register database={database}/>} /> */}
          <Route path="/register" element={<Register database={database}/>} />
        <Route path="/" element={<Login  database={database}/>} />
        <Route path="/home" element={<Home  database={database}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

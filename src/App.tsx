import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginForm from "./pages/FIrstPage";
import SecondPage from "./pages/SecondPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";

const App = () => {
  return (
    <div className="app">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}  />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/second-page"
            element={<ProtectedRoute Component={SecondPage} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

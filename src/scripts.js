import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Homepage from "./Components/Homepage";

const Scripts = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/homepage" element={<Homepage />} />
            </Routes>
        </Router>
    );
};

const rootElement = ReactDOM.createRoot(document.getElementById("root"));
rootElement.render(<Scripts />);

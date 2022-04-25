import React, { useState } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style/style.scss";
import { useSelector } from "react-redux";
// import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import MemoryGame from "./games/MemoryGame/MemoryGame";

function App() {
	return (
		<BrowserRouter>
			{/* <Navbar /> */}
			<Routes>
				{/* <Route path='/' exact element={<Home />} /> */}
				<Route path='/game/memory-game' exact element={<MemoryGame />} />
			</Routes>
		</BrowserRouter>
	)
};

export default App;
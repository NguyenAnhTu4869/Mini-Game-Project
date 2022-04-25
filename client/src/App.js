import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.js';
import React, { useState } from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import "./style/style.scss";
import { useSelector } from "react-redux";
import MenuBar from "./component/Navbar/Navbar";
import Login from "./pages/Login"
import Home from "./pages/Home";
import MemoryGame from "./games/MemoryGame/MemoryGame";
// import { useParams } from "react-router-dom";
// import { useLocation } from 'react-router-dom';

function App() {
	return (
		<BrowserRouter>
			<MenuBar />
			<Routes>
				<Route path='/login' exact element={<Login />} />
				<Route path='/' exact element={<Home />} />
				<Route path='/game/memory-game' exact element={<MemoryGame />} />
			</Routes>
		</BrowserRouter>
	)
};

export default App;
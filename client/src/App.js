import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.js';
import React, { Fragment } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import "./style/style.scss";
import { useSelector } from "react-redux";
import MenuBar from "./component/Navbar/Navbar";
import Login from "./pages/Login"
import Home from "./pages/Home";
import MemoryGame from "./games/MemoryGame/MemoryGame";

/** Access page before login */
function GlobalRoute({ children }) {
	return (
		<BrowserRouter>
			<Routes>{children}</Routes>
		</BrowserRouter>
	);
}

/** Access page after login */
function PrivateRoute({ children }) {
	return (
		<Fragment>
			<BrowserRouter>
				<MenuBar />
				<Routes>{children}</Routes>
			</BrowserRouter>
		</Fragment>
	);
}

function App() {
	const isLogin = useSelector((state) => state.user.isLogin);

	return (
		<Fragment>
			{isLogin && (
				<PrivateRoute>
					<Route path='/login' exact element={<Navigate to='/' />} />
					<Route path='/' exact element={<Home />} />
					<Route path='/game/memory-game' exact element={<MemoryGame />} />
				</PrivateRoute>
			)}
			{!isLogin && (
				<GlobalRoute>
					<Route path='/login' exact element={<Login />} />
					<Route path='*' element={<Navigate to='/login' />} />
				</GlobalRoute>
			)}
		</Fragment>
	)
};

export default App;
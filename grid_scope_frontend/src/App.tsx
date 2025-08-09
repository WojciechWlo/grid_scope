import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import SpreadsheetOutListScreen from './screens/SpreadsheetOutListScreen';
import SpreadsheetInListScreen from './screens/SpreadsheetInListScreen';
import SpreadsheetListScreen from './screens/SpreadsheetListScreen';
import LoginScreen from './screens/LoginScreen';

function App() {
	return (
		<div className="App">
			<Router>
				<Header />
					<main>
						<Container className="py-5">
							<Routes>
								<Route path='/' element={<HomeScreen/>} />
								<Route path='/spreadsheetlist' element={<SpreadsheetListScreen/>} />
								<Route path='/spreadsheetinlist' element={<SpreadsheetInListScreen/>} />
								<Route path='/spreadsheetoutlist' element={<SpreadsheetOutListScreen/>} />								
								<Route path='/login' element={<LoginScreen/>} />
							</Routes>
						</Container>
					</main>
				<Footer />
			</Router>
		</div>
	);
}

export default App;

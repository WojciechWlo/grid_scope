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
import PrivateRoute from './components/PrivateRoute';
import AddSpreadsheetScreen from './screens/AddSpreadsheetScreen';
import KeyListScreen from './screens/KeyListScreen';
import AddKeyScreen from './screens/AddKeyScreen';

function App() {
	return (
		<div className="App">
			<Router>
				<Header />
					<main>
						<Container className="py-5">
							<Routes>
								<Route path='/' element={<HomeScreen/>} />
								<Route path='/spreadsheetlist' element={<PrivateRoute><SpreadsheetListScreen/></PrivateRoute>} />
								<Route path='/spreadsheetinlist' element={<PrivateRoute><SpreadsheetInListScreen/></PrivateRoute>} />
								<Route path='/spreadsheetoutlist' element={<PrivateRoute><SpreadsheetOutListScreen/></PrivateRoute>} />
								<Route path='/login' element={<LoginScreen/>} />
								<Route path='/addspreadsheet' element={<PrivateRoute><AddSpreadsheetScreen/></PrivateRoute>} />
								<Route path='/keylist' element={<PrivateRoute><KeyListScreen/></PrivateRoute>} />
								<Route path='/addkey' element={<PrivateRoute><AddKeyScreen/></PrivateRoute>} />
							</Routes>
						</Container>
					</main>
				<Footer />
			</Router>
		</div>
	);
}

export default App;

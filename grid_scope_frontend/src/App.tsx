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
import FormSpreadsheetScreen from './screens/FormSpreadsheetScreen';
import KeyListScreen from './screens/KeyListScreen';
import FormKeyScreen from './screens/FormKeyScreen';
import { TokenRefreshProvider } from './components/TokenRefreshProvider';
import FormSpreadsheetInScreen from './screens/FormSpreadsheetInScreen';
import FormSpreadsheetOutScreen from './screens/FormSpreadsheetOutScreen';
import ProcessListScreen from './screens/ProcessListScreen';
import FormProcessScreen from './screens/FormProcessScreen';

function App() {
	return (
		<div className="App">
			<TokenRefreshProvider>
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
									<Route path='/addspreadsheet' element={<PrivateRoute><FormSpreadsheetScreen/></PrivateRoute>} />
									<Route path='/addspreadsheetin' element={<PrivateRoute><FormSpreadsheetInScreen/></PrivateRoute>} />
									<Route path='/addspreadsheetout' element={<PrivateRoute><FormSpreadsheetOutScreen/></PrivateRoute>} />
									<Route path='/editspreadsheet/:id' element={<PrivateRoute><FormSpreadsheetScreen/></PrivateRoute>} />
									<Route path='/editspreadsheetin/:id' element={<PrivateRoute><FormSpreadsheetInScreen/></PrivateRoute>} />
									<Route path='/editspreadsheetout/:id' element={<PrivateRoute><FormSpreadsheetOutScreen/></PrivateRoute>} />										
									<Route path='/keylist' element={<PrivateRoute><KeyListScreen/></PrivateRoute>} />
									<Route path='/addkey' element={<PrivateRoute><FormKeyScreen/></PrivateRoute>} />
									<Route path='/addprocess' element={<PrivateRoute><FormProcessScreen/></PrivateRoute>} />									
									<Route path='/editkey/:id' element={<PrivateRoute><FormKeyScreen/></PrivateRoute>} />
									<Route path='/editprocess/:id' element={<PrivateRoute><FormProcessScreen/></PrivateRoute>} />
									<Route path='/processlist' element={<PrivateRoute><ProcessListScreen/></PrivateRoute>} />
								</Routes>
							</Container>
						</main>
					<Footer />
				</Router>
			</TokenRefreshProvider>
		</div>
	);
}

export default App;

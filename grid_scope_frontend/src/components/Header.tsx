import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import type { RootState, AppDispatch } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'

function Header() {
const dispatch = useDispatch<AppDispatch>()
const navigate = useNavigate()

const userLogin = useSelector((state: RootState) => state.userLogin)
const { userInfo } = userLogin

const logoutHandler = () => {
	dispatch(logout())
	navigate('/login')
}

return (
	<header>
		<Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
			<Container>
				<Navbar.Brand as={NavLink} to="/" end>
					GridScope
				</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						{userInfo ? (
							<>
								<Nav.Link as={NavLink} to="/keylist" className="nav-link">
									<i className="fas fa-key"></i> Keys
								</Nav.Link>

								<Nav.Link as={NavLink} to="/spreadsheetlist" className="nav-link">
									<i className="fas fa-table"></i> Spreadsheets
								</Nav.Link>

								<Nav.Link as={NavLink} to="/spreadsheetinlist" className="nav-link">
									<i className="fas fa-file-import"></i> Inputs
								</Nav.Link>

								<Nav.Link as={NavLink} to="/spreadsheetoutlist" className="nav-link">
									<i className="fas fa-file-export"></i> Outputs
								</Nav.Link>

								<Nav.Link as={NavLink} to="/processlist" className="nav-link">
									<i className="fas fa-cogs"></i> Processes
								</Nav.Link>

								
								<Nav.Link onClick={logoutHandler} className="nav-link">
									<i className="fas fa-user" /> Logout
								</Nav.Link>
							</>
						) : (
							<Nav.Link as={NavLink} to="/login" end className="nav-link">
							<i className="fas fa-user" /> Login
							</Nav.Link>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	</header>
)
}

export default Header

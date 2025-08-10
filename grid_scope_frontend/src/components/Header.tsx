import React from 'react'
import {Navbar, Nav,Container} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {Link, useLocation, useNavigate } from 'react-router-dom'
import type { RootState,AppDispatch } from '../store'
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../actions/userActions'
function Header() {

	const location = useLocation()
	const dispatch = useDispatch<AppDispatch>()
	const isActive = (path: string) => location.pathname === path
	const navigate = useNavigate()

    const userLogin = useSelector((state: RootState)=>state.userLogin)
    const {error, loading, userInfo} = userLogin

    const logoutHandler=()=>{
        dispatch(logout())
		navigate("/login")
    }

  	return(
		<header>
			<Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
				<Container>
					<LinkContainer to ='/'>
						<Navbar.Brand>GridScope</Navbar.Brand>
					</LinkContainer>
					
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">

							<Nav.Link
								as={Link}
								to="/keylist"
								className={isActive('/keylist') ? 'active nav-link' : 'nav-link'}
							>
								<i className="fas fa-key"></i> Key List
							</Nav.Link>

							<Nav.Link
								as={Link}
								to="/spreadsheetlist"
								className={isActive('/spreadsheetlist') ? 'active nav-link' : 'nav-link'}
							>
								<i className="fas fa-list"></i> Spreadsheet List
							</Nav.Link>

							<Nav.Link
								as={Link}
								to="/spreadsheetinlist"
								className={isActive('/spreadsheetinlist') ? 'active nav-link' : 'nav-link'}
							>
								<i className="fas fa-file-import"></i> SpreadsheetIn List
							</Nav.Link>

							<Nav.Link
								as={Link}
								to="/spreadsheetoutlist"
								className={isActive('/spreadsheetoutlist') ? 'active nav-link' : 'nav-link'}
							>
								<i className="fas fa-file-export"></i> SpreadsheetOut List
							</Nav.Link>
							{userInfo?
							(
								<Nav.Link
									onClick={logoutHandler}
									className='nav-link'
								>
									<i className="fas fa-user" /> Logout
								</Nav.Link>
							)					
							:
							(
								<Nav.Link
									as={Link}
									to="/login"
									className={isActive('/login') ? 'active nav-link' : 'nav-link'}
								>
									<i className="fas fa-user" /> Login
								</Nav.Link>)
							}
						</Nav>
					</Navbar.Collapse>
				</Container>

			</Navbar>
		</header>
	)
}

export default Header
import React from 'react'
import {Navbar, Nav,Container} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {Link, useLocation } from 'react-router-dom'

function Header() {

	const location = useLocation()
	const isActive = (path: string) => location.pathname === path

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
								to="/spreadsheetinlist"
								className={isActive('/spreadsheetinlist') ? 'active nav-link' : 'nav-link'}
							>
								SpreadsheetIn List
							</Nav.Link>

							<Nav.Link
								as={Link}
								to="/spreadsheetoutlist"
								className={isActive('/spreadsheetoutlist') ? 'active nav-link' : 'nav-link'}
							>
								SpreadsheetOut List
							</Nav.Link>

							<Nav.Link
								as={Link}
								to="/login"
								className={isActive('/login') ? 'active nav-link' : 'nav-link'}
							>
								<i className="fas fa-user" /> Login
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>

			</Navbar>
		</header>
	)
}

export default Header
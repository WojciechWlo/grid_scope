import React, {useState, useEffect} from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import {Link, useNavigate, useLocation } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../actions/userActions'
import type { RootState,AppDispatch } from '../store'

function LoginScreen() {
    const location = useLocation()
    const navigate = useNavigate()
    const redirect = '/'
    
    const dispatch = useDispatch<AppDispatch>()


    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const userLogin = useSelector((state: RootState)=>state.userLogin)
    const {error, loading, userInfo} = userLogin

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[navigate,userInfo,redirect])

    const submitHandler=(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        dispatch(login(username, password))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {/*error && <Message variant='danger'>{error}</Message>*/}
            {/*loading && <Loader/>*/}
            <Form onSubmit={submitHandler}>
                
                <Form.Group controlId='username'>
                    <Form.Label>
                        Username
                    </Form.Label>
                    <Form.Control type='text' placeholder='Enter Username' value={username} onChange={(e)=>setUsername(e.target.value)}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)}>

                    </Form.Control>

                </Form.Group>
                <Button type="submit" variant='primary'>Sign In</Button>
            </Form>
            {/*
            <Row className='py-3'>
                <Col>
                    New Customer? <Link to={redirect?`/register?redirect=${redirect}`:'/register'}>Register</Link>
                </Col>
            </Row>
            */}
        </FormContainer>
    )
}

export default LoginScreen
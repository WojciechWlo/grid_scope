import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import {useDispatch, useSelector} from 'react-redux'
import { createKey } from '../actions/keyActions'
import type { RootState,AppDispatch } from '../store'
import Message from '../components/Message'
import Loader from '../components/Loader'

function AddKeyScreen() {


	const [label, setLabel] = useState('')
	const [url, setUrl] = useState('')
	const [key, setKey] = useState('')

    const dispatch = useDispatch<AppDispatch>()

    const keyCreate = useSelector((state: RootState)=>state.keyCreate)
    const {error, loading, response} = keyCreate


	const submitHandler=(e: React.FormEvent<HTMLFormElement>)=>{
		e.preventDefault()
		dispatch(createKey({
			label,
			key,
		}))
	}

    return (
		<FormContainer>
			<h1>Add Key</h1>
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader/>}
			<Form onSubmit={submitHandler}>
				
				<Form.Group controlId='label'>
					<Form.Label>
						Label
					</Form.Label>
					<Form.Control type='text' placeholder='Enter Label' value={label} onChange={(e)=>setLabel(e.target.value)}>

					</Form.Control>
				</Form.Group>

				<Form.Group controlId='key'>
					<Form.Label>
						Key
					</Form.Label>
					<Form.Control type='key' placeholder='Enter Key' value={key} onChange={(e)=>setKey(e.target.value)}>

					</Form.Control>
				</Form.Group>

				<Button type="submit" variant='primary'>Add</Button>
			</Form>
		</FormContainer>
    )
}

export default AddKeyScreen
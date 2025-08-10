import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import {useDispatch, useSelector} from 'react-redux'
import { createSpreadsheet } from '../actions/spreadsheetActions'
import type { RootState,AppDispatch } from '../store'
import Message from '../components/Message'
import Loader from '../components/Loader'

function AddSpreadsheetScreen() {


	const [label, setLabel] = useState('')
	const [url, setUrl] = useState('')
	const [key, setKey] = useState('')

    const dispatch = useDispatch<AppDispatch>()

    const spreadsheetCreate = useSelector((state: RootState)=>state.spreadsheetCreate)
    const {error, loading, response} = spreadsheetCreate


	const submitHandler=(e: React.FormEvent<HTMLFormElement>)=>{
		e.preventDefault()
		dispatch(createSpreadsheet({
			label,
			url,
			key,
		}))
	}

    return (
		<FormContainer>
			<h1>Add Spreadsheet</h1>
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

				<Form.Group controlId='url'>
					<Form.Label>
						URL
					</Form.Label>
					<Form.Control type='url' placeholder='Enter URL' value={url} onChange={(e)=>setUrl(e.target.value)}>

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

export default AddSpreadsheetScreen
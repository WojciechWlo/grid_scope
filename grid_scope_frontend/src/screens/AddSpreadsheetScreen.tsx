import React, {useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useLocation } from 'react-router-dom'
import { createSpreadsheet } from '../actions/spreadsheetActions'
import type { RootState,AppDispatch } from '../store'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listKeys } from '../actions/keyActions'
import Select from "react-select";

type Key={
    id: number,
    label: string,
    key: string,
}

function AddSpreadsheetScreen() {

	const navigate = useNavigate()
	const [label, setLabel] = useState('')
	const [url, setUrl] = useState('')
	const [keyLabel, setKeyLabel] = useState('')

    const dispatch = useDispatch<AppDispatch>()
	type OptionType = { value: string; label: string };

    const spreadsheetCreate = useSelector((state: RootState)=>state.spreadsheetCreate)
    const {error, loading, response} = spreadsheetCreate


	const keyList = useSelector((state: RootState)=>state.keyList)
	const {loading:loadingKeyList, error:errorKeyList, keys=null} = keyList

	const userLogin = useSelector((state: RootState)=>state.userLogin)
	const {userInfo} = userLogin
	
	useEffect(()=>{
		if(userInfo){
			console.log("EEEEEE")
			dispatch(listKeys("?page=0"))
		}
	},[dispatch, userInfo])


	const submitHandler=(e: React.FormEvent<HTMLFormElement>)=>{
		e.preventDefault()
		console.log("EEEEEEEEEEEEE",keyLabel)
		dispatch(createSpreadsheet({
			label,
			url,
			key_label:keyLabel,
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
								

				<Form.Group controlId="key">
					<Form.Label>Key</Form.Label>
					{loadingKeyList ? (
						<Loader />
					) : errorKeyList ? (
						<Message variant="danger">{errorKeyList}</Message>
					) : (

						<Select<OptionType>
							value={(keys || [])
								.map((key: Key) => ({ value: key.id, label: key.label }))
								.find((o: OptionType) => o.label === keyLabel) || null}

							onChange={(selected) => setKeyLabel(selected ? selected.label : "")}

							options={(keys || []).map((key: Key) => ({
								value: key.id,
								label: key.label,
							}))}

							isSearchable={true}
							placeholder="Select Key"
						/>
					)}
				</Form.Group>

				<br/>
				<Button type="submit" variant='primary'>Add</Button>
			</Form>
		</FormContainer>
    )
}

export default AddSpreadsheetScreen
import React, {useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useParams } from 'react-router-dom'
import { createSpreadsheet, editSpreadsheet, getSpreadsheet } from '../actions/spreadsheetActions'
import type { RootState,AppDispatch } from '../store'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listKeys } from '../actions/keyActions'
import Select from "react-select";
import { spreadsheetCreateReset, spreadsheetEditReset, spreadsheetGetReset } from '../reducers/spreadsheetReducers'

type Key={
    id: number,
    label: string,
    key: string,
}

function FormSpreadsheetScreen() {

	const params = useParams<{ id?: string }>();
	const isEdit = !!params.id;

	const navigate = useNavigate()
	const [label, setLabel] = useState('')
	const [url, setUrl] = useState('')
	const [keyLabel, setKeyLabel] = useState('')
	const [isPublic, setIsPublic] = useState(true)

    const dispatch = useDispatch<AppDispatch>()
	type OptionType = { value: string; label: string };

    const spreadsheetCreate = useSelector((state: RootState)=>state.spreadsheetCreate)
    const {error, loading, response} = spreadsheetCreate

	const spreadsheetEdit = useSelector((state: RootState)=>state.spreadsheetEdit)
	const {error:errorEdit, loading:loadingEdit, response:responseEdit} = spreadsheetEdit

	const spreadsheetGet = useSelector((state: RootState)=>state.spreadsheetGet)
	const {error:errorGet, loading:loadingGet, spreadsheet:spreadsheetResponse} = spreadsheetGet
	

	const keyList = useSelector((state: RootState)=>state.keyList)
	const {loading:loadingKeyList, error:errorKeyList, keys=null} = keyList

	const userLogin = useSelector((state: RootState)=>state.userLogin)
	const {userInfo} = userLogin
	
	useEffect(()=>{
		dispatch(listKeys("?page=0"))
		if(isEdit)
		{
			dispatch(getSpreadsheet(params.id))
		}
	},[dispatch])

	useEffect(() => {
		if (isEdit && spreadsheetResponse) {
			setLabel(spreadsheetResponse.label);
			setUrl(spreadsheetResponse.url);
			setKeyLabel(spreadsheetResponse.key);
			setIsPublic(spreadsheetResponse.is_public);
		}
	}, [spreadsheetResponse, isEdit]);

	useEffect(()=>{
		if(isEdit)
		{
			dispatch(spreadsheetEditReset())
			dispatch(spreadsheetGetReset())			
		}
		else{
			dispatch(spreadsheetCreateReset())
		}
		if(response || responseEdit)
		{
			navigate(`/spreadsheetlist`)
		}

	},[response, responseEdit, navigate])


	const submitHandler=(e: React.FormEvent<HTMLFormElement>)=>{
		e.preventDefault()
		if(isEdit){
			dispatch(editSpreadsheet({
				label,
				url,
				key_label:keyLabel,
				is_public:isPublic,				
			}, params.id))

		}else{
			dispatch(createSpreadsheet({
				label,
				url,
				key_label:keyLabel,
				is_public:isPublic,
			}))
		}
	}

    return (
		<FormContainer>
			<h1>{isEdit? "Edit" : "Add"} Spreadsheet</h1>
			{errorGet && <Message variant='danger'>{errorGet}</Message>}			
			{errorEdit && <Message variant='danger'>{errorEdit}</Message>}
			{error && <Message variant='danger'>{error}</Message>}
			{(loading || loadingEdit || loadingGet) && <Loader/>}
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
					<Form.Control type='text' placeholder='Enter URL' value={url} onChange={(e)=>setUrl(e.target.value)}>

					</Form.Control>
				
				</Form.Group>

				<Form.Group controlId="isPublic">
					<Form.Label>Is Public</Form.Label>
					<Form.Check
						type="checkbox"
						checked={isPublic}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setIsPublic(e.target.checked)
						}
					/>
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
				<Button type="submit" variant='primary'>{isEdit? "Edit" : "Add"}</Button>
			</Form>
		</FormContainer>
    )
}

export default FormSpreadsheetScreen
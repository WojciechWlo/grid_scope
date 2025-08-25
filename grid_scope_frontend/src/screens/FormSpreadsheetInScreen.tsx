import React, {useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
import { createSpreadsheetIn, editSpreadsheetIn, getSpreadsheetIn } from '../actions/spreadsheetInActions'
import type { RootState,AppDispatch } from '../store'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listKeys } from '../actions/keyActions'
import Select from "react-select";
import { spreadsheetInCreateReset, spreadsheetInEditReset, spreadsheetInGetReset } from '../reducers/spreadsheetInReducers'
import { getSpreadsheet, listSpreadsheets } from '../actions/spreadsheetActions'

type Spreadsheet={
    id: number,
    label: string,
    key_label: string,
	is_public: string,
}

function FormSpreadsheetInScreen() {
	const params = useParams<{ id?: string }>();
	const isEdit = !!params.id;

	const navigate = useNavigate()
	const [label, setLabel] = useState('')
	const [spreadsheetLabel, setSpreadsheetLabel] = useState('')
	const [dataCellRange, setDataCellRange] = useState('')
	const [worksheetName, setWorksheetName] = useState('')

    const dispatch = useDispatch<AppDispatch>()
	type OptionType = { value: string; label: string };

    const spreadsheetInCreate = useSelector((state: RootState)=>state.spreadsheetInCreate)
    const {error, loading, response} = spreadsheetInCreate

	const spreadsheetInEdit = useSelector((state: RootState)=>state.spreadsheetInEdit)
	const {error:errorEdit, loading:loadingEdit, response:responseEdit} = spreadsheetInEdit

	const spreadsheetInGet = useSelector((state: RootState)=>state.spreadsheetInGet)
	const {error:errorGet, loading:loadingGet, spreadsheetIn:spreadsheetInResponse} = spreadsheetInGet
	
	const spreadsheetList = useSelector((state: RootState)=>state.spreadsheetList)
	const {loading:loadingSpreadsheetList, error:errorSpreadsheetList, spreadsheets=null} = spreadsheetList

	const userLogin = useSelector((state: RootState)=>state.userLogin)

	useEffect(()=>{
		dispatch(listSpreadsheets("?page=0"))
		if(isEdit)
		{
			dispatch(getSpreadsheetIn(params.id))
		}
	},[dispatch])

	useEffect(() => {
		if (isEdit && spreadsheetInResponse) {
			setLabel(spreadsheetInResponse.label);
			setSpreadsheetLabel(spreadsheetInResponse.spreadsheet);
			setDataCellRange(spreadsheetInResponse.data_cell_range);
            setWorksheetName(spreadsheetInResponse.worksheet_name);			
		}
	}, [spreadsheetInResponse, isEdit]);

	useEffect(()=>{
		if(isEdit)
		{
			dispatch(spreadsheetInEditReset())
			dispatch(spreadsheetInGetReset())			
		}
		else{
			dispatch(spreadsheetInCreateReset())
		}
		if(response || responseEdit)
		{
			navigate(`/spreadsheetInlist`)
		}

	},[response, responseEdit, navigate])


	const submitHandler=(e: React.FormEvent<HTMLFormElement>)=>{
		e.preventDefault()
		if(isEdit){
			dispatch(editSpreadsheetIn({
				label,
				spreadsheet_label:spreadsheetLabel,
				data_cell_range: dataCellRange,
				worksheet_name: worksheetName,
			},params.id))
		}else{
			dispatch(createSpreadsheetIn({
				label,
				spreadsheet_label:spreadsheetLabel,
				data_cell_range: dataCellRange,
				worksheet_name: worksheetName,
			}))
		}

	}

    return (
		<FormContainer>
			<h1>{isEdit? "Edit" : "Add"} Input Spreadsheet</h1>
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


				<Form.Group controlId="key">
					<Form.Label>Spreadsheet</Form.Label>
					{loadingSpreadsheetList ? (
						<Loader />
					) : errorSpreadsheetList ? (
						<Message variant="danger">{errorSpreadsheetList}</Message>
					) : (

						<Select<OptionType>
							value={(spreadsheets || [])
								.map((spreadsheet: Spreadsheet) => ({ value: spreadsheet.id, label: spreadsheet.label }))
								.find((o: OptionType) => o.label === spreadsheetLabel) || null}

							onChange={(selected) => setSpreadsheetLabel(selected ? selected.label : "")}

							options={(spreadsheets || []).map((spreadsheet: Spreadsheet) => ({
								value: spreadsheet.id,
								label: spreadsheet.label,
							}))}

							isSearchable={true}
							placeholder="Select Spreadsheet"
						/>
					)}
				</Form.Group>

				<Form.Group controlId='label'>
					<Form.Label>
						Data Cell Range
					</Form.Label>
					<Form.Control type='text' placeholder='Enter Data Cell Range' value={dataCellRange} onChange={(e)=>setDataCellRange(e.target.value)}>

					</Form.Control>
				</Form.Group>

				<Form.Group controlId='label'>
					<Form.Label>
						Worksheet Name
					</Form.Label>
					<Form.Control type='text' placeholder='Enter Worksheet Name' value={worksheetName} onChange={(e)=>setWorksheetName(e.target.value)}>

					</Form.Control>
				</Form.Group>

				<br/>
				<Button type="submit" variant='primary'>{isEdit? "Edit" : "Add"}</Button>
			</Form>
		</FormContainer>
    )
}

export default FormSpreadsheetInScreen
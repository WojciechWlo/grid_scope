import React, {useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useLocation, data } from 'react-router-dom'
import { createSpreadsheetIn } from '../actions/spreadsheetInActions'
import type { RootState,AppDispatch } from '../store'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listKeys } from '../actions/keyActions'
import Select from "react-select";
import { spreadsheetInCreateReset } from '../reducers/spreadsheetInSlices'
import { listSpreadsheets } from '../actions/spreadsheetActions'

type Spreadsheet={
    id: number,
    label: string,
    key_label: string,
	is_public: string,
}

function AddSpreadsheetInScreen() {

	const navigate = useNavigate()
	const [label, setLabel] = useState('')
	const [spreadsheetLabel, setSpreadsheetLabel] = useState('')
	const [dataCellRange, setDataCellRange] = useState('')

    const dispatch = useDispatch<AppDispatch>()
	type OptionType = { value: string; label: string };

    const spreadsheetInCreate = useSelector((state: RootState)=>state.spreadsheetInCreate)
    const {error, loading, response} = spreadsheetInCreate


	const spreadsheetList = useSelector((state: RootState)=>state.spreadsheetList)
	const {loading:loadingSpreadsheetList, error:errorSpreadsheetList, spreadsheets=null} = spreadsheetList

	const userLogin = useSelector((state: RootState)=>state.userLogin)
	const {userInfo} = userLogin
	
	useEffect(()=>{
		if(userInfo){
			dispatch(listSpreadsheets("?page=0"))
		}
	},[dispatch, userInfo])


	useEffect(()=>{
		dispatch(spreadsheetInCreateReset())
		if(response)
		{
			navigate(`/spreadsheetInlist`)
		}

	},[response, navigate])


	const submitHandler=(e: React.FormEvent<HTMLFormElement>)=>{
		e.preventDefault()
		dispatch(createSpreadsheetIn({
			label,
			spreadsheet_label:spreadsheetLabel,
			data_cell_range: dataCellRange,
		}))

	}

    return (
		<FormContainer>
			<h1>Add Input Spreadsheet</h1>
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


				<Form.Group controlId="key">
					<Form.Label>Key</Form.Label>
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

				<br/>
				<Button type="submit" variant='primary'>Add</Button>
			</Form>
		</FormContainer>
    )
}

export default AddSpreadsheetInScreen
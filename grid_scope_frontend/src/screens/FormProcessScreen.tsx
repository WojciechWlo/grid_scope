import React, {useState, useEffect} from 'react'
import {Form, Button, Table, Col, Row} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
import type { RootState,AppDispatch } from '../store'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Select from "react-select";
import { createProcess, editProcess, getProcess, testProcess } from '../actions/processActions'
import { processCreateReset, processEditReset, processGetReset, processTestReset } from '../reducers/processReducers'
import { listSpreadsheetsIn } from '../actions/spreadsheetInActions'
import { listSpreadsheetsOut } from '../actions/spreadsheetOutActions'
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/theme-tomorrow_night';

type SpreadsheetIn={
    id: number,
    label: string,
	data_cell_arrange:string,
}

type SpreadsheetOut={
    id: number,
    label: string,
	data_cell:string,
}

function FormProcessScreen() {
	const params = useParams<{ id?: string }>();
	const isEdit = !!params.id;

	const navigate = useNavigate()
	const [label, setLabel] = useState('')
	const [query, setQuery] = useState('')
	const [spreadsheetInLabels, setSpreadsheetInLabels] = useState<string[]>([])
	const [spreadsheetOutLabels, setSpreadsheetOutLabels] = useState<string[]>([])

    const dispatch = useDispatch<AppDispatch>()
	type OptionType = { value: string; label: string };

    const processCreate = useSelector((state: RootState)=>state.processCreate)
    const {error, loading, response} = processCreate

	const processEdit = useSelector((state: RootState)=>state.processEdit)
	const {error:errorEdit, loading:loadingEdit, response:responseEdit} = processEdit

	const processGet = useSelector((state: RootState)=>state.processGet)
	const {error:errorGet, loading:loadingGet, process:processResponse} = processGet
	
	const processTest = useSelector((state: RootState)=>state.processTest)
	const {error:errorTest, loading:loadingTest, response:processTestResponse} = processTest

	const spreadsheetInList = useSelector((state: RootState)=>state.spreadsheetInList)
	const {loading:loadingSpreadsheetInList, error:errorSpreadsheetInList, spreadsheetsIn=null} = spreadsheetInList

	const spreadsheetOutList = useSelector((state: RootState)=>state.spreadsheetOutList)
	const {loading:loadingSpreadsheetOutList, error:errorSpreadsheetOutList, spreadsheetsOut=null} = spreadsheetOutList

	const userLogin = useSelector((state: RootState)=>state.userLogin)
	const {userInfo} = userLogin
	
	useEffect(()=>{
		dispatch(listSpreadsheetsIn("?page=0"))
		dispatch(listSpreadsheetsOut("?page=0"))
		dispatch(processTestReset())
		if(isEdit)
		{
			dispatch(getProcess(params.id))
		}
	},[dispatch])

	useEffect(() => {
		if (isEdit && processResponse) {
			setLabel(processResponse.label);
			setQuery(processResponse.query);
			setSpreadsheetInLabels(processResponse.spreadsheet_in_labels);
			setSpreadsheetOutLabels(processResponse.spreadsheet_out_labels);			
		}
	}, [processResponse, isEdit]);

	useEffect(()=>{
		if(isEdit)
		{
			dispatch(processEditReset())			
			dispatch(processGetReset())				
		}
		else{
			dispatch(processCreateReset())
		}
		dispatch(processTestReset())
		if(response || responseEdit)
		{
			navigate(`/processlist`)
		}

	},[response, responseEdit, navigate])


	const submitHandler=(e: React.FormEvent<HTMLFormElement>)=>{
		e.preventDefault()
		if(isEdit){
			dispatch(editProcess({
				label,
				spreadsheet_in_labels:spreadsheetInLabels,
				spreadsheet_out_labels:spreadsheetOutLabels,
				query,
			},params.id))
		}else{
			dispatch(createProcess({
				label,
				spreadsheet_in_labels:spreadsheetInLabels,
				spreadsheet_out_labels:spreadsheetOutLabels,
				query,
			}))
		}

	}

	const testHandler=()=>{
		dispatch(testProcess({
			label,
			spreadsheet_in_labels:spreadsheetInLabels,
			spreadsheet_out_labels:[],
			query,
		}))
	}



    return (
		<>
		<FormContainer>
			<h1>{isEdit? "Edit" : "Add"} Process</h1>
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


				<Form.Group controlId="spreadsheetIn">
					<Form.Label>Input Spreadsheets</Form.Label>
					{loadingSpreadsheetInList ? (
						<Loader />
					) : errorSpreadsheetInList ? (
						<Message variant="danger">{errorSpreadsheetInList}</Message>
					) : (

						<Select<OptionType, true>
						value={(spreadsheetsIn || [])
							.map((spreadsheetIn: SpreadsheetIn) => ({
							value: spreadsheetIn.id,
							label: spreadsheetIn.label,
							}))
							.filter((o: OptionType) => spreadsheetInLabels.includes(o.label))}

						onChange={(selected) =>
							setSpreadsheetInLabels(selected ? selected.map((s) => s.label) : [])
						}

						options={(spreadsheetsIn || []).map((spreadsheetIn: SpreadsheetIn) => ({
							value: spreadsheetIn.id,
							label: spreadsheetIn.label,
						}))}

						isSearchable={true}
						isMulti
						placeholder="Select Input Spreadsheets"
						/>
					)}
				</Form.Group>


				<Form.Group controlId="spreadsheetOut">
					<Form.Label>Output Spreadsheets</Form.Label>
					{loadingSpreadsheetOutList ? (
						<Loader />
					) : errorSpreadsheetOutList ? (
						<Message variant="danger">{errorSpreadsheetOutList}</Message>
					) : (

						<Select<OptionType, true>
						value={(spreadsheetsOut || [])
							.map((spreadsheetOut: SpreadsheetOut) => ({
							value: spreadsheetOut.id,
							label: spreadsheetOut.label,
							}))
							.filter((o: OptionType) => spreadsheetOutLabels.includes(o.label))}

						onChange={(selected) =>
							setSpreadsheetOutLabels(selected ? selected.map((s) => s.label) : [])
						}

						options={(spreadsheetsOut || []).map((spreadsheetOut: SpreadsheetOut) => ({
							value: spreadsheetOut.id,
							label: spreadsheetOut.label,
						}))}

						isSearchable={true}
						isMulti
						placeholder="Select Output Spreadsheets"
						/>
					)}
				</Form.Group>

				<Form.Group controlId="query">
					<Form.Label>Query</Form.Label>
					<AceEditor
						mode="sql"
						theme="tomorrow_night"
						name="sql_editor"
						value={query}
						onChange={(newValue: string) => setQuery(newValue)}
						width="100%"
						height="300px"
						fontSize={14}
						showPrintMargin={false}
						showGutter={true}
						highlightActiveLine={true}
						style={{ zIndex: 0 }}
						setOptions={{
							showLineNumbers: true,
							tabSize: 2,
							useWorker: false,
						}}
					/>
				</Form.Group>

				<br/>
				<Button type="submit" variant='primary'>{isEdit? "Edit" : "Add"}</Button>
				<br/>
			</Form>
		</FormContainer>
		<div>			
			<Row className='align-items-center'>
				<Col>
					<h1>Test</h1>
				</Col>
				<Col className='text-right'>
					<Button variant="success" className='my-3' onClick={()=>testHandler()}>
						<i className="fas fa-play"></i> Test
					</Button>
				</Col>
			</Row>
				{loadingTest ? (
					<Loader />
				) : errorTest && errorTest.length > 0 ? (
					<Message variant="danger">
						{errorTest.map((err, idx) => (
							<div key={idx}>{err}</div>
						))}
					</Message>
				) : (
					<div>
						<Table striped bordered hover responsive className="table-sm">

							{processTestResponse?.results?.sql_output?.rows &&
							processTestResponse.results.sql_output.rows.length > 0 && (
							<>
								<thead>
								<tr>
									{processTestResponse.results.sql_output.columns.map(
									(colName: string, idx: number) => (
										<th key={idx}>{colName}</th>
									)
									)}
								</tr>
								</thead>
								<tbody>
								{processTestResponse.results.sql_output.rows.map(
									(row: any[], rowIdx: number) => (
									<tr key={rowIdx}>
										{row.map((value: any, colIdx: number) => (
										<td key={colIdx}>{String(value)}</td>
										))}
									</tr>
									)
								)}
								</tbody>
							</>
							)}

						</Table>
					</div>
				)}
		</div>	
		</>
    )
}

export default FormProcessScreen
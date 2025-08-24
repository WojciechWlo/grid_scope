import React, {useState, useEffect} from 'react'
import {useNavigate, useLocation } from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import type { RootState,AppDispatch } from '../store'
import { deleteSpreadsheetIn, listSpreadsheetsIn } from '../actions/spreadsheetInActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'

type SpreadsheetIn={
    id: number,
    label: string,
    spreadsheet: string,
    data_cell_range: string,
    worksheet_id: number,
}

function SpreadsheetInListScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const location = useLocation()

    const userLogin = useSelector((state: RootState)=>state.userLogin)
    const {userInfo} = userLogin

    const spreadsheetInList = useSelector((state: RootState)=>state.spreadsheetInList)
    const {loading, error, spreadsheetsIn=null, pages, page} = spreadsheetInList

    const spreadsheetInDelete = useSelector((state: RootState)=>state.spreadsheetInDelete)
    const {response:responseDelete} = spreadsheetInDelete

    let keyword = location.search


	const addSpreadsheetInHandler = ()=>{
        navigate("/addspreadsheetin")
	}
	const editSpreadsheetInHandler = (id:number)=>{
        navigate(`/editspreadsheetin/${id}`)
	}
	const deleteSpreadsheetInHandler = (id:string)=>{
        if(window.confirm('Are you sure you want to delete this spreadsheetIn?')){
            dispatch(deleteSpreadsheetIn(id))
        }
	}


    useEffect(()=>{
        if(userInfo){
            dispatch(listSpreadsheetsIn(keyword))
        }
    },[dispatch, userInfo, keyword,responseDelete])


    return (

        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Input Spreadsheets</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={()=>addSpreadsheetInHandler()}>
                        <i className='fas fa-plus'></i> Add Input Spreadsheet
                    </Button>
                </Col>
            </Row>
            { loading? 
            <Loader/> :  
                error? <Message variant='danger'>{error}</Message>:(
                    <div>
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>LABEL</th>
                                    <th>SPREADSHEET</th>
                                    <th>DATA CELL RANGE</th>
                                    <th>WORKSHEET ID</th>
                                    <th></th>
                                </tr>

                            </thead>
                            <tbody>
                                {(spreadsheetsIn || []).map((spreadsheetIn: SpreadsheetIn) => (
                                    <tr key={spreadsheetIn.id}>
                                        <td>{spreadsheetIn.id}</td>
                                        <td>{spreadsheetIn.label}</td>
                                        <td>{spreadsheetIn.spreadsheet}</td>
                                        <td>{spreadsheetIn.data_cell_range}</td>              
                                        <td>{spreadsheetIn.worksheet_id}</td>                                                                     
                                        <td>
                                            <Button variant='light' className='btn-sm' onClick={()=>editSpreadsheetInHandler(spreadsheetIn.id)}>
                                                <i className='fas fa-edit'></i>
                                            </Button>

                                            <Button variant='danger' className='btn-sm' onClick={()=> deleteSpreadsheetInHandler (""+spreadsheetIn.id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>                                        
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        {<Paginate pages={pages || 1} page={page || 1} />}
                    </div>
                )
            }

		</div>
    )
}

export default SpreadsheetInListScreen
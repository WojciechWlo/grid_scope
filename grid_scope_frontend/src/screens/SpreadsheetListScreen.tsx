import React, {useState, useEffect} from 'react'
import {useNavigate, useLocation } from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import type { RootState,AppDispatch } from '../store'
import { listSpreadsheets } from '../actions/spreadsheetActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'

type Spreadsheet={
    id: number,
    label: string,
    url: string,
    key: string
}

function SpreadsheetListScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const location = useLocation()

    const userLogin = useSelector((state: RootState)=>state.userLogin)
    const {userInfo} = userLogin

    const spreadsheetList = useSelector((state: RootState)=>state.spreadsheetList)
    const {loading, error, spreadsheets=null, pages, page} = spreadsheetList

    let keyword = location.search

    useEffect(()=>{
        if(userInfo){
            dispatch(listSpreadsheets(keyword))
        }
       

    },[dispatch, userInfo, keyword])




	const addSpreadsheetHandler = ()=>{
        navigate("/addspreadsheet")
	}
	const editSpreadsheetHandler = (id:number)=>{

	}
	const deleteSpreadsheetHandler = (id:number)=>{

	}
    return (

        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Spreadsheets</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={()=>addSpreadsheetHandler()}>
                        <i className='fas fa-plus'></i> Add Spreadsheet
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
                                    <th>URL</th>
                                    <th>KEY</th>
                                    <th></th>
                                </tr>

                            </thead>
                            <tbody>
                                {(spreadsheets || []).map((spreadsheet: Spreadsheet) => (
                                    <tr key={spreadsheet.id}>
                                        <td>{spreadsheet.id}</td>
                                        <td>{spreadsheet.label}</td>
                                        <td>{spreadsheet.url}</td>
                                        <td>{spreadsheet.key}</td>
                                        <td>
                                            <Button variant='light' className='btn-sm' onClick={()=>editSpreadsheetHandler(spreadsheet.id)}>
                                                <i className='fas fa-edit'></i>
                                            </Button>

                                            <Button variant='danger' className='btn-sm' onClick={()=> deleteSpreadsheetHandler (spreadsheet.id)}>
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

export default SpreadsheetListScreen
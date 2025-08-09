import React, {useState, useEffect} from 'react'
import {useNavigate, useLocation } from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import type { RootState,AppDispatch } from '../store'
import { listSpreadsheets } from '../actions/spreadsheetActions'
//import Loader from '../components/Loader'
//import Message from '../components/Message'
//import {listProducts, deleteProduct, createProduct} from '../actions/productActions'
//import {PRODUCT_CREATE_RESET} from '../constants/productConstants'
//import Paginate from '../components/Paginate'

function SpreadsheetListScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const location = useLocation()


    const spreadsheetList = useSelector((state: RootState)=>state.spreadsheetList)
    const {loading, error, spreadsheets, pages, page} = spreadsheetList

    useEffect(()=>{
		console.log("e")
        if(!spreadsheets){
			console.log('eee')
            dispatch(listSpreadsheets())
        }
       

    },[dispatch, spreadsheets])


	const deleteHandler =(e: React.FormEvent<HTMLFormElement>)=>{
		e.preventDefault()
	}

	const AddSpreadsheetHandler = (e: React.FormEvent<HTMLFormElement>)=>{
		e.preventDefault()
	}

    return (

        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={()=>AddSpreadsheetHandler}>
                        <i className='fas fa-plus'></i> Add Spreadsheet
                    </Button>
                </Col>
            </Row>

{/*
			<div>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>

                            </tr>

                        </thead>
                        <tbody>
                            {spreadsheets.map(spreadsheet =>(
                                <tr key={spreadsheet._id}>
                                    <td>{spreadsheet._id}</td>
                                    <td>{spreadsheet.name}</td>
                                    <td>${spreadsheet.price}</td>
                                    <td>{spreadsheet.category}</td>
                                    <td>{spreadsheet.brand}</td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>

        	</div>
*/}
		</div>
    )
}

export default SpreadsheetListScreen
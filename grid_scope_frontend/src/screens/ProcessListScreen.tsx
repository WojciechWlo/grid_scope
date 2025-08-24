import React, {useState, useEffect} from 'react'
import {useNavigate, useLocation } from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import type { RootState,AppDispatch } from '../store'
import { deleteKey, listKeys } from '../actions/keyActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { deleteProcess, listProcesses, runProcess } from '../actions/processActions'

type Process={
    id: number,
    label: string,
}

function ProcessListScreen() {

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const location = useLocation()

    const userLogin = useSelector((state: RootState)=>state.userLogin)
    const {userInfo} = userLogin

    const processList = useSelector((state: RootState)=>state.processList)
    const {loading, error, processes=null, pages, page} = processList

    const processDelete = useSelector((state: RootState)=>state.processDelete)
    const {response:responseDelete} = processDelete

    const processRun = useSelector((state: RootState)=>state.processRun)
    const {loading:loadingRun} = processRun

    let keyword = location.search

    useEffect(()=>{
        if(userInfo){
            dispatch(listProcesses(keyword))
        }
    },[dispatch, userInfo, keyword,responseDelete])


	const addProcessHandler = ()=>{
        navigate("/addprocess")
	}
	const editProcessHandler = (id:string)=>{
        navigate(`/editProcess/${id}`)
	}
	const deleteProcessHandler = (id:string)=>{
        if(window.confirm('Are you sure you want to delete this Process?')){
            dispatch(deleteProcess(id))
        }
	}
	const runProcessHandler = (id:string)=>{
        dispatch(runProcess(id))
	}    
    return (

        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Process</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={()=>addProcessHandler()}>
                        <i className='fas fa-plus'></i> Add Process
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
                                    <th></th>
                                </tr>

                            </thead>
                            <tbody>
                                {(processes || []).map((process: Process) => (
                                    <tr key={process.id}>
                                        <td>{process.id}</td>
                                        <td>{process.label}</td>
                                        <td>
                                            { loadingRun ? 
                                                <Button variant='primary' className='btn-sm'>
                                                    <i className="fas fa-spinner"></i>
                                                </Button>  :                                            
                                                <Button variant='success' className='btn-sm' onClick={()=> runProcessHandler (""+process.id)}>
                                                    <i className='fas fa-play'></i>
                                                </Button>    
                                            }
                                            
                                            <Button variant='light' className='btn-sm' onClick={()=>editProcessHandler(""+process.id)}>
                                                <i className='fas fa-edit'></i>
                                            </Button>

                                            <Button variant='danger' className='btn-sm' onClick={()=> deleteProcessHandler (""+process.id)}>
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
export default ProcessListScreen
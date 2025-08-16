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

type Key={
    id: number,
    label: string,
    key: string,
}

function KeyListScreen() {

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const location = useLocation()

    const userLogin = useSelector((state: RootState)=>state.userLogin)
    const {userInfo} = userLogin

    const keyList = useSelector((state: RootState)=>state.keyList)
    const {loading, error, keys=null, pages, page} = keyList

    const keyDelete = useSelector((state: RootState)=>state.keyDelete)
    const {loading:loadingDelete, error:errorDelete, response:responseDelete} = keyDelete

    let keyword = location.search

    useEffect(()=>{
        if(userInfo){
            dispatch(listKeys(keyword))
        }
    },[dispatch, userInfo, keyword,responseDelete])


	const addKeyHandler = ()=>{
        navigate("/addkey")
	}
	const editKeyHandler = (id:number)=>{
        navigate(`/editkey/${id}`)
	}
	const deleteKeyHandler = (id:string)=>{
        if(window.confirm('Are you sure you want to delete this key?')){
            dispatch(deleteKey(id))
        }
	}
    return (

        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Keys</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={()=>addKeyHandler()}>
                        <i className='fas fa-plus'></i> Add Key
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
                                {(keys || []).map((key: Key) => (
                                    <tr key={key.id}>
                                        <td>{key.id}</td>
                                        <td>{key.label}</td>
                                        <td>
                                            <Button variant='light' className='btn-sm' onClick={()=>editKeyHandler(key.id)}>
                                                <i className='fas fa-edit'></i>
                                            </Button>

                                            <Button variant='danger' className='btn-sm' onClick={()=> deleteKeyHandler (""+key.id)}>
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
export default KeyListScreen
import React, {useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import {useDispatch, useSelector} from 'react-redux'
import { createKey, editKey, getKey } from '../actions/keyActions'
import type { RootState,AppDispatch } from '../store'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {useNavigate, useParams } from 'react-router-dom'
import { keyCreateReset, keyEditReset, keyGetReset } from '../reducers/keySlices'


function FormKeyScreen() {

	const params = useParams<{ id?: string }>();
	const isEdit = !!params.id;

	const navigate = useNavigate()
	const [label, setLabel] = useState('')
	const [key, setKey] = useState('')

    const dispatch = useDispatch<AppDispatch>()

    const keyCreate = useSelector((state: RootState)=>state.keyCreate)
    const {error, loading, response} = keyCreate

    const keyEdit = useSelector((state: RootState)=>state.keyEdit)
    const {error:errorEdit, loading:loadingEdit, response:responeEdit} = keyEdit

    const keyGet = useSelector((state: RootState)=>state.keyGet)
    const {error:errorGet, loading:loadingGet, key:keyResponse} = keyGet
	

	useEffect(()=>{
		if(isEdit){
			dispatch(getKey(params.id))
		}
	},[dispatch])

	useEffect(() => {
		if (isEdit && keyResponse) {
			setLabel(keyResponse.label);
			setKey(keyResponse.key);
		}
	}, [keyResponse, isEdit]);

	useEffect(()=>{
		if(isEdit){
			dispatch(keyEditReset())
			dispatch(keyGetReset())
		}
		else{
			dispatch(keyCreateReset())
		}
		if(response || responeEdit)
		{
			
			navigate(`/keylist`)
		}

	},[response, responeEdit, navigate])

	const submitHandler=(e: React.FormEvent<HTMLFormElement>)=>{
		e.preventDefault()
		if(isEdit)
		{
			dispatch(editKey({
				label,
				key,
			},params.id))
		}
		else{
			dispatch(createKey({
				label,
				key,
			}))
		}
	}

    return (
		<FormContainer>
			<h1>{isEdit? "Edit" : "Add"} Key</h1>
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

				<Form.Group controlId='key'>
					<Form.Label>
						Key
					</Form.Label>
					<Form.Control type='text' placeholder='Enter Key' value={key} onChange={(e)=>setKey(e.target.value)}>

					</Form.Control>
				</Form.Group>

				<Button type="submit" variant='primary'> {isEdit? "Edit" : "Add"}</Button>
			</Form>
		</FormContainer>
    )
}

export default FormKeyScreen
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSpreadsheetOut } from '../actions/spreadsheetOutActions';
import type { RootState, AppDispatch } from '../store';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Select from 'react-select';
import { spreadsheetOutCreateReset } from '../reducers/spreadsheetOutSlices';
import { listSpreadsheets } from '../actions/spreadsheetActions';

type Spreadsheet = {
    id: number;
    label: string;
    key_label: string;
    is_public: string;
};

function AddSpreadsheetOutScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const [label, setLabel] = useState('');
    const [spreadsheetLabel, setSpreadsheetLabel] = useState('');
    const [dataCell, setDataCell] = useState('');

    type OptionType = { value: string; label: string };

    const spreadsheetOutCreate = useSelector((state: RootState) => state.spreadsheetOutCreate);
    const { error, loading, response } = spreadsheetOutCreate;

    const spreadsheetList = useSelector((state: RootState) => state.spreadsheetList);
    const { loading: loadingSpreadsheetList, error: errorSpreadsheetList, spreadsheets = null } = spreadsheetList;

    const userLogin = useSelector((state: RootState) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            dispatch(listSpreadsheets('?page=0'));
        }
    }, [dispatch, userInfo]);

    useEffect(() => {
        dispatch(spreadsheetOutCreateReset());
        if (response) {
            navigate(`/spreadsheetOutlist`);
        }
    }, [response, navigate, dispatch]);

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(
            createSpreadsheetOut({
                label,
                spreadsheet_label: spreadsheetLabel,
                data_cell: dataCell,
            })
        );
    };

    return (
        <FormContainer>
            <h1>Add Output Spreadsheet</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="label">
                    <Form.Label>Label</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Label"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="spreadsheet">
                    <Form.Label>Spreadsheet</Form.Label>
                    {loadingSpreadsheetList ? (
                        <Loader />
                    ) : errorSpreadsheetList ? (
                        <Message variant="danger">{errorSpreadsheetList}</Message>
                    ) : (
                        <Select<OptionType>
                            value={
                                (spreadsheets || [])
                                    .map((spreadsheet: Spreadsheet) => ({ value: spreadsheet.id, label: spreadsheet.label }))
                                    .find((o: OptionType) => o.label === spreadsheetLabel) || null
                            }
                            onChange={(selected) => setSpreadsheetLabel(selected ? selected.label : '')}
                            options={(spreadsheets || []).map((spreadsheet: Spreadsheet) => ({
                                value: spreadsheet.id,
                                label: spreadsheet.label,
                            }))}
                            isSearchable={true}
                            placeholder="Select Spreadsheet"
                        />
                    )}
                </Form.Group>

                <Form.Group controlId="dataCell">
                    <Form.Label>Data Cell</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Data Cell"
                        value={dataCell}
                        onChange={(e) => setDataCell(e.target.value)}
                    />
                </Form.Group>

                <br />
                <Button type="submit" variant="primary">
                    Add
                </Button>
            </Form>
        </FormContainer>
    );
}

export default AddSpreadsheetOutScreen;

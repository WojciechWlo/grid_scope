import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { deleteSpreadsheetOut, listSpreadsheetsOut } from '../actions/spreadsheetOutActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';

type SpreadsheetOut = {
    id: number;
    label: string;
    spreadsheet: string;
    data_cell: string;
    worksheet_name: string,    
};

function SpreadsheetOutListScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();

    const userLogin = useSelector((state: RootState) => state.userLogin);
    const { userInfo } = userLogin;

    const spreadsheetOutList = useSelector((state: RootState) => state.spreadsheetOutList);
    const { loading, error, spreadsheetsOut = null, pages, page } = spreadsheetOutList;

    const spreadsheetOutDelete = useSelector((state: RootState) => state.spreadsheetOutDelete);
    const { response: responseDelete } = spreadsheetOutDelete;

    let keyword = location.search;

    const addSpreadsheetOutHandler = () => {
        navigate('/addspreadsheetout');
    };
    const editSpreadsheetOutHandler = (id: number) => {
        navigate(`/editspreadsheetout/${id}`)
    };
    const deleteSpreadsheetOutHandler = (id: string) => {
        if (window.confirm('Are you sure you want to delete this spreadsheetOut?')) {
            dispatch(deleteSpreadsheetOut(id));
        }
    };

    useEffect(() => {
        if (userInfo) {
            dispatch(listSpreadsheetsOut(keyword));
        }
    }, [dispatch, userInfo, keyword, responseDelete]);

    return (
        <div>
            <Row className="align-items-center">
                <Col>
                    <h1>Output Spreadsheets</h1>
                </Col>
                <Col className="text-right">
                    <Button className="my-3" onClick={() => addSpreadsheetOutHandler()}>
                        <i className="fas fa-plus"></i> Add Output Spreadsheet
                    </Button>
                </Col>
            </Row>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <div>
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>LABEL</th>
                                <th>SPREADSHEET</th>
                                <th>DATA CELL</th>
                                <th>WORKSHEET NAME</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {(spreadsheetsOut || []).map((spreadsheetOut: SpreadsheetOut) => (
                                <tr key={spreadsheetOut.id}>
                                    <td>{spreadsheetOut.id}</td>
                                    <td>{spreadsheetOut.label}</td>
                                    <td>{spreadsheetOut.spreadsheet}</td>
                                    <td>{spreadsheetOut.data_cell}</td>
                                    <td>{spreadsheetOut.worksheet_name}</td>
                                    <td>
                                        <Button
                                            variant="light"
                                            className="btn-sm"
                                            onClick={() => editSpreadsheetOutHandler(spreadsheetOut.id)}
                                        >
                                            <i className="fas fa-edit"></i>
                                        </Button>

                                        <Button
                                            variant="danger"
                                            className="btn-sm"
                                            onClick={() => deleteSpreadsheetOutHandler('' + spreadsheetOut.id)}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate pages={pages || 1} page={page || 1} />
                </div>
            )}
        </div>
    );
}

export default SpreadsheetOutListScreen;

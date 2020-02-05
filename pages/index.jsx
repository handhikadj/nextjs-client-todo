import React, { Fragment, useState } from 'react';
import fetch from "isomorphic-unfetch"
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Fab from '@material-ui/core/Fab';
import AddIcon from "@material-ui/icons/Add";
import UpdateIcon from "@material-ui/icons/Create";
import UpdateIconForm from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import Axios from "axios";
import { useStyles } from "../modules/custom-ui-styles";
import FormAddTodo from "../components/Form";
import FormUpdateTodo from "../components/Form";
import DialogUpdateTodo from "../components/DialogUpdateTodo";
import Backdrop from "@material-ui/core/Backdrop";
import EmptyList from "../components/EmptyList";
import CircularProgress from "@material-ui/core/CircularProgress";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

const apiUrl = process.env.API_URL;

const Index = ({ initialData, propsApiError }) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState(propsApiError);
    const [todoIdForUpdate, setTodoIdForUpdate] = useState('');
    const [todoInput, setTodoInput] = useState('');
    const [updateTodoInput, setUpdateTodoInput] = useState('');
    const [modalUpdate, setModalUpdate] = useState(false);
    const [todoUpdateLabel, setTodoUpdateLabel] = useState(null);
    const [todos, setTodos] = useState(initialData);

    const closeUpdateModal = e => {
        setModalUpdate(false)
    };

    const handleChangeAdd = e => {
        setTodoInput(e.target.value)
    };

    const handleChangeUpdate = e => {
        setUpdateTodoInput(e.target.value)
    };

    const handleSubmitTodo = async e => {
        e.preventDefault();
        if (todoInput === '') return;
        setLoading(true);
        try {
            const { data } = await Axios.post(`${ apiUrl }/api/todos`, {
                title: todoInput
            });
            setLoading(false);
            setTodoInput('');
            setTodos(data)
        } catch (e) {
            setLoading(false);
            setApiError(true)
        }

    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setModalUpdate(false);
        setLoading(true);
        try {
            const { data } = await Axios.post(`${ apiUrl }/api/updateTodo/${ todoIdForUpdate }`, {
                title: updateTodoInput
            });
            setUpdateTodoInput('');
            setLoading(false);
            setTodos(data)
        } catch (e) {
            setLoading(false);
            setApiError(true)
        }

    };

    const openUpdateModal = async id => {
        setLoading(true);
        setTodoIdForUpdate(id);
        const { data } = await Axios.get(`${ apiUrl }/api/todos/${ id }`);
        setLoading(false);
        setTodoUpdateLabel(data.title);
        setModalUpdate(true);
    };

    const handleDelete = (id, currentId) => {
        const newData = [...todos];
        newData.splice(id, 1);
        setTodos(newData);
        setTimeout(() => {
            Axios.delete(`${ apiUrl }/api/todos/${ currentId }`)
        }, 500)
    };

    return (
        <>

            <DialogUpdateTodo
                openState={ modalUpdate }
                handleCloseAct={ closeUpdateModal }
                dataLabel={ todoUpdateLabel }
            >
                <FormUpdateTodo
                    handleSubmitTodo={ handleUpdate }
                    customLabel={ todoUpdateLabel }
                    formClass={ classes.form }
                    inputValue={ updateTodoInput }
                    handleChangeTodo={ handleChangeUpdate }
                    textFieldTodoClass={ classes.textFieldAddTodo }
                >
                    <UpdateIconForm/>
                </FormUpdateTodo>
            </DialogUpdateTodo>

            < Backdrop className={ classes.backdrop } open={ loading }>
                <CircularProgress color="primary"/>
            </Backdrop>
            <Container component="main" maxWidth="md" className={ classes.container }>
                <CssBaseline/>
                <Grid container className={ classes.paper }>
                    <Typography component="h1" variant="h5" style={ { marginBottom: '40px' } }>
                        Todo Example With Next.js and Laravel 6
                    </Typography>
                    <FormAddTodo
                        customLabel="Insert New Todo"
                        handleSubmitTodo={ handleSubmitTodo }
                        formClass={ classes.form }
                        inputValue={ todoInput }
                        handleChangeTodo={ handleChangeAdd }
                        textFieldTodoClass={ classes.textFieldAddTodo }
                    >
                        <AddIcon onClick={ handleSubmitTodo }/>
                    </FormAddTodo>
                    <div style={ { height: '20px' } }/>
                    <Divider style={ { height: '1.5px', width: '100%' } }/>
                    <div style={ { height: '13px' } }/>
                    <Grid container
                          style={ {
                              minWidth: '550px',
                              minHeight: '300px',
                              maxHeight: '300px',
                              overflowY: 'scroll'
                          } }>

                        { apiError ? (
                            <Typography component="h1" variant="h4">
                                Server's Occured. Please, Try Again
                            </Typography>
                        ) : todos.length === 0 ? (<EmptyList/>) : todos.map((value, index) =>
                            <Fragment key={ `parentKey: ${ value.id }` }>
                                <Grid key={ `yourkey: ${ value.id }` } id={ value.id } container
                                      justify="center"
                                      spacing={ 3 }
                                      style={ { marginTop: '10px' } }>
                                    <Grid item xs={ 9 }>
                                        <Typography component="p" variant="h6">
                                            { value.title }
                                        </Typography>
                                    </Grid>
                                    <Fab onClick={ () => openUpdateModal(value.id) } id={ value.id }
                                         size="medium"
                                         color="secondary"
                                         style={ { marginRight: '10px' } }>
                                        <UpdateIcon/>
                                    </Fab>
                                    <Fab size="medium" onClick={ () => handleDelete(index, value.id) }
                                         id={ value.id }
                                         color="secondary">
                                        <DeleteIcon/>
                                    </Fab>
                                </Grid>
                                <Divider key={ `mykey: ${ value.id }` }
                                         style={ { width: '100%', marginTop: '15px' } }/>
                            </Fragment>
                        ) }
                    </Grid>
                </Grid>
            </Container>

        </>
    );
};

Index.getInitialProps = async () => {
    const res = await fetch(`${ apiUrl }/api/todos`);
    const data = await res.json();
    return {
        initialData: data || [],
        propsApiError: false
    }
};

export default Index

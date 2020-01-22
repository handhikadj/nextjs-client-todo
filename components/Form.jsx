import Grid from "@material-ui/core/Grid";
import { TextField } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import React from "react";

export default ({ children, handleSubmitTodo, formClass, customLabel, handleChangeTodo, inputValue, textFieldTodoClass }) => (
    <form onSubmit={ handleSubmitTodo } className={ formClass } noValidate>
        <Grid container justify="center" alignItems="center" spacing={ 2 }>
            <Grid>
                <TextField
                    value={ inputValue }
                    onChange={ handleChangeTodo }
                    label={ customLabel }
                    className={ textFieldTodoClass }
                    variant="standard"/>
            </Grid>
            <Grid>
                <Fab size="medium" color="secondary">
                    { children }
                </Fab>
            </Grid>
        </Grid>
    </form>
)

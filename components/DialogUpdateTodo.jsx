import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React from 'react';

export default ({ children, openState, handleCloseAct }) => (
    <Dialog open={ openState } onClose={ handleCloseAct } aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Update Todo</DialogTitle>
        <DialogContent>
            { children }
        </DialogContent>
        <DialogActions>
            <Button onClick={ handleCloseAct } color="primary">
                Close
            </Button>
        </DialogActions>
    </Dialog>
)

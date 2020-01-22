import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '3px solid #eee',
        borderRadius: '10px',
        paddingRight: '100px',
        paddingLeft: '100px',
        paddingTop: '20px',
        paddingBottom: '40px'
    },
    textFieldAddTodo: {
        width: 280
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    wrapperList: {
        maxWidth: '600px',
        maxHeight: '300px',
        overflowY: 'scroll'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
    },
    submit: {
        marginLeft: 10,
    },
    backdrop: {
        zIndex: 999999,
        color: '#fff',
    }
}));

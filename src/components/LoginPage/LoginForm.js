import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
    Box,
    Button,
    TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > *': {
            marginBottom: '20px',
        },
    }
}));
const LoginForm = () => {
    const classes = useStyles();
    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField autoFocus id="outlined-basic" label="Username" variant="outlined" fullWidth required size='small' />
            <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth required size='small' />
            <Box display="flex">
                <Button type="submit" variant="contained" color="primary" style={{ fontWeight: '600' }}>
                    Login
                </Button>
                <Button component={Link} to="/" color="primary">
                    Cancel
                </Button>
            </Box>
        </form>
    );
};

export default LoginForm;
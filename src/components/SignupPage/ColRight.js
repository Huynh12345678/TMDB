import { makeStyles } from '@material-ui/core/styles';
import { respondTo } from '../../helpers/_respondTo';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
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
const Div = styled.div`
@media ${respondTo.md} {
    padding:0px 20px 0px;
    div{
        p{
            margin:0;
        }
    }
   }
`
const ColRight = () => {
    const classes = useStyles();
    return (
        <Div>
            <div>
                <h4 style={{ fontWeight: '700' }}>Sign up for an account</h4>
                <p>Signing up for an account is free and easy. Fill out the form below to get started. JavaScript is required to to continue.</p>
                <br />
            </div>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField autoFocus id="outlined-basic" label="Username" variant="outlined" fullWidth required size='small' />
                <TextField id="outlined-basic" label="Password (4 characters minimum)" variant="outlined" fullWidth required size='small' />
                <TextField id="outlined-basic" label="Password Confirm" variant="outlined" fullWidth required size='small' />
                <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth required size='small' />
                <p>By clicking the "Sign up" button below, I certify that I have read and agree to the TMDb terms of use and privacy policy.</p>
                <Box display="flex">
                    <Button type="submit" variant="contained" color="primary" style={{ fontWeight: '600' }}>
                        Sign Up
                    </Button>
                    <Button component={Link} to="/" color="primary">
                        Cancel
                    </Button>
                </Box>
            </form>
        </Div>
    );
};

export default ColRight;
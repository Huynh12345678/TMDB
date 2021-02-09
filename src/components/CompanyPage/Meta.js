import styled from 'styled-components';
import { makeStyles, Typography, useMediaQuery } from "@material-ui/core";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PublicIcon from "@material-ui/icons/Public";
import LinkIcon from "@material-ui/icons/Link";
const Container = styled.div`
max-width:1300px;
padding: '10px 31px' 
 `
const useStyles = makeStyles((theme) => ({
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        backdropFilter: 'blur(4px)'
    },
    toolbar: {
        justifyContent: 'start !important',
        "& > div": {
            opacity: '0.7',
            color: '#fff',
            display: "flex",
            alignItems: "center",
            padding: '0',
            marginRight: theme.spacing(3),
            whiteSpace: "nowrap",
            "& :first-child": {
                marginRight: 6,
            },
            "& > a": {
                color: '#fff',
                "&:hover": {

                }
            }
        },
    },
}));
const Meta = ({ props }) => {
    const classes = useStyles();
    const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    return (
        <div className={classes.overlay}>
            <Container className={'container ' + classes.toolbar} style={{ flexDirection: matches ? 'column' : 'row' }}>
                <div>
                    <AssignmentIndIcon fontSize='small' />
                    <Typography>{props.name}</Typography>
                </div>
                <div>
                    <LocationOnIcon fontSize='small' />
                    <Typography>{props.headquarters ? props.headquarters : '-'}</Typography>
                </div>
                <div>
                    <PublicIcon fontSize='small' />
                    <Typography>{props.origin_country ? props.origin_country : '-'}</Typography>
                </div>
                <div>
                    <LinkIcon fontSize='small' />
                    <Typography component={"a"} href={props.homepage} target={"_blank"}>Home page</Typography>
                </div>
            </Container>
        </div>
    );
};

export default Meta;
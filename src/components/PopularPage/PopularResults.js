import {
    Box,
    Card,
    makeStyles,
    Tab,
    Tabs,
    Typography,
    useMediaQuery
} from "@material-ui/core";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    // MuiBox-root:{
    //     backgroundColor:'red'
    // },
    tab: {
        padding: "24px 12px",
        marginRight: 0,
        "&.Mui-selected": {
            "& $span": {
                background: 'white',
            }
        },
        [theme.breakpoints.down("sm")]: {
            padding: 12,
        },
        '&:hover': {
            "& $span": {
                background: 'white',
            }
        }
    },
    label: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingLeft: 4,
        paddingRight: 4,
        fontWeight: "inherit",
    },
    span: {
        background: '#E0E0E0',
        padding: "0 10px",
        borderRadius: 10,
        marginLeft: theme.spacing(1),
    },
}));
const PopularResults = ({ params, movieResults, type }) => {
    const classes = useStyles();
    const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    const allTabs = [
        {
            type: "movie",
            label: "Movies",
            total_results: movieResults.movie.total_results,
        },
        {
            type: "tv",
            label: "Tv Shows",
            total_results: movieResults.tv.total_results,
        },
        {
            type: "person",
            label: "People",
            total_results: movieResults.people.total_results,
        }
    ];
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return (
        <Card style={{ borderRadius: '8px' }}>
            <Box p={2} color='white' style={{ backgroundColor: '#244360' }}>
                <Typography variant="h6" >{'Popular ' + capitalizeFirstLetter(type) + 's'}</Typography>
            </Box>
            <Tabs
                orientation={matches ? "horizontal" : "vertical"}
                variant={matches ? "scrollable" : "fullWidth"}
                scrollButtons="on"
                indicatorColor="primary"
                value={params.type}
            >
                {
                    allTabs.map((tab) => (
                        <Tab
                            key={tab.type}
                            component={Link}
                            to={`/${tab.type}/1`}
                            selected={tab.type === params.type}
                            value={tab.type}
                            className={classes.tab}
                            label={
                                <Typography className={classes.label}>
                                    {tab.label}
                                    <span className={classes.span}>{tab.total_results.toLocaleString()}</span>
                                </Typography>
                            }
                        >
                        </Tab>
                    ))
                }
            </Tabs>
        </Card>
    );
};

export default PopularResults;
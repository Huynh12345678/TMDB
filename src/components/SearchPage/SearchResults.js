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
        padding: "0 10px",
        background: '#E0E0E0',
        borderRadius: 10,
        marginLeft: theme.spacing(1),
    },
}));
const SearchResults = ({ params, movieResults, type, query }) => {
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
        },
        {
            type: "companie",
            label: "Companies",
            total_results: movieResults.company.total_results,
        },
        {
            type: "collection",
            label: "Collections",
            total_results: movieResults.collection.total_results,
        },
        {
            type: "keyword",
            label: "Keywords",
            total_results: movieResults.keyword.total_results,
        }
    ];
    // function capitalizeFirstLetter(string) {
    //     return string.charAt(0).toUpperCase() + string.slice(1);
    // }
    return (
        <Card style={{ borderRadius: '8px' }}>
            <Box p={2} color='white' style={{ backgroundColor: '#244360' }}>
                <Typography variant="h6" >{'Search Results for "'}<span className='font-italic'>{query}</span>{'"'}</Typography>
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
                            to={`/search/${tab.type}/${query}/1`}
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

export default SearchResults;
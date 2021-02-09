import {
    Box,
    Card,
    makeStyles,
    Tab,
    Tabs,
    Typography,
    useMediaQuery
} from "@material-ui/core";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
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
    }
}));
const VideosResults = ({ params, data, options, mediaType }) => {
    const color = useSelector((state) => state.color);
    const type = params;
    const classes = useStyles();
    const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    const allTabs = [
        {
            type: "Trailers",
            label: "Trailers",
            total_results: options.Trailers.length,
        },
        {
            type: "Teasers",
            label: "Teasers",
            total_results: options.Teasers.length,
        },
        {
            type: "Clips",
            label: "Clips",
            total_results: options.Clips.length,
        },
        {
            type: "Scenes",
            label: "Behind the Scenes",
            total_results: options.Scenes.length,
        },
        {
            type: "Bloopers",
            label: "Bloopers",
            total_results: options.Bloopers.length
        },
        {
            type: "Featurettes",
            label: "Featurettes",
            total_results: options.Featurettes.length
        }
    ];
    const allTabsTv = [
        ...allTabs,
        {
            type: "Opening",
            label: "Opening Credits",
            total_results: options.Opening.length
        }
    ]
    return (
        <Card style={{ borderRadius: '8px' }}>
            <Box p={2} color='white' style={{ backgroundColor: `rgba(${color.backdrop},1)`, color: color.text }}>
                <Typography variant="h6" >Videos</Typography>
            </Box>
            <Tabs
                orientation={matches ? "horizontal" : "vertical"}
                variant={matches ? "scrollable" : "fullWidth"}
                scrollButtons="on"
                indicatorColor="primary"
                value={type}
            >
                {
                    mediaType === 'movie' ?
                        allTabs.map((tab) => (
                            <Tab
                                key={tab.type}
                                component={Link}
                                to={`/movie/${data.id}-${data.title}/videos/${tab.type}`}
                                selected={tab.type === type}
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
                        )) : allTabsTv.map((tab) => (
                            <Tab
                                key={tab.type}
                                component={Link}
                                to={`/tv/${data.id}-${data.title}/videos/${tab.type}`}
                                selected={tab.type === type}
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

export default VideosResults;
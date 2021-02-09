import { Box, useMediaQuery } from "@material-ui/core";
import { Pagination } from '@material-ui/lab';
import { useHistory } from "react-router-dom";
const PaginationBar = ({ total_pages, params, type }) => {
    const history = useHistory();
    const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));
    const handleChange = (event, value) => {
        if (params.query) {
            history.push(`/search/${params.type}/${params.query}/${value}`);
        } else {
            history.push(`/${params.type}/${value}`);
        }
    };
    return total_pages > 1 && (
        <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
                count={total_pages}
                page={parseInt(params.page)}
                onChange={handleChange}
                shape="rounded"
                size={!matches ? "medium" : "small"}
            />
        </Box>
    )
};

export default PaginationBar;
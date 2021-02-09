import { Box, Button, CircularProgress } from "@material-ui/core";

const LoadMore = ({ loading, handleClick }) => {
    return loading ? <Box display='flex' justifyContent='center'>
        <CircularProgress color='primary' />
    </Box>
        :
        <Button
            style={{ backgroundColor: '#032541', color: 'white', fontWeight: '600' }}
            variant='contained'
            size='large'
            fullWidth
            onClick={handleClick}
        >
            Load More
    </Button>

}

export default LoadMore;
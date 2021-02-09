import moment from 'moment';
const handleDate = (date) => {
    let dt = moment(date, "YYYY-MM-DD");
    return dt.format('LL');
}

export default handleDate;
import CompanyPage from '../components/CompanyPage';
const Company = ({ match }) => {
    return (
        <CompanyPage id={match.params.id} />
    );
};
export default Company
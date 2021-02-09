import { Link } from "react-router-dom";
import styled from "styled-components";

const Div = styled.div`
border-top:1px solid #ccc;
height:40px;
font-size:18px;
display:flex;
align-items:center;
`
const Span = styled.span`
background-color:rgba(0,0,0,0.2);
color:white;
padding:2px 6px;
margin-left:6px;
font-size:14px;
border-radius:4px;
display:inline-flex;
line-height:1.3em;
font-weight:700;
`
const link = {
    color: 'black',
    display: 'flex',
    alignItems: 'center'
}

const Company = ({ movie, company }) => {
    return (
        <Div style={{ borderBottom: company.key === company.length - 1 ? '1px solid #ccc' : 'none' }}>
            <Link style={link} to={'/company/' + movie.id}>
                {
                    movie.logo_path ? <img className='img-fluid' src={movie.logo_path} alt="" loading='lazy' /> :
                        movie.name
                }
                {
                    movie.origin_country && <Span> {movie.origin_country}</Span>
                }
            </Link>
        </Div >
    );
};

export default Company;
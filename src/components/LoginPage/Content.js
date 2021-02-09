import styled from 'styled-components'
import { Link } from 'react-router-dom';
const Div = styled.div`
h4{
    font-weight:600;
}
p{
    a{
        color:#01BBEB;
    }
}
`
const Content = () => {
    return (
        <Div>
            <h4>Login to your account</h4>
            <p>In order to use the editing and rating capabilities of TMDb, as well as get personal recommendations you will need to login to your account.
            If you do not have an account, registering for an account is free and simple.
                <Link to='/signup'>Click here</Link> to get started.</p>
            <p>If you signed up but didn't get your verification email, <Link to='#'>click here</Link> to have it resent.</p>
        </Div>
    );
};

export default Content;
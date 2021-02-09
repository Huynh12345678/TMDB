import Content from './Content';
import styled from 'styled-components'
import LoginForm from './LoginForm';
import { respondTo } from '../../helpers/_respondTo';
const Div = styled.div`
padding:20px 31px 0px;
@media ${respondTo.md} {
    padding:20px 20px 0px;
   }
`

const Index = () => {
    return (
        <Div className='container'>
            <Content />
            <LoginForm />
        </Div>
    );
};

export default Index;
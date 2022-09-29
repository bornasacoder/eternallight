import { Search} from '@material-ui/icons'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
const Container = styled.div`
background: lightgray;
margin: 0;
padding: 0;
`

const Wrapper = styled.div`
    padding: 0px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

`
const Left = styled.div`
flex: 1;
display: flex;
align-items: center;
`
const Language = styled.div`
   font-size: 14px;
   cursor: pointer;

`
const SearchContainer = styled.div`
   border: 0.5px solid lightgray;
   display: flex;
   align-items: center;
   margin-left: 25px;
   padding: 5px;
`
const Input = styled.input`
 border: none;
 padding: 5px;

`
const Center = styled.div`
flex: 1;
text-align: center;

`
const Logo = styled.h1`
font-size: 24px;
font-weight: 300;

`
const Right = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: flex-end;
`;

const MenuItem = styled.div`
`
const Button = styled.button`
border: none;
background: transparent;
`
const Navbar = (props) => {
   const {setUser} = props;
   let navigate  = useNavigate();
   const handleLogout = () =>{
     localStorage.removeItem('auth-token');
     setUser("");
     navigate("/")
   }

  return (
    <Container>
        <Wrapper>
         <Left>
             <Language>EN</Language>
             <SearchContainer>
                <Input placeholder='Search' />
                <Search style={{color:"gray", fontSize:"16px"}}/>
             </SearchContainer>
         </Left>
         <Center>
            <Logo>Eternalight Infotech</Logo>
         </Center>
         <Right>
            {!localStorage.getItem('auth-token') ? 
             <MenuItem>
             <Link to ="/register" style={{margin: "20px 20px",color:"black"}}>Register</Link>
             <Link to ="/login" style={{marginRight: "30px", color:"black"}}>Login</Link>
             </MenuItem>            
            : <Button onClick={handleLogout} ><MenuItem>Logout</MenuItem></Button> }
            
         </Right>
        </Wrapper>
    </Container>
  )
}

export default Navbar
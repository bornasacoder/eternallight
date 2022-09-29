import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import {EditOutlined} from "@material-ui/icons"
import Modal from "./Modal";
const Container = styled.div`
`;
const Wrapper = styled.div`

display: flex;
align-items: center;
justify-content: center;
margin-top: 10vh;
`;

const Card = styled.div`
width: 350px;
height: 300px;
border: 1px solid lightgray;
border-radius: 10px;
-webkit-box-shadow: -3px 0px 5px 0px rgba(43,27,43,1);
-moz-box-shadow: -3px 0px 5px 0px rgba(43,27,43,1);
box-shadow: -3px 0px 5px 0px rgba(43,27,43,1);
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`;
const Left = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
`;
const Header = styled.h3`
font-size: 24px;
color: teal;
`;
const Para = styled.p`
font-size: 16px;

`;
const Span = styled.span`
font-size: 20px;
font-weight: 600;
`


const Right = styled.div`
`;
const Button = styled.button`
cursor: pointer;
margin-top:10px;
`

 const Userdata = (props) => {
   const {user,setUser} = props;
    const [active, setActive] = useState(false);
  

    useEffect(() => {
        const getUser = async ()=>{
           const authtoken =  localStorage.getItem('auth-token')
         try{

           const result = await fetch("https://eternalight-infotech.herokuapp.com/api/auth/getuser",{
            method:"GET",
            headers:{
                'Content-Type':'application/json',
                 'auth-token': authtoken 
           },
        },[]);
           const res = await result.json();           
           setUser(res);
          console.log(res);
         }catch(err){
            console.log(err);
         }
        };
        getUser();
   }, []);
   return (
     <Container>
        <Wrapper>
           <Card>
              <Left key={user._id}>
                <Header>Hello  {user.name}</Header>
                <Para> Your Email-Id is <Span> {user.email} </Span></Para>
            </Left>
            <Right>
            { user && <Button onClick={() => setActive(true)}><EditOutlined/></Button>}
            
            <Modal
                active={active}
                setUser={setUser}
                hideModal={() => setActive(false)}
                user={user}
                title="Edit User">
                            
            </Modal>
            </Right>
           </Card>
        </Wrapper>
     </Container>
   )
 }
 
 export default Userdata
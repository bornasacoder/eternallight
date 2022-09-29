import React,{Fragment, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import styled from "styled-components";
import {
    ModalBlock,
    ModalBody,
    ModalClose,
    ModalContainer,
    ModalHeader,
    ModalOverlay,
    ModalTitle,
  } from "./ModalStyle";
const InputContainer = styled.div`
margin-top: 50px;
display: flex;
flex-direction:column;
`;
const InputTop = styled.div`
display: flex;
justify-content: flex-end;
align-items: flex-end;
flex-direction: column;


`;
const Input = styled.input`
padding: 10px;
width:40vw;
margin-bottom: 30px;
`;
const Button = styled.button`
  border: none;
  background-color: teal;
  color: white;
  border: 1px solid lightgray;
  border-radius: 8px;
  padding: 10px 0px;
  width: 10vw;
  margin-bottom: 30px;
  cursor: pointer;
`;
const InputBottom = styled.div`
display: flex;
justify-content: flex-end;
flex-direction: column;
align-items: flex-end;


`;


const Modal = ({ title, active, hideModal, user, setUser }) => {
  const [error,setError] = useState(null);  
    const [userData, setUserData] = useState({name: user.name, password:""});
  const navigate = useNavigate();
    const onChange = (e) =>{
      setUserData({...userData, [e.target.name]: e.target.value})
  }
  const handleClick = async (e)=>{
    e.preventDefault();
        const authtoken =  localStorage.getItem('auth-token')
      try{

        const response = await fetch(`https://eternalight-infotech.herokuapp.com/api/auth/${user._id}`,{
         method:"PUT",
         headers:{
             'Content-Type':'application/json',
              'auth-token': authtoken 
        },
        body: JSON.stringify({name: userData.name, password: userData.password})

     });
     const json = await response.json();
     
     if(json.success){
     setUser(json.updateUser);
     hideModal();
     setError(null);
     }
     else{
      setError(json);
     }
    //  console.log(json);
      
      }catch(err){
         console.log(err);
      }
     };
  return (
    <Fragment>
    {active && (
      <ModalBlock>
        <ModalOverlay onClick={() => hideModal()}></ModalOverlay>
        <ModalContainer>
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            <ModalClose onClick={() => hideModal()}>X</ModalClose>
          </ModalHeader>
          <ModalBody>
            <InputContainer>
            <InputTop>
            <Input placeholder={user.name} type="text"  name="name" value={userData.name}  onChange={onChange} minLength={2}/>
            </InputTop>
            <InputBottom>
            <Input placeholder='Password' type="password" value={userData.password} onChange={onChange} name="password" minLength={5} required />
            {error && <p style={{color:"red"}}>{error.errors[0].msg}</p>}
            <Button onClick={handleClick}  >Save Changes</Button>
            </InputBottom>
            </InputContainer>
          </ModalBody>
         
        
        </ModalContainer>
      </ModalBlock>
    )}
  </Fragment>
  )
}

export default Modal
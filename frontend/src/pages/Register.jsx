import React,{useState} from 'react'
import {useNavigate} from "react-router-dom";
import styled from 'styled-components'

const Container = styled.div`
width: 98vw;
height: 100vh;
background: linear-gradient(rgba(255,255,255,0.5),rgba(255,255,255,0.5)), url("https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=600") center;
background-size: cover;
display: flex;
justify-content: center;
align-items: center;
`
const Wrapper = styled.div`
width: 40%;
padding: 20px;
background-color: white;
@media (max-width: 600px){
  width: 70%;   
}

`
const InputTitle = styled.h2`
font-size: 24px;
font-weight: 400;
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif ;
`
const Form = styled.form`
display: flex;
flex-wrap:wrap;
flex-direction: column;
`
const Input = styled.input`
flex: 1;
min-width: 40%;
margin: 12px 10px 0 0 ;
padding: 10px;
@media (max-width: 600px){
  margin-bottom: 15px;   
}
`;
const Agreement = styled.div`
font-size: 13px;
padding-top: 10px;
@media (max-width: 600px){
  margin-bottom: 10px;  
}
`
const Button = styled.button`
margin-top: 10px;
width: 40%;
padding: 10px 20px;
background: #07b2b2;
color: white;
cursor: pointer;
border: none;
@media (max-width: 600px){
  width:100%;   
}
`

const Register = (props) => {
  const [error, setError] = useState({errors:null});
  const [errors, setErrors] = useState(null);
  const [credentials, setCredentials] = useState({name:"",email:"", password:""})
  let navigate = useNavigate();
    const handleClick = async (e)=>{
      e.preventDefault();
      const {name, email, password} = credentials;
      const response = await fetch("https://eternalight-infotech.herokuapp.com/api/auth/createuser",{
          method:"POST",
          headers:{
              'Content-Type':'application/json'
          },
          body: JSON.stringify({name, email, password})
      });
      const json = await response.json()
      console.log(json);
      if(json.success){
          // save the auth token redirect
          navigate("/login");
          props.showAlert("Account created successfully", "success");
        
          setError({errors:null});  
      }else{
          props.showAlert("Invalid Credentials", "danger");
          if(Array.isArray(json.errors))
            setError({errors:json.errors[0].msg}); 
            else    
            setError({errors:json.errors}); 
            console.log(error)    
             
      }
  }
  const onChange = (e)=>{
      setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  return (
    <Container>
        <Wrapper>
          <InputTitle>CREATE AN ACCOUNT</InputTitle>

          <Form>
              
            <Input placeholder='name' name='name' value={credentials.name} type="text" onChange={onChange} required minLength={2} />
        
           
            <Input placeholder="email" type="email" name='email' value={credentials.email} onChange={onChange} />
           

            <Input placeholder="password" type="password" name='password' value={credentials.password} onChange={onChange} required minLength={5} />
             <Agreement>By creating an account, I consent to the processing of my personal data in accordance with the <b>PRIVACY POLICY</b></Agreement>
           {error.errors && <p style={{color:"red"}}>{error.errors} </p>}
          


             <Button onClick={handleClick} >CREATE</Button>
          </Form>
        </Wrapper>
    </Container>
  )
}

export default Register
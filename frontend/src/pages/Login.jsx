import React, {useState} from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';

const Container = styled.div`
width: 98vw;
height: 100vh;
background: linear-gradient(rgba(255,255,255,0.5),rgba(255,255,255,0.5)), url("https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=600") center;
background-size: cover;
display: flex;
align-items: center;
justify-content: center;

`;

const Wrapper = styled.div`
width: 30%;
padding: 20px;
background-color: white;
@media (max-width: 768px){
  width: 50%;   
}
@media (max-width: 500px){
  width: 75%;   
}
`;
const Title = styled.h1`
font-size: 24px;
font-weight: 400;
`;

const Form = styled.form`
display: flex;
flex-direction: column;
`;

const Input = styled.input`
flex: 1;
min-width: 40%;
margin: 10px 0px ;
padding: 10px;
`;



const Button = styled.button`
width: 40%;
border:none;
padding: 15px 20px;
background-color: teal;
color: white;
cursor:pointer;
margin-bottom: 10px;
&:disabled{
  color: green;
  cursor:not-allowed;
} 
`;
const Link = styled.a`
margin: 5px 0px;
font-size: 12px;
text-decoration: underline;
cursor: pointer;
color: black;
`;

const Error = styled.span`
color: red;
`;
const Login = (props) => {
  const [error, setError] = useState({errors:null,error:null});
    const [credentials, setCredentials] = useState({email:"", password:""})
    let navigate = useNavigate();
    const handleClick = async (e)=>{
      e.preventDefault()
      const response = await fetch("https://eternalight-infotech.herokuapp.com/api/auth/login",{
          method:"POST",
          headers:{
              'Content-Type':'application/json'
          },
          body: JSON.stringify({email: credentials.email, password: credentials.password})
      });
      const json = await response.json()
     console.log(json)
     if(json.success){
      // save the auth token redirect
          localStorage.setItem('auth-token', json.authtoken);
          navigate("/");
        props.showAlert("Logged in successfully", "success")
     }else{
        props.showAlert("Invalid Details", "danger")
          setError(json);
     }
  }
  const onChange = (e)=>{
      setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  return (
    <Container>
    <Wrapper>
     <Title>SIGN IN</Title>
     <Form>
         <Input placeholder='email' type="email" name='email' value={credentials.email}  onChange={onChange} />
         {error.errors && <p style={{color:"red"}}>{error.errors[0].msg} </p>}
         <Input placeholder='password' type="password" name='password' value={credentials.password}  onChange={onChange} />
         {error.error && <p style={{color:"red"}}>{error.error} </p>}
      <Button onClick={handleClick} >LOGIN</Button>
    
      {/* { error && <Error> Something went wrong...</Error>} */}
      <Link href="/register" >DO NOT YOU REMEMBER THE PASSWORD?</Link>
      <Link href="/register">CREATE A NEW ACCOUNT</Link>

     </Form>
    </Wrapper>
 </Container>
)
  }


export default Login
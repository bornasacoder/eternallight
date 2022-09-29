import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import styled from "styled-components";
import Userdata from '../components/Userdata';
import Alert from '../components/Alert';

const Container = styled.div``;
const Home = (props) => {
  const [user,setUser] = useState("");
 
  return (
    <Container>
        <Navbar setUser={setUser}/>
        <Alert alert={props.alert} />
        <Userdata user={user} setUser={setUser} />
    </Container>
  )
}

export default Home
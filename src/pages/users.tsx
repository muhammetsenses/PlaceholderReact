import { Link, useLoaderData } from "react-router-dom";
import styled from "styled-components";

export async function Loader() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    return users
}
const Wrapper = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;

`
const UserCard = styled.div`
width:500px;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
margin: 1.25rem 0;
background: linear-gradient(
    90deg,
    #0c0c0c 0%,
    #585858 49%,
    #8a8989 100%
  );
padding: 1.5rem 0;
color:white;
`
const Details = styled(Link)`
padding:1rem;
background-color: white;
cursor:pointer;
text-decoration:none;
color:black;
font-weight:bold;
margin-top: 1rem;
&:hover{
    background-color: black;
    color:white
}
`

interface Users {
    id:number,
    name:string,
    username:string,
    email:string
}

const Users = () => {

    const users = useLoaderData() as Users[]

  return (
    <Wrapper>
    {users.map((user) => (
        <UserCard key={user.id}>    
        <h3>{user.name}</h3>
        <h6>{user.username}</h6>
        <h6>{user.id}</h6>
        <h6>{user.email}</h6>
        <Details to={`${user.id}`}>Details</Details>
        
        
        </UserCard>
    ))}
    
    </Wrapper>
  )
}

export default Users;
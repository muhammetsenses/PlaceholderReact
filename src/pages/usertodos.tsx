import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";


interface Todo{
  userId: number
    id: number
    title: string
    completed: boolean
}

const Wrapper = styled.div`
  display: flex;
  flex-direction:column;
  height:100%;
  padding: 2.5rem 0;
  align-items:center;
  justify-content:center;
 `;
const ListItem = styled.div`
display:flex;
gap:1rem;
width: 600px;
margin-bottom:1.5rem;
padding:1rem;
background: linear-gradient(
    90deg,
    #0c0c0c 0%,
    #585858 49%,
    #8a8989 100%
  );
  color:white;
border-radius:1rem;
box-shadow: 0px 20px 26px -10px #151416;`

const UserTodos: React.FC= () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState<boolean>(true);
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    async function fetchTodos() {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
      const todos = await response.json() 
      setTodos(todos)
      setLoading(false)
      console.log(todos)
    }
    fetchTodos();
  }, [userId]);

    if(loading){
      return <div>Loading.......</div>
    }
    return (
      <Wrapper>
        <h1 className="mb-4 text-white fw-bolder">Todos</h1>
        {todos.map(todo => (
        <ListItem key={todo.id}>
          <input type="checkbox" checked={todo.completed}  readOnly/>
          <h4>{todo.title}</h4>
        </ListItem>
      ))}
      </Wrapper>
    )
  }
  
  export default UserTodos;
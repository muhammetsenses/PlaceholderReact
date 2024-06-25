import { Col, Container, Row } from "react-bootstrap";
import { Link, useLoaderData, useParams } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
height: 100dvh;
`

const UserLink = styled(Link)`
  padding: 2rem;
background: linear-gradient(90deg, #171718 0%, #6b6b6b 49%, #fffeff 100%);
  cursor: pointer;
  text-decoration: none;
  color: white;
  font-weight: bold;
  margin: 1.5rem;
  display:inline-block;
  width:10em;
  font-size: 2rem;
  box-shadow: 3px 10px 19px 0px #272629;
`;
const Title = styled.h1`
margin: 3rem 0;
font-weight:bold;
color: #3b2b4b;`

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

// interface Params {
//   userId: string;
// }

export async function Loader({ params }: { params: any }) {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users/" + params.userId
  );
  const user = await response.json();
  // console.log(params);
  return user;
}

const UserDetails = () => {
  const user = useLoaderData() as User;
  const { userId } = useParams();
  // console.log(user);
  return (
    <Wrapper>
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col lg="8" className="text-center">
            <Title>{user.name}</Title>
            
            <UserLink to={`/users/${userId}/posts`}>Posts</UserLink>
            <UserLink to={`/users/${userId}/albums`}>Albums</UserLink>
            <UserLink to={`/users/${userId}/todos`}>Todos</UserLink>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default UserDetails;

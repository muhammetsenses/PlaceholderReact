import { Link, useLoaderData, useParams } from "react-router-dom";
import styled from "styled-components";

// interface Params {
//   userId: string;
// }
interface posts {
  id: number;
  userId: number;
  title: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction:column;
  height:100%;
  align-items:center;
  justify-content:center;
  
`;
const AlbumItem = styled(Link)`
display:flex;
background: linear-gradient(
    90deg,
    #0c0c0c 0%,
    #585858 49%,
    #8a8989 100%
  );
color:white;
padding:1rem;
padding-bottom:0;
min-width:600px;
margin-bottom:2rem;
border-radius: 1rem;
border:1px solid black;
box-shadow: 0px 16px 21px -13px #000000;
cursor: pointer;
text-decoration:none;
`
const Title = styled.h1`
margin:3rem 0;
`

export async function Loader({ params }: { params: any }) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.userId}/albums`
  );
  const albums = await response.json();
  return albums;
}

const UserAlbums = () => {
  const albums = useLoaderData() as posts[];
  const {userId} = useParams()
  return (
    <>
      <Wrapper>
        <Title>Albums</Title>
        {albums.map((album) => (
          <AlbumItem to={`/users/${userId}/albums/${album.id}`} key={album.id}><p>{album.title}</p></AlbumItem>
        ))}
      </Wrapper>
    </>
  );
};

export default UserAlbums;

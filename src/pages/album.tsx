import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useLoaderData } from "react-router-dom";
import styled from "styled-components";
import { FaHeart } from "react-icons/fa6";
import { FavoritesStore } from "../stores/favorites";

// interface UserParams {
//   userId: string;
//   albumId: string;
// }
interface Albums {
  userId: number;
  id: number;
  title: string;
}

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface User {
  id: number;
  username: string;
}

const Title = styled.h1`
  margin-block: 3rem;
  text-align: center;
  background: linear-gradient(
    90deg,
    #0c0c0c 0%,
    #585858 49%,
    #8a8989 100%
  );
  color: white;
  padding-block: 1.5rem;
  border-radius: 1rem;
  border: 1px solid black;
`;

const Name = styled(Link)`
  text-decoration: none;

  margin: 1rem;
  padding: 1rem 3rem;
  font-size: 2rem;
  font-weight: bold;
  border-radius: 1.5rem;
  cursor: pointer;
  background: #fff;
  color: #000000;
  border: 2px solid #000000;

  &:hover {
    background-color: #000000;
    color: white;
  }
`;
export const ButtonFav = styled.button`
  
  color: white;
  border: 1px solid lightgray;
  padding: 0.5rem 0.75rem;
  position: absolute;
  bottom: 10px;
  left: 40%;
  font-size: 1.5rem;
  &:hover {
    background-color: red;
    color: white;
  }
`;

export async function LoaderAlbum({ params }: { params: any }) {
  const userResponse = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.userId}`
  );
  const user: User = await userResponse.json();

  const albumResponse = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${params.albumId}`
  );
  const album: Albums[] = await albumResponse.json();
  console.log(album);

  const photosResponse = await fetch(
    `https://jsonplaceholder.typicode.com/albums/${params.albumId}/photos`
  );
  const photos: Photo[] = await photosResponse.json();
  return { album, user, photos };
}

const Album = () => {
  const { album, user, photos } = useLoaderData() as {
    album: Albums;
    user: User;
    photos: Photo[];
  };

  const {addPhoto, deleteFavoritePhoto,photos: favoritePhotos} = FavoritesStore((state) =>({
    addPhoto:state.addPhoto,
    deleteFavoritePhoto:state.deleteFavoritePhoto,
    photos:state.photos
  }))

const handleAddFavorites = (photo:Photo) => {

    const checkedFavorite = favoritePhotos.find((item) => item.id === photo.id )
    if(checkedFavorite){
      deleteFavoritePhoto(photo.id)
    }else{
      addPhoto(photo)
    }
    console.log(checkedFavorite)
  }
  const isFavorite = (photoId:number) => {
    return favoritePhotos.some(fav => fav.id === photoId)
  }

  return (
    <Container className="px-5">
      <Title>
        {album.title} by {user.username}
      </Title>
      <Name to={`/users/${user.id}`}>{user.username}</Name>
      <Row>
        {photos.map((photo) => (
          <Col className="my-5" xs="6" md="4" lg="3" key={photo.id}>
            <Card style={{ width: "200px", minHeight: "400px" }}>
              <Card.Img
                variant="top"
                src={photo.thumbnailUrl}
                alt={photo.title}
                style={{ width: "200px" }}
              />
              <Card.Body>
                <Card.Text className="mt-1">{photo.title}</Card.Text>
                <ButtonFav onClick={() =>handleAddFavorites(photo)}
                 style={{ backgroundColor: isFavorite(photo.id) ? 'red' : '', color: isFavorite(photo.id) ? 'white' : '' }}>
                  
                  <FaHeart />
                </ButtonFav>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Album;



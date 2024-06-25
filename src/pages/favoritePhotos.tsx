import { Card, Col, Container, Row } from "react-bootstrap";
import { FavoritesStore } from "../stores/favorites";
import { FaHeart } from "react-icons/fa6";
import { ButtonFav } from "./album";
import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";


const FavoritePhotos = () => {
    const photosFav = FavoritesStore((state) => state.photos)
    const deleteFavoritePhotos = FavoritesStore((state) => state.deleteFavoritePhoto)
    
    

    // const [albumData,setAlbumData] = useState({})

    // useEffect(() => {
    //   const fetcAlbumData = async () =>  {
    //     const albumIds = Array.from(photosFav.map(photo => photo.albumId))
    //     const albumPromises = albumIds.map( async(albumId) => {
    //       const response =  await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`)
    //       const data = await response.json()
    //       return data
    //     })
    //     const albums = await Promise.all(albumPromises)
    //     const albumMap= {};
    //     albums.forEach(album =>{
    //       albumMap[album.id] = album;
    //     })
    //     setAlbumData(albumMap)
    //   }
    //   fetcAlbumData()
    // } ,[photosFav])

    const deleteFav=(id:number) => {
        deleteFavoritePhotos(id)
    }
  return (
    <Container className="px-5">
    <Row>
    {photosFav.map((photo) => (
        
          <Col className="my-5" xs="6" md="4" lg="3" key={photo.id}>
            <Link to={``}>          
              <Card style={{ width: "200px", minHeight: "400px" }}>
              <Card.Img
                variant="top"
                src={photo.thumbnailUrl}
                alt={photo.title}
                style={{ width: "200px" }}
              />
              <Card.Body>
                <Card.Text className="mt-1">{photo.title}</Card.Text>
                <ButtonFav onClick={() =>deleteFav(photo.id)}
                 style={{ background:"red", color:"white" }}>
                  
                  <FaHeart />
                </ButtonFav>
              </Card.Body>
            </Card>
            </Link>
          </Col>
          
        ))}
    </Row>
    
    </Container>
  )
}

export default FavoritePhotos;
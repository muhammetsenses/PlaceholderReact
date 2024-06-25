import {Container, Nav, Navbar} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { FavoritesStore } from '../stores/favorites'
import { FaHeart } from 'react-icons/fa6'

export const Navigation = () => {

  const favoriteAlbums = FavoritesStore((state) => state.photos)
  const favoritePosts = FavoritesStore((state) => state.posts)
  return (
    <Navbar className='sticky-top' bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={NavLink} to="/" >Navbar</Navbar.Brand>
          <Nav className="ms-auto">
            
            <Nav.Link as={NavLink} to="/users" >Users</Nav.Link>
            <Nav.Link as={NavLink} to="/favoritePhotos" ><FaHeart/> Photos {favoriteAlbums.length}</Nav.Link>
            <Nav.Link as={NavLink} to="/favoritePosts" ><FaHeart/> Posts {favoritePosts.length}</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  )
} 

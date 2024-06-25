import { Button, Container } from "react-bootstrap"
import { FavoritesStore } from "../stores/favorites"
import styled from "styled-components"

const Content = styled(Container)`
border-radius:1rem;
color:white;
background: linear-gradient(
    90deg,
    #0c0c0c 0%,
    #585858 49%,
    #8a8989 100%
  );
`
const FavoritePosts = () => {

    const favPosts = FavoritesStore((state) => state.posts)
    const deleteFavPost = FavoritesStore((state) => state.deletePost)

    const handleDeletePost = (id:number) => {
        deleteFavPost(id)
    }
  return (
    <Container  className=" p-5">
        {favPosts.map((post) => (
            <Content className="border mb-4 py-3 text-center" key={post.id}>
                <h2>{post.title}</h2>
                <Button style={{background:"white", color:"black"}} onClick={() => handleDeletePost(post.id)}>Delete</Button>
            </Content>
        ))}
    </Container>
  )
}

export default FavoritePosts
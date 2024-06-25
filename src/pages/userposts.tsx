import { Button, Container } from "react-bootstrap";
import { Link, LoaderFunction, useLoaderData } from "react-router-dom";
import styled from "styled-components";
import { FavoritesStore } from "../stores/favorites";
import { FaHeart } from "react-icons/fa6";


export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-bottom: 1rem;
  `;

export const ListWrapper = styled.div`
  border: 1px solid black;
  margin-bottom: 1.5rem;
  border-radius: 1rem;
  padding: 2rem 1rem;
  
  background: linear-gradient(
    90deg,
    #0c0c0c 0%,
    #585858 49%,
    #8a8989 100%
  );
  color: white;
`;

const ListItem = styled.li`
  list-style: none;
`;

// interface params {
//   userId: string;
// }
interface Posts {
  id: number;
  userId: number;
  title: string;
  body: string;
}
export async function Loader({
  params,
}: {
  params: any;
}): Promise<LoaderFunction> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.userId}/posts`
  );
  const posts = await response.json();
  return posts;
}

const UserPosts = () => {
  const postes = useLoaderData() as Posts[];
  const { posts, addFavPost, deleteFavPost } = FavoritesStore((state) => ({
    posts: state.posts,
    addFavPost: state.addPost,
    deleteFavPost: state.deletePost,
  }));

  const handleAddFav = (post: Posts) => {
    const checkedFav = posts.find((item) => item.id === post.id);
    if (checkedFav) {
      deleteFavPost(post.id);
    } else {
      addFavPost(post);
    }
    console.log(checkedFav);
  };
  const isFavorite = (postId: number) => {
    return posts.some( fav => fav.id === postId);
  };

  return (
    <>
      <Wrapper>
        <Container className="text-center">
          <h1 className="py-5 text-white fw-bold">Posts</h1>
          <div>
            <ul>
              {postes.map((post) => (
                <ListWrapper key={post.id}>
                  <ListItem className="fw-bold mb-3">{post.title}</ListItem>
                  <ListItem style={{ color: "#e2dddd" }}>{post.body}</ListItem>
                  <div className="d-flex justify-content-center align-items-center mt-4 gap-4">
                    <Link to={`${post.id}`}>
                      <Button variant="light black" className="">
                        Comments
                      </Button>
                    </Link>
                    <Button variant="light"
                      onClick={() => handleAddFav(post)}
                      style={{
                        backgroundColor: isFavorite(post.id) ? "black" : "white",
                        color: isFavorite(post.id) ? "white" : "black",
                      }}
                    >
                      <FaHeart />
                    </Button>
                  </div>
                </ListWrapper>
              ))}
            </ul>
          </div>
        </Container>
      </Wrapper>
    </>
  );
};

export default UserPosts;

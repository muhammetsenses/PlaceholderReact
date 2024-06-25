import { useEffect, useState } from "react";
import { Link, useLoaderData, useParams } from "react-router-dom";
import styled from "styled-components";
import { FaSpinner, FaComment } from "react-icons/fa6";
import {  Wrapper } from "./userposts";

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}
interface User {
    id: number;
    name: string;
    email: string;
  }
interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}
// interface Params {
//     userId:string
// }
const PostDiv = styled.div`
  background: linear-gradient(
    90deg,
    #bbbaba 0%,
    #837f7f 49%,
    #8a8989 100%
  );;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid #ccc;
  border-radius: 1rem;
  color: white;
`;

const ListWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  border: 1px solid black;
  margin-bottom: 1.5rem;
  border-radius: 1rem;
  padding: 1%;
  background: linear-gradient(
    90deg,
    #0c0c0c 0%,
    #585858 49%,
    #8a8989 100%
  );
  color: white;
`;

const Loading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 50px;
`;

const LoadingItem = styled(FaSpinner)`
  color: #621c70;
  animation: spin 5s;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const User = styled(Link)`
padding:1rem;
background-color:#171817;
border-radius:1rem;
color:white;
cursor: pointer;
text-decoration:none;
font-weight:bold;
font-size:1.5rem;

`
export async function Loader({params}: {params:any}) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${params.userId}`)
    const users = response.json()
    return users
}


const Comments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const { postId } = useParams<{ postId: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [post, setPost] = useState<Post | null>(null);
  const {userId} = useParams<string>()

    const users = useLoaderData() as User

  useEffect(() => {
    const timer = setTimeout(async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
      );
      const comment = await response.json();
      setComments(comment);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [postId]);

  useEffect(() => {
    async function fetchPost() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      const post = await response.json();
      setPost(post);
      console.log(post);
    }
    fetchPost();
  }, [postId]);

  if (loading) {
    return (
      <Loading>
        <LoadingItem className="fs-1" />
      </Loading>
    );
  }

  return (
    <Wrapper>
      <div className="container py-5">
        <User to={`/users/${userId}`}>{users.name}</User>
        <h1 className="text-center mb-4 fw-bold ">Post</h1>
        {post && (
          <PostDiv>
            <h3 className="fw-bolder">{post.title}</h3>
            <p className="text-white">{post.body}</p>
          </PostDiv>
        )}
        <h2 className="text-center mb-5">Comments</h2>
        <div>
          {comments.map((comment) => (
            <ListWrapper key={comment.id}>
              <FaComment style={{height:"40px", width:"40px", marginLeft:"1rem"}} />
              <div>
                <h3 style={{ color: "white" }}>{comment.name}</h3>
                <p>{comment.body}</p>
              </div>
            </ListWrapper>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default Comments;

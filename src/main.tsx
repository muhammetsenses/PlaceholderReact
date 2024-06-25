import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import {
  RootLayout,
  HomePage,
  Users,
  UserDetails,
  UserPosts,
  UserAlbums,
  UserTodos,
  Comments,
  Album,
  FavoritePhotos,
  FavoritePosts,
} from "./pages";
import { Loader as UsersLoader } from "./pages/users";
import { Loader as UserDetailsLoader } from "./pages/user-details";
import { Loader as UsersPostsLoader } from "./pages/userposts";
import { Loader as UsersAlbumsLoader } from "./pages/useralbums";
import {Loader as UserPostCommentLoader} from "./pages/comments"
import { LoaderAlbum } from "./pages/album";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "users",
        element: <Users />,
        loader: UsersLoader,
      },
      {
        path: "users/:userId",
        children: [
          {
            index: true,
            element: <UserDetails />,
            loader: UserDetailsLoader,
          },
          {
            path: "posts",
            element: <UserPosts />,
            loader: UsersPostsLoader,
          },
          {
            path: "posts/:postId",
            children:[
              {
                index:true,
                element:<Comments/>,
                loader:UserPostCommentLoader
              }
            ]
          },
          {
            path: "albums",
            element: <UserAlbums />,
            loader: UsersAlbumsLoader,
          },
          {
            path:"albums/:albumId",
            element : <Album />,
            loader:LoaderAlbum
          },
          {
            path: "todos",
            element: <UserTodos />,
          },
        ],
      },
      {
        path:"favoritePhotos",
        element:<FavoritePhotos />
      },
      {
        path:"favoritePosts",
        element:<FavoritePosts />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);

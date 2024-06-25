import { create, StateCreator } from "zustand";
import { persist,PersistOptions  } from "zustand/middleware";

interface Photo {
    id: number;
    albumId: number;
    title: string;
    url: string;
    thumbnailUrl: string;
  }
  interface Posts {
    userId: number;
    id:number;
    title:string;
    body:string;
  }

  interface FavoritesStore {
    photos: Photo[];
    addPhoto: (photo: Photo) => void;
    deleteFavoritePhoto: (albumId: number) => void;
    posts: Posts[];
    addPost: (post: Posts) => void;
    deletePost: (id: number) => void;
  }
  type MyPersist = (
    config: StateCreator<FavoritesStore>,
    options: PersistOptions<FavoritesStore>
  ) => StateCreator<FavoritesStore>;

export const FavoritesStore = create<FavoritesStore>(
    
    (persist as MyPersist)(
        (set) => ({
            photos: [],
            addPhoto: (photo) => set((state) => ({
                photos: [...state.photos, photo]
            })),
            deleteFavoritePhoto: (id) => set((state) => ({
                photos: state.photos.filter((favorite) => favorite.id !== id),
            })),
            posts: [],
            addPost: (post) => set((state) => ({
              posts: [...state.posts, post]
            })),
            deletePost: (id: number) => set((state) => ({
              posts: state.posts.filter((post) => post.id !== id),
            }))
        }),
        {
            name: "favorite",
            getStorage: () => localStorage,
        }
    )
    );
import api from "@/services/api";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { socket } from "@/socket";
import { acQuery, acMutation } from "./ApolloClient";
import { useMainStore } from "@/store/MainStore";
import { GET_CATEGORIES, CREATE_POST, GET_POST, GET_POSTS, UPDATE_POST, DELETE_POST } from "@/services/queries/GraphqlQueries";
import type { CategoryDto, CreatePostDto, PostDto, ListPostDto } from "./dto/posts.dto";

export default {
  async getCategories(): Promise<CategoryDto[] | undefined> {
    const result = await acQuery(GET_CATEGORIES);
    return result ? result.data.categories as CategoryDto[] : undefined;
  },

  async create(payload: CreatePostDto): Promise<PostDto | undefined> {
    const result = await acMutation(CREATE_POST, { payload: payload });
    return result ? result.data.createPost as PostDto : undefined;
  },

  async get(_id: string): Promise<{ post: PostDto, categories: CategoryDto[] } | undefined> {
    const result = await acQuery(GET_POST, { _id: _id });
    return result ? result.data as { post: PostDto, categories: CategoryDto[] } : undefined;
  },

  async fetch(filters: ListPostDto | null = null): Promise<{ posts: PostDto[], categories: CategoryDto[] } | undefined> {
    const result = await acQuery(GET_POSTS, { filters: filters });
    return result ? result.data as { posts: PostDto[], categories: CategoryDto[] } : undefined;
  },

  async update(payload: PostDto): Promise<PostDto | undefined> {
    const result = await acMutation(UPDATE_POST, { payload: payload });
    return result ? result.data.updatePost as PostDto : undefined;
  },

  async delete(_id: string): Promise<PostDto | undefined> {
    const result = await acMutation(DELETE_POST, { _id: _id });
    return result ? result.data.deletePost as PostDto : undefined;
  },

  setImage(id: string, params: FormData) {
    return api().put(`posts/image/${id}`, params, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  async setImage2(id: string, file: File) {
    const response = await socket.timeout(5000).emitWithAck('uploadPostImage', { id: id, filename: file.name, buffer: file });
    if (response.result == "success") {
      return true;
    } else if (response.result == "error") {
      useMainStore().addToast({ severity: 'error', summary: 'Ошибка', detail: response.message, life: 5000 });
    }
    return false;
  },

  /*
    getImagePath(id: string) {
      const imagePath = `http://localhost:4400/posts/image/${id}`;
      return imagePath;
    },
  */

};

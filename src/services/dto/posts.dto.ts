export interface CategoryDto {
    _id: string;
    id?: number;
    name?: string;
    description?: string;
}

export interface CreatePostDto {
    title: string;
    description?: string;
    category: CategoryDto;
    filename?: string;
}

export interface PostDto extends CreatePostDto {
    _id: string;
    id?: number;
    //imagefile: string;
}

export interface ListPostDto {
    _id?: string;
    id?: number;
    title?: string;
    description?: string;
    category?: CategoryDto;
  }

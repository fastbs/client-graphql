/* export class ResourceActionDto {
    name : string;
    roles: number[];
} */
export type PermissionItemDto = {
    route: string;
    action: string;
}

export type ResourcePermissionDto = {
    action: string;
    allow: boolean;
}

export type ResourceDto = {
    resource: string;
}

export type LoginUserDto = {
    username: string;
    password: string;
}

export type CreateUserDto = {
    name: string;
    email: string;
    password: string;
}

export type CreatedUserDto = {
    _id: string
    name: string;
    email: string;
    roles: [number];
}

export type UserDto = {
    id: string;
    name: string;
    email: string;
    access_token: string;
}

export type MenuItemDto = {
    _id: string;
    id: number;
    name: string;
    route: string;
    icon: string;
    roles: number[];
    children: [{
        name: string;
        route: string;
        icon: string;
    }];
}

export type toField = {
    name: string;
}

export type Menu2ItemDto = {
    label: string;
    to?: toField;
    icon?: string;
    items?: Menu2ItemDto[];
}

export type typeGetMenu = {
    menu2: [Menu2ItemDto]
} | undefined;

export type UserInfoDto = {
    userId: string;
    username: string;
}

export type PermissionDto = {
    route: string;
    action: string;
}

//export default { ResourceActionDto, ResourcePermissionDto };
import type { DefaultContext } from "@apollo/client";
import { v4 as uuidv4 } from 'uuid';

//import api from "./api";
import { apolloClient, processErrors } from "./ApolloClient";
import { useMainStore } from "@/store/MainStore";
import type { ResourceDto, ResourcePermissionDto, LoginUserDto, UserDto, CreateUserDto, CreatedUserDto } from "./dto/users.dto";
import type { Menu2ItemDto, UserInfoDto, PermissionDto } from "./dto/users.dto";
import { WRONG_QUERY, CREATE_USER, LOGIN_USER, GET_MENU, GET_PERMISSIONS, GET_SESSION } from "./queries/GraphqlQueries";

export default {

  async createUser(payload: CreateUserDto): Promise<CreatedUserDto | undefined> {
    let ret: CreatedUserDto | undefined = undefined;
    const tag = uuidv4();
    await apolloClient.mutate({
      mutation: CREATE_USER,
      variables: {
        payload: payload,
        tag: tag,
      },
    }).then(
      result => {
        if (!processErrors(result, tag))
          ret = result.data.createUser as CreatedUserDto;
      }
    );
    /*
        }).then(
          result => {
            if (result.errors){
              console.log("result.errors[0]: ", result.errors[0]);
              //processError(result.errors[0], tag)
            } else {
              ret = result.data.createUser as CreatedUserDto
            }
          },
          error => processError(error, tag)
        );
    */
    return ret;
  },

  async loginUser(payload: LoginUserDto): Promise<UserDto | undefined> {
    let ret: UserDto | undefined = undefined;
    const tag = uuidv4();
    await apolloClient.mutate({
      mutation: LOGIN_USER,
      variables: {
        payload: payload,
        tag: tag,
      },
    },
    ).then(
      result => {
        if (!processErrors(result, tag))
          ret = result.data.login as UserDto;
      }
    );

    return ret;
  },

  async getMenu(): Promise<Menu2ItemDto[] | undefined> {
    let ret: Menu2ItemDto[] | undefined = undefined;
    const tag = uuidv4();
    await apolloClient.query({
      query: GET_MENU,
      variables: {
        tag: tag,
      },
      //context: {},
      fetchPolicy: 'network-only',
    }).then(
      result => {
        if (!processErrors(result, tag))
          ret = result.data.menu2 as [Menu2ItemDto];
      }
    );
    console.log("menu2: ", ret);
    return ret;
  },

  async getSession(): Promise<UserInfoDto | undefined> {
    let ret: UserInfoDto | undefined = undefined;
    const tag = uuidv4();
    await apolloClient.query({
      query: GET_SESSION,
      variables: {
        tag: tag,
      },
      fetchPolicy: 'network-only',
    }).then(
      result => {
        if (!processErrors(result, tag))
          ret = result.data.session as UserInfoDto;
      }
    );

    return ret;
  },

  async getPermissions(): Promise<[PermissionDto] | undefined> {
    let ret: [PermissionDto] | undefined = undefined;
    const tag = uuidv4();
    await apolloClient.query({
      query: GET_PERMISSIONS, //WRONG_QUERY,
      variables: {
        tag: tag,
      },
      fetchPolicy: 'network-only',
    }).then(
      result => {
        if (!processErrors(result, tag))
          ret = result.data.permissions as [PermissionDto];
      }
    );

    return ret;
  },

  async checkLogin() {
    const store = useMainStore();
    const s = await this.getSession();
    const p = await this.getPermissions();

    if (s == undefined || p == undefined || s.username == "unauthorized") {
      store.permissions = [];
      store.userName = "";
      store.userId = "";
      store.isLogged = false;
      window.localStorage.removeItem("auth");
    } else {
      store.permissions = p;
      store.userName = s.username;
      store.userId = s.userId;
      store.isLogged = true;
    }
  }

}


/* export default {
  registerUser(params: RegisterUserDto) {
    return api().post("users/register", params);
  },

  async checkUser() {
    return await api().get("users/check");
  },

  checkAction(resource: ResourcePermissionDto[], action: string) {
    const vr = resource.find((x) => x.action == action);
    return vr && vr.allow;
  },

  async checkResourceAction(resource: string, action: string) {
    try {
      const resp = await api().get(`users/permissions/${resource}`);
      if (resp.data.permissions.find((x: ResourcePermissionDto) => x.action == action).allow) {
        return true;
      }
    }
    catch {
      console.log("catch")
      return false;
    }

    console.log("return")

    return false;
  },
 
};
*/

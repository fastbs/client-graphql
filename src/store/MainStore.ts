import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import { useToast } from "primevue/usetoast";
import type { ToastMessageOptions } from "primevue/toast";

import { socket } from "@/socket";
import type { ApolloErrorDto } from "@/services/dto/apolloErrors.dto";
import type { PermissionItemDto } from "@/services/dto/users.dto";
import { Investigation } from "@/models/Investigation";

export const useMainStore = defineStore("main", () => {
  const config = ref({
    siteURL: "http://localhost:9000/",
    //ckeditorURL : "http://localhost:8300/ckeditor/ckeditor.js",
    postImagePath: "http://localhost:4400/posts/",
    attachmentsPath: "attachments/",
  });

  const isLogged = ref(false);
  const userId = ref("");
  const userName = ref("");

  const count = ref(0);
  const name = ref("Fastbs");
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    console.log("*** Count increased");
    count.value++
  }
  const Inv = ref(new Investigation);
  const permissions = ref<PermissionItemDto[]>([]);

  let apolloErrors = ref<ApolloErrorDto[]>([]);
  //let aec = reactive(apolloErrors);

  const toasts = ref<ToastMessageOptions[]>([]);


  function checkPermission(resource: string, action: string) {
    let result = false;
    permissions.value.forEach((item: PermissionItemDto) => {
      if (item.route == resource && item.action == action) {
        result = true;
      }
    });

    return result;
  }

  function getImagePath(id: string) {
    const imagePath = `http://localhost:4400/posts/image/${id}`;
    return imagePath;
  }

  const basis = [
    {
      name: "Устав",
      text: "действующий на основании Устава",
    }
    ,
    {
      name: "Доверенность",
      text: "действующий на основании доверенности №___ от __.__.20__",
    },
    {
      name: "Приказ",
      text: "действующий на основании приказа №___ от __.__.20__",
    },
    {
      name: "Положение",
      text: "действующий на основании положения о ____________  от __.__.20__",
    },

  ];


  function addApolloError(ae: ApolloErrorDto) {
    apolloErrors.value.push(ae);
  }

  function getApolloError(tag: string, remove: boolean = false) {
    const fi = apolloErrors.value.findIndex(x => x.tag == tag);
    if (fi > -1) {
      const fe = apolloErrors.value[fi]
      if (remove) {
        apolloErrors.value.splice(fi, 1);
      }
      return fe;
    } else {
      return undefined;
    }
  }

  function getApolloErrorsCount() {
    return apolloErrors.value.length;
  }

  function addToast(t: ToastMessageOptions) {
    //console.log("addToast: ", t);
    toasts.value.push(t)
    //console.log("toasts.value: ", toasts);
  }



  function bindWsEvents() {
    const toast = useToast();

    socket.on('connect', function () {
      console.log('*** WS *** Connected');
      toast.add({ severity: 'success', summary: 'WS', detail: "WS connected", life: 5000 });
      socket.emit('events', { test: 'test' }, (response: any) =>
        console.log('*** WS *** events response:', response),
      );
      socket.emit('identity', 12345, (response: any) =>
        console.log('*** WS *** Identity:', response),
      );
      socket.emit('fbs', { num: 777, str: "my str" }, (response: any) =>
        console.log('*** WS *** FBS:', response),
      );
    });

    socket.on('events', function (data) {
      console.log('*** WS *** event', data);
      toast.add({ severity: 'success', summary: 'WS', detail: "WS event: " + data, life: 5000 });
    });

    socket.on('exception', function (data) {
      console.log('*** WS *** event', data);
    });

    socket.on('disconnect', function () {
      console.log('*** WS *** Disconnected');
      toast.add({ severity: 'error', summary: 'WS', detail: "WS disconnected", life: 5000 });

    });
  }

  return {
    config, isLogged, userId, userName, count, name, doubleCount, Inv, basis, permissions, toasts, apolloErrors,
    increment, checkPermission, getImagePath, addApolloError, getApolloError, addToast, bindWsEvents,
    getApolloErrorsCount,
  };
})
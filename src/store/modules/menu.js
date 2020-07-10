import { getMenu, getPermissions } from "@/api/sys/menu.js";
import { generateRoutes } from "@/libs/util.js";
import router from "@/router/index.js";

export default {
  state: {
    asideMenu: [],
    headerMenu: [],
    activeMenu: {},
    isCollapse: false,
    perms: [],
    perm: {}
  },
  getters: {
    asideMenu: state => state.asideMenu,
    headerMenu: state => state.headerMenu,
    activeMenu: state => state.activeMenu,
    isCollapse: state => state.isCollapse,
    perms: state => state.perms,
    perm: state => state.perm
  },
  actions: {
    async getMenu({ commit, state }) {
      await getMenu().then(res => {
        const routes = generateRoutes(res);
        router.addRoutes(routes);
        commit("SET_HEADER_MENU", routes);
        if (!state.asideMenu.length) {
          commit("SET_ASIDE_MENU", routes[0].children);
        }
      });
      await getPermissions().then(res => {
        commit("SET_PERMS", res);
      });
    }
  },
  mutations: {
    SET_ASIDE_MENU(state, data) {
      if (data?.length) {
        state.asideMenu = data;
      } else if (state.headerMenu.length) {
        state.asideMenu = state.headerMenu[0].children;
      }
    },
    SET_HEADER_MENU(state, data) {
      state.headerMenu = data;
    },
    CHANGE_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse;
    },
    SET_PERMS(state, data) {
      state.perms = data;
      const perm = {};
      data.forEach(item => {
        perm[item] = true;
      });
      state.perm = perm;
    },
    SET_ACTIVE_MENU(state, data) {
      state.activeMenu = data;
    }
  }
};

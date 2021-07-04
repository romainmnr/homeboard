import { ActionContext } from 'vuex'


declare interface GlobalState
{

  userProfile: any
  pages: Array<any>
  page: any
  isMainOverlayShown: boolean
  isSelectRoomDialogShown: boolean
  
}

declare type GlobalActionContext = ActionContext<GlobalState, {}>

const state = () => ({
  userProfile: {},
  pages: [],
  page: {},
  isMainOverlayShown: false,
  isSelectRoomDialogShown: false
  
})

// getters
const getters = {
  getUserProfile: (state: GlobalState) => state.userProfile,
  getPages: (state: GlobalState) => state.pages,
  getPage: (state: GlobalState) => state.page,
  isMainOverlayShown: (state: GlobalState) => state.isMainOverlayShown,
  isSelectRoomDialogShown: (state: GlobalState) => state.isSelectRoomDialogShown,
}

// mutations
const mutations = {
  setUserProfile (state: GlobalState, data: any) {
    state.userProfile = data
  },
  setPageList(state: GlobalState, data: any) {
    state.pages = data
  },
  setCurrentPage(state: GlobalState, data: any) {
    state.page = data
  },
  setMainOverlayStatus(state: GlobalState, data: any) {
    state.isMainOverlayShown = data
  },
  setSelectRoomDialogState(state: GlobalState, data: any) {
    state.isSelectRoomDialogShown = data
  },

}

// actions
const actions = {

  clickMainOverlay(context: GlobalActionContext)
  {
    context.commit('setMainOverlayStatus', false)

  }
  
}



export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
}
// store.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [], // This will store the shared data
  },
  mutations: {
    setItems(state, items) {
      state.items = items;
    },
    updateStatus(state, { docId, status }) {
      const index = state.items.findIndex((item) => item._id === docId);
      if (index !== -1) {
        state.items[index].status = status;
      }
    },
  },
});

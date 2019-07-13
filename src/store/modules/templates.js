import { fetchCollection, AddData, DeleteData } from '../firebase';

const templateStore = {
  state: {
    templates: [],
  },
  mutations: {
    updateTemplates(state, pollList) {
      state.templates = pollList;
    },
    pushTemplate(state, template) {
      const pollList = [...state.templates, template];
      state.templates = pollList;
    },
    dropTemplate(state, pollId) {
      const filteredList = state.templates.filter(x => x.id !== pollId);
      state.templates = filteredList;
    },
  },
  actions: {
    async fetchTemplates({ commit }) {
      const fetchedtemplates = await fetchCollection('templates');
      try {
        commit('updateTemplates', fetchedtemplates);
      } catch (err) {
        throw err;
      }
    },
    async addTemplate({ commit }, template) {
      const pollId = await AddData('templates', template);
      try {
        template.id = pollId;
        commit('pushTemplate', template);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteTemplate({ commit }, pollId) {
      await DeleteData('templates', pollId);
      try {
        commit('dropTemplate', pollId);
      } catch {
        console.log('could not delete Data');
      }
    },
  },
};
export default templateStore;

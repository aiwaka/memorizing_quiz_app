import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tags: [
      {
        id: 0,
        name: "chapter1",
      },
      {
        id: 1,
        name: "chapter2",
      }
    ],
    problemData: [
      {
        question: "問題1",
        questionType: 0,
        answer: ["答え1"],
        description: "説明1",
        tags: [0],
      },
      {
        question: "問題2",
        questionType: 0,
        answer: ["答え2"],
        description: "説明2",
        tags: [0,1],
      }
    ]
  },
  mutations: {

  },
  actions: {

  }
})

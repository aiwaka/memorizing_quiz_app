import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    labels: [
      {
        id: 0,
        text: "chapter1",
      },
      {
        id: 1,
        text: "chapter2",
      }
    ],
    problemData: [
      {
        id: 0,
        question: "問題1",
        questionType: 0,
        answer: ["答え1"],
        description: "説明1",
        labelIds: [0],
      },
      {
        id: 1,
        question: "問題2",
        questionType: 0,
        answer: ["答え2"],
        description: "説明2",
        labelIds: [0,1],
      }
    ],
    nextQuizId: 2,
    nextLabelId: 2,
    filter: null,
    quizNum: null,
    randomize: true,
  },
  getters: {
    // getterではstateから算出したプロパティを返している.
    filteredQuiz(state) {
      // filterがnullならproblemDataをそのまま返す
      if (!state.filter) {
        return state.problemData
      }
      return state.problemData.filter(quiz => {
        // labelIds配列でfilterの値の添字を検索する. 存在すれば0以上が返るのでその場合trueになるようにしてfilteringする.
        return quiz.labelIds.indexOf(state.filter) >= 0
      })
    }
  },
  mutations: {
    quizInit(state, {quizNum, randomize}) {
      state.quizNum = quizNum
      state.randomize = randomize
    },
    addProblem(state, { question, questionType, answer, description, labelIds }) {
      state.problemData.push({
        id: state.nextQuizId,
        question,
        questionType,
        answer,
        description,
        labelIds,
      })

      state.nextQuizId++
    },
    addLabel(state, { text }) {
      state.labels.push({
        id: state.nextLabelId,
        text
      })
      state.nextLabelId++
    },

    changeFilter(state, { filter }) {
      state.filter = filter
    },

    restore(state, { problemData, labels, nextQuizId, nextLabelId }) {
      state.problemData = problemData
      state.labels = labels
      state.nextQuizId = nextQuizId
      state.nextLabelId = nextLabelId
    }
  },
  actions: {
    save({ state }) {
      const data = {
        problemData: state.problemData,
        labels: state.labels,
        nextQuizId: state.nextQuizId,
        nextLabelId: state.nextLabelId
      }
      localStorage.setItem('quiz-app-data', JSON.stringify(data))
    },

    restore({ commit }) {
      const data = localStorage.getItem('quiz-app-data')
      if (data) {
        commit('restore', JSON.parse(data))
      }
    }
  }
})

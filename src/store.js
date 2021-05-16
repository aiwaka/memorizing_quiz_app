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
        question: "以下の薬物について, 適応・作用機序・投与経路・副作用・相互作用の有無・禁忌・注意点・同作用機序の関連類似薬・その他周辺事項について, 枠内で答えなさい. -> ヒドロクロロチアジド：この薬物は（１）に分類され、（２）があり、（３）し、高血圧治療においては第一選択薬のひとつである。作用機序としては、（４）であり、その結果水の再吸収が抑制され、抹消循環血液量が減少する。（５）があり、また尿酸値や血糖値が上昇しやすく、脂質代謝障害が起きやすいことから（６）、脂質異常症の患者には使いにくいが、効き目がマイルドなので高齢者にも用いやすい。関連類似薬として（７）がある。",
        questionType: 1,
        answer: ["チアジド系利尿薬", "高血圧・うっ血性心不全・浮腫に適応", "降圧作用が長時間持続", "遠位尿細管のNa+-Cl共輸送体阻害", "副作用として低K+血症", "高尿酸血症や糖尿病（耐糖能異常）", "トリクロルメチアジドやチアジド系類似薬のインダパミド・トリパミド"],
        misc: null,
        description: "説明1",
        labelIds: [0],
      },
      {
        id: 1,
        question: "次の薬物のうち、アセタゾラミドの適応疾患として正しくないものはどれか。",
        questionType: 2,
        answer: [2],
        misc: ["てんかん", "緑内障", "高血圧", "心性浮腫", "肝性浮腫"],
        description: "説明2",
        labelIds: [0,1],
      }
    ],
    nextQuizId: 2,
    nextLabelId: 2,
    filter: null,
    quizNum: null,
    randomize: true,

    quizQueue: [],
    nextQuiz: null,
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
    },
    quizQueue(state) {
      return state.quizQueue
    },
  },
  mutations: {
    quizInit(state, {quizNum, randomize, filteredQuizSet}) {
      // 問題数, 乱数を受け取り問題のキューを作る. stateのquizQueueにセットする.
      state.quizNum = quizNum
      state.randomize = randomize
      if (randomize) {
        let randomArray = []
        Object.assign(randomArray, filteredQuizSet)
        for (let i=randomArray.length; 1<i; i--) {
          let k = Math.floor(Math.random() * i);  // 0 から i-1 までの乱数を生成
          [randomArray[k], randomArray[i-1]] = [randomArray[i-1], randomArray[k]];
        }
        Object.assign(state.quizQueue, randomArray.slice(0,quizNum))
      } else {
        Object.assign(state.quizQueue, filteredQuizSet.slice(0,quizNum))
      }
    },
    popQuiz(state) {
      state.nextQuiz = state.quizQueue.shift()
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

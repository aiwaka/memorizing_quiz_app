<template>
  <div class="quiz">
    <h1>Quiz</h1>
    <div v-if="status===0">
      <QuizStart v-on:start="start()"></QuizStart>
    </div>
    <div v-if="status===1">
      <QuizBlock :quizData="nextQuiz" v-on:next="next"></QuizBlock>
    </div>
    <div v-if="status===2">
      <QuizResult :correctNum="correctNum" v-on:restart="restart()"></QuizResult>
    </div>
  </div>
</template>

<script>
import QuizBlock from '@/components/QuizBlock.vue'
import QuizStart from '@/components/QuizStart.vue'
import QuizResult from '@/components/QuizResult.vue'
export default {
    components: {
        QuizBlock,
        QuizStart,
        QuizResult,
    },
    data: () => {
      return {
        status: 0,
        correctNum: 0,
      }
    },
    computed: {
      quizData() {
        return this.$store.state.quizQueue
      },
      nextQuiz() {
        return this.$store.state.nextQuiz
      }
    },
    methods: {
      start() {
        this.status = 1
        this.correctNum = 0
        this.$store.commit('popQuiz')
      },
      next(obj) {
        this.correctNum += obj.correctness ? 1 : 0
        if (this.quizData.length === 0) {
          this.end()
        } else {
          this.$store.commit('popQuiz')
        }
      },
      end() {
        this.status = 2
      },
      restart() {
        this.status = 0
      }
    }
}
</script>
<template>
  <div class="quiz">
    <h1>Quiz</h1>
    <div v-if="status===0">
      <QuizStart v-on:start="start()"></QuizStart>
    </div>
    <div v-if="status===1">
      <QuizBlock v-for="(quiz, index) in quizData" :key="index" :quizData="quiz"></QuizBlock>
    </div>
    <div v-if="status===2">
      <QuizResult></QuizResult>
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
      }
    },
    methods: {
      start() {
        this.status = 1
      }
    }
}
</script>
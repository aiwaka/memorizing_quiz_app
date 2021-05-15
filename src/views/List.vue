<template>
  <div class="list">
    <h1>List</h1>
    <QuizBlock v-for="(quiz, index) in quizData" :key="index" :quizData="quiz"></QuizBlock>
  </div>
</template>

<script>
import QuizBlock from '@/components/QuizBlock.vue'
export default {
    components: {
        QuizBlock,
    },
    computed: {
      quizData() {
        return this.$store.state.problemData
      }
    }
}
</script>
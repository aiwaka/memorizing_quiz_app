<template>
    <div class="quiz-block">
        <QuizOneAnswer v-if="quizData.questionType==0" :quizData="quizData"></QuizOneAnswer>
    </div>
</template>

<script>
import QuizOneAnswer from '@/components/QuizOneAnswer.vue'
export default {
    components: {
        QuizOneAnswer,
    },
    props: {
        quizData: {
           type: Object,
           required: true
        }
    }
}
</script>
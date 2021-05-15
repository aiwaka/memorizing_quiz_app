<template>
    <div class="quiz-block">
        <QuizOneAnswer
            v-if="quizData.questionType==0"
            :quizData="quizData"
            v-on:next="next"
        />
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
    },
    methods: {
        next({correctness}) {
            this.$emit('next', {
                correctness
            })
        }
    }
}
</script>
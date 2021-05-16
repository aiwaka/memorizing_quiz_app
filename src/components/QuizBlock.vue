<template>
    <div class="quiz-block">
        <QuizOneAnswer
            v-if="parseInt(quizData.questionType)===0"
            :quizData="quizData"
            v-on:next="next"
        />
        <quiz-filling
            v-if="parseInt(quizData.questionType)===1"
            :quizData="quizData"
            v-on:next="next"
        />
        <quiz-select
            v-if="parseInt(quizData.questionType)===2"
            :quizData="quizData"
            v-on:next="next"
        />
    </div>
</template>

<script>
import QuizOneAnswer from '@/components/QuizOneAnswer.vue'
import QuizFilling from '@/components/QuizFilling.vue'
import QuizSelect from '@/components/QuizSelect.vue'
export default {
    components: {
        QuizOneAnswer,
        QuizFilling,
        QuizSelect,
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
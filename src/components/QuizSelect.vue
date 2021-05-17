<template>
    <div class="quiz-select">
        <v-card class="mb-4 pa-4" elevation="0">
            <h2>問題</h2>
            <p>{{quizData.question}}</p>
            <v-form>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-btn-toggle v-model="userInput">
                                <v-btn v-for="(opt, index) in quizData.misc" :key="index">{{opt}}</v-btn>
                            </v-btn-toggle>
                        </v-col>
                        <v-col cols="2">
                            <v-btn
                                rounded
                                text
                                outlined
                                v-on:click="check()"
                                :disabled="answered"
                            >Check</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
            <answer-card
                v-if="answered"
                :corrected="corrected"
                :description="quizData.description"
                :answer="quizData.misc[quizData.answer[0]]"
                v-on:next="next()"
            ></answer-card>
        </v-card>

    </div>
</template>

<script>
import AnswerCard from './AnswerCard.vue';
export default {
    components: {
        AnswerCard
    },
    data: () => {
        return {
            userInput: null,
            corrected: false,
            answered: false,
        };
    },
    props: {
       quizData: {
           type: Object,
           required: true,
       }
   },
   watch: {
       // eslint-disable-next-line no-unused-vars
       quizData(newVal, oldVal) {
           this.init()
       }
   },
   methods: {
       init() {
           this.userInput = null
           this.corrected = false
           this.answered = false
       },
       check() {
           this.answered = true
           this.corrected = this.quizData.answer[0] === this.userInput
       },
       next() {
           this.$emit('next', {correctness: this.corrected})
       }
   }
}
</script>
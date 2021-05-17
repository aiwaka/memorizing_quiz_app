<template>
    <div class="quiz-filling">
        <v-card class="mb-4 pa-4" elevation="0">
            <h2>問題</h2>
            <p>{{quizData.question}}</p>
            <v-form>
                <v-container>
                    <v-row v-for="(answer, index) in quizData.answer" :key="index">
                        <v-text-field label="Answer" v-model="userInput[index]"/>
                    </v-row>
                    <v-row>
                        <v-btn
                            rounded
                            text
                            outlined
                            v-on:click="check()"
                            :disabled="answered"
                        >Check</v-btn>
                    </v-row>
                </v-container>
            </v-form>
            <answer-card
                v-if="answered"
                :corrected="corrected"
                :description="quizData.description"
                :answer="answerStr"
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
            userInput: new Array(20),
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
   computed: {
       answerStr() {
           let result = ''
           let i = 1
           for (let ans of this.quizData.answer) {
               result += i++ + '. ' + ans + '    '
           }
           return result
       }
   },
   methods: {
        init() {
            this.userInput = new Array(20)
            this.corrected = false
            this.answered = false
        },
       check() {
           this.answered = true
           let existError = false
           for (let i=0; i<this.quizData.answer.length; i++) {
               existError = !(this.quizData.answer[i] === this.userInput[i])
               if (existError) {
                   break
               }
           }
           this.corrected = !existError
       },
       next() {
           this.$emit('next', {correctness: this.corrected})
       }
   }
}
</script>
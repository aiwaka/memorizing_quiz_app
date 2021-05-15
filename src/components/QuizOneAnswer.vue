<template>
    <div class="quiz-one-answer">
        <v-card class="mb-4 pa-4" elevation="0">
            <h2>問題</h2>
            <p>{{quizData.question}}</p>
            <v-form>
                <v-container>
                    <v-row>
                        <v-col cols="4">
                            <v-text-field label="Answer" v-model="userInput"/>
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
            <v-card v-if="answered" class="ma-4">
                <v-card-title v-if="corrected" class="red--text">正解</v-card-title>
                <v-card-title v-else class="blue--text">不正解</v-card-title>
                <v-card-actions>
                    <v-btn text color="teal accent-4" v-on:click="revealDesc=true">解説</v-btn>
                </v-card-actions>
                <v-expand-transition>
                    <v-card
                        v-if="revealDesc"
                        class="transition-fast-in-fast-out v-card--reveal"
                        style="height: 100%"
                    >
                        <v-card-text class="pb-0">{{quizData.description}}</v-card-text>
                        <v-card-actions class="pt-0">
                            <v-btn text color="teal accent-4" v-on:click="revealDesc=false">閉じる</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-expand-transition>
                <v-card-actions>
                    <v-btn
                        rounded
                        text
                        outlined
                        v-on:click="next()"
                    >Next</v-btn>
                </v-card-actions>
            </v-card>
        </v-card>

    </div>
</template>

<script>
export default {
    data: () => {
        return {
            userInput: null,
            corrected: false,
            revealDesc: false,
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
           this.revealDesc = false
           this.answered = false
       },
       check() {
           this.answered = true
           this.corrected = this.quizData.answer[0] === this.userInput
           if(this.corrected) {
               this.revealDesc = false
           } else {
               this.revealDesc = true
           }
       },
       next() {
           this.$emit('next', {correctness: this.corrected})
       }
   }
}
</script>
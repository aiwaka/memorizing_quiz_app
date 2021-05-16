<template>
    <div class="quiz-start">
        <v-card>
            <v-card-title>問題を絞り込み, 問題数を選択してください</v-card-title>
            <v-btn-toggle v-model="toggleFilter" mandatory>
                <v-btn class="text-caption"
                    v-for="label in labels"
                    :key="label.id"
                    :value="label.id"
                >{{label.text}}</v-btn>
                <v-btn class="text-caption" :value="null">No Filter</v-btn>
            </v-btn-toggle>
            <v-card-text>問題総数：{{maxQuizNum}}</v-card-text>
            <v-slider
                class="ma-6"
                v-model="quizNum"
                min="1" :max="maxQuizNum"
                :disabled="maxQuizNum === 0"
                label="Number of Quiz"
            >
            </v-slider>
            <v-card-subtitle>問題数：{{quizNum}}</v-card-subtitle>
            <v-checkbox v-model="randomize" label="Randomize"></v-checkbox>
            <v-card-actions>
                <v-btn :disabled="maxQuizNum===0" v-on:click="start()">
                    スタート
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            quizNum: 1,
            randomize: false,
            filter: null,
        }
    },
    computed: {
        maxQuizNum() {
            return this.$store.getters.filteredQuiz.length
        },
        toggleFilter: {
            get() {
                return this.filter
            },
            set(id) {
                this.changeFilter(id)
            }
        },
        labels() {
            return this.$store.state.labels;
        },
    },
    methods: {
        start() {
            this.$store.commit('quizInit', {
                quizNum: this.quizNum,
                randomize: this.randomize,
                filteredQuizSet: this.$store.getters.filteredQuiz,
            })
            this.$emit('start')
        },
        changeFilter(id) {
            if (id === this.$store.state.labels.length) {
                this.$store.commit('changeFilter', {
                    filter: null
                })
            } else {
                this.$store.commit('changeFilter', {
                    filter: id
                })
            }
        }
    }
}
</script>
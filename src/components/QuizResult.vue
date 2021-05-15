<template>
    <div class="quiz-end">
        <v-card>
            <v-card-title>終了</v-card-title>
            <v-card-text>{{correctNum}}問正解！</v-card-text>
            <v-card-text>もう一度？</v-card-text>
            <v-card-actions>
                <v-btn v-on:click="restart()">
                    スタート
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
export default {
    components: {
    },
    data: () => {
        return {
        }
    },
    props: {
        correctNum: {
            type: Number,
        }
    },
    methods: {
        restart() {
            this.$emit('restart')
        },
    }
}
</script>
<template>
    <v-card class="ma-4">
        <v-card-title v-if="corrected===true" class="red--text">正解</v-card-title>
        <v-card-title v-else class="blue--text">不正解</v-card-title>
        <v-card-text>正解：{{answer}}</v-card-text>
        <v-card-actions>
            <v-btn text color="teal accent-4" v-on:click="revealDesc=true">解説</v-btn>
        </v-card-actions>
        <v-expand-transition>
            <v-card
                v-if="revealDesc"
                class="transition-fast-in-fast-out v-card--reveal"
                style="height: 100%"
            >
                <v-card-text class="pb-0">{{description}}</v-card-text>
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
</template>

<script>
export default {
    data: () => {
        return {
            revealDesc: false,
        };
    },
    props: {
        corrected: {
            type: Boolean,
        },
        answer: {
            type: String,
        },
        description: {
            type: String,
        }
    },
    methods: {
        next() {
            this.$emit('next')
        }
    }
}
</script>
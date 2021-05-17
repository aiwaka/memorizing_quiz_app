<template>
  <div class="labels">
    <h1>Labels</h1>
    <v-row>
      <v-col cols="6">
        <v-text-field v-model="newLabelText"></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-btn v-on:click="addNewLabel">Add</v-btn>
      </v-col>
    </v-row>
    <v-list shaped>
      <v-list-item-group multiple v-model="checkedLabels">
        <v-list-item
          v-for="label in labels"
          :key="label.id"
          :value="parseInt(label.id)"
          active-class="deep-purple--text text--accent-4"
        >
          <template v-slot:default="{active}">
            <v-list-item-content>
              <v-list-item-title v-text="label.text"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-checkbox
                :input-value="active"
                color="deep-purple accent-4"
              ></v-checkbox>
            </v-list-item-action>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <div>{{checkedLabels}}</div>
    <v-btn v-on:click="deleteLabels">Delete Selected</v-btn>
  </div>
</template>

<script>
export default {
    data: () => {
        return {
            newLabelText: '',
            checkedLabels: [],
        }
    },
    computed: {
      labels() {
        return this.$store.state.labels
      }
    },
    methods: {
      addNewLabel() {
        this.$store.commit('addLabel', {
          text: this.newLabelText
        })
        this.newLabelText = ''
      },
      deleteLabels() {
        if (this.checkedLabels.length === 0) {
          alert('ラベルが選択されていません.')
          return
        }
        this.$store.commit('deleteLabels', {
          labelIds: this.checkedLabels
        })
      }
    }
}
</script>
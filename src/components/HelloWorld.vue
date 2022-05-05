<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import {Protectant} from './model'
import {fetchDataInJunks} from './api'

const protectants = ref<Protectant[]>([])

onMounted(async () => {
  protectants.value = await fetchDataInJunks()
  console.log(protectants)
})

</script>

<template>
  <div v-for="p in protectants" :key="p.kennr">
    {{p.mittelname}}
  </div>
</template>

<style scoped>
</style>

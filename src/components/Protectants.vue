<script setup lang="ts">
import {onMounted, reactive, ref, VueElement} from 'vue'
import {Protectant, HazardSymbol} from './model'
import {fetchDataInJunks, fetchHazardSymbols} from './api'

const protectants = ref<Protectant[]>([])
const hazardSymbols = reactive<{[name: string]: HazardSymbol[]}>({})

onMounted(async () => {
  protectants.value = await fetchDataInJunks()
})

async function fetchSymbols (id: string) {
  const symbols = await fetchHazardSymbols(id)
  hazardSymbols[id] = symbols
}

</script>

<template>
  <div v-for="p in protectants" :key="p.kennr">
    <a href="#" @click="fetchSymbols(p.kennr)">{{p.mittelname}}</a> {{p.kennr}}
    <div>Erstzulassung: {{new Date(p.zul_erstmalig_am).toDateString()}}</div> <div>Zulassungsende: {{new Date(p.zul_ende).toDateString()}}</div>
    <code><div v-if="hazardSymbols[p.kennr] && hazardSymbols[p.kennr].length === 0">no hazards known</div></code>
    <div v-for="(symbol, i) in hazardSymbols[p.kennr]" :key="i">
      <code>{{symbol.code}} | {{symbol.text}}</code>
    </div>
  </div>
</template>

<style scoped>
</style>

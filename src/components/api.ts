import {Protectant, ProtectantResult, HazardSymbol} from './model'

export async function fetchDataInJunks () : Promise<Protectant[]> {
    let data = [] as Protectant[]
    let fetchOffset = null
    let fetchMore = false
    do {
        let result = {} as ProtectantResult
        result = await fetchPsm(fetchOffset)
        data = data.concat(result.items)
        fetchOffset = result.count + result.offset
        // fetchMore = result.hasMore
    } while (fetchMore)
    return data
}

async function fetchPsm(offset : Number | null) : Promise<ProtectantResult> {
    const baseUrl = 'https://psm-api.bvl.bund.de/ords/psm/api-v1/mittel/' 
    const url = offset ? `${baseUrl}?offset=${offset}` : baseUrl
    const response = await fetch(url)
    const data = response.json()
    return data
}

export async function fetchHazardSymbols(id : string) : Promise<HazardSymbol[]> {
    const response = await fetch(`https://psm-api.bvl.bund.de/ords/psm/api-v1/mittel_gefahren_symbol/?kennr=${id}`)
    const symbols = await response.json() // e.g. N

    const actions = symbols.items.map(x => getCodeText(x.gefahren_symbol, 40))
    const symbolText = await Promise.all(actions) // e.g. Umweltschädlich

    return symbolText.map(x => {
        return {code: x.items[0].kode, text: x.items[0].kodetext}
    })
}

async function getCodeText (code : string, list : Number) {
    const response = await fetch(`https://psm-api.bvl.bund.de/ords/psm/api-v1/kode/?kode=${code}&kodeliste=${list}&sprache=DE`)
    return response.json()
}
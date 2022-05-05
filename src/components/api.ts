import {Protectant, ProtectantResult} from './model'

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

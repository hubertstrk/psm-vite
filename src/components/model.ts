interface ProtectantResult {
  items: Protectant[]
  count: number
  offset: number
  hasMore : Boolean
}

interface Protectant {
  formulierung_art: string
  kennr: string
  mittelname: string
  zul_ende: Date
  zul_erstmalig_am: Date
}

export type {
  ProtectantResult,
  Protectant
}
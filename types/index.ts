export interface Product {
  id: string
  name: string
  price: number
  origin: string
  cacao: number
  tastingNotes: string
  description: string
  image: string
}

export interface CartItem extends Product {
  quantity: number
}
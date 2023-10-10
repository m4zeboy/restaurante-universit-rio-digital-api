import { prisma } from '@/lib/prisma'
import { Dish } from '@prisma/client'
import { randomUUID } from 'node:crypto'

const today = new Date()

const dishes: Dish[] = []
for (let i = 0; i < 20; i++) {
  // Cria um objeto para representar o menu do dia
  const menuItem = {
    id: randomUUID(),
    main_dish: 'Prato Principal',
    vegan_main_dish: 'Prato Principal Vegano',
    follow_up: 'Acompanhamento',
    base_dish: 'Prato de Base',
    salad: 'Salada',
    dessert: 'Sobremesa',
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + i),
  }

  dishes.push(menuItem)
}

prisma.dish
  .createMany({
    data: dishes,
  })
  .catch((err) => console.log(err))

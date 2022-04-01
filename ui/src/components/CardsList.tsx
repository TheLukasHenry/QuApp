import React from 'react'
import ModalCard from './ModalCard'

export default function CardsList() {
  return (
    <div className={'container'}>
      <div className={'row'}>
        {[1, 2, 3, 4, 5, 6].map((card) => (
          <ModalCard key={card} />
        ))}
      </div>
    </div>
    // <ModalCard />
  )
}

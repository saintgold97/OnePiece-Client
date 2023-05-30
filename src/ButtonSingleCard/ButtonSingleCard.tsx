import React from 'react'
import { Button } from 'react-bootstrap'
import './ButtonSingleCard.css'

interface ButtonSingleProps{
    onClickEdit: () => void
    onClickDelete: () => void
}

const ButtonSingleCard: React.FC<ButtonSingleProps> = ({onClickEdit, onClickDelete}) => {
  return (
    <div className='button-single'>
        <Button onClick={onClickEdit} variant='secondary'>Edit</Button>
        <Button onClick={onClickDelete} variant='secondary'>Delete</Button>
    </div>
  )
}

export default ButtonSingleCard
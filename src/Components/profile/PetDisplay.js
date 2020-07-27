import React from 'react'

import PetCard from './PetCard';
export default function PetDisplay(props) {
    const {pets} =props;

    
    console.log(pets)
    return (
        <div>
            {pets.map(pet=><PetCard pet={pet}></PetCard>)}
        </div>
    )
}
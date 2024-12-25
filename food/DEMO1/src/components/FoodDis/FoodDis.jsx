import React, { useContext } from 'react'
import './FoodDis.css'
import {StoreContext} from '../context/StoreContext'
import Fooditem from '../FoodItem/Fooditem'

const FoodDis = ({category}) => {

    const {food_list} = useContext(StoreContext)

  return (
    <div className='food-display' id='food_display'>
       <h2></h2>
       <div className="food-display-list">
        {food_list.map((item, index)=>{
          if (category==="All" || category===item.category){
            return <Fooditem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>      
          }
          
      })}
       </div>
    </div>
  )
}

export default FoodDis
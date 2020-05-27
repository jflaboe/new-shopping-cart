import React, { useRef, useEffect, useState } from 'react'
import { GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import ProductCard from './ProductCard';

export default function ProductCardList(props){
    const ref = useRef(null);
    const [cardSize, setCardSize] = useState(250);
    const spacing = 10;
    const max_cards = 4;
    const max_card_width = 250;
    const min_card_width = 150; 
    useEffect(() => {
        function handleResize() {
            if (ref.current.offsetWidth < min_card_width){
                setCardSize(min_card_width);
            }
            else {
                var max_num_cards = Math.floor(ref.current.offsetWidth / min_card_width);
                if (max_num_cards > max_cards) {
                    setCardSize(Math.min(max_card_width, ref.current.offsetWidth / max_cards));

                } else {
                    setCardSize(ref.current.offsetWidth / max_num_cards);
                }
            }

        }
        console.log('width', ref.current ? ref.current.offsetWidth : 0);
        window.addEventListener('resize', handleResize)
    }, [ref.current]);
    return (
        <GridList ref={ref}>
            {props.data.map((product) =>{
               return (
               <ProductCard inventory={props.inventory[product.sku]} addItem={props.addItem} key={product.sku} data={product} cardWidth={cardSize}/>)
            })}
            
        </GridList>
    )
}
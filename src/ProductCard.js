import React from 'react';
import { Card, Typography, Grid, GridListTile, GridListTileBar, Container, Button } from '@material-ui/core';

export default function ProductCard(props){
    var productInfo = props.data;
    var newProductInfo = {};
    for (var i in productInfo)
        newProductInfo[i] = productInfo[i];
    

    return (
        <GridListTile style={{width: props.cardWidth, padding: 10}}>
                {productInfo.isFreeShipping && 
                    <GridListTileBar titlePosition='top' title="Free Shipping" style={{height: 25, textAlign: "center", fontSize: "0.9em"}} />
                }
                <Grid container direction="column" style={{width: props.cardWidth - 20}} alignItems="center">
                    <Grid item  style={{maxWidth: '100%'}}>
                        <img src={"./data/products/" + productInfo.sku.toString() + '_1.jpg'} style={{width:props.cardWidth - 20}}/>
                    </Grid>
                    <Grid item style={{marginBottom: 5}}>
                        <Typography align="center" style={{fontSize: props.cardWidth / 15}}>{productInfo.title}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography style={{minHeight: 30, fontSize: props.cardWidth / 18, color: "gray"}} align="center">{newProductInfo.description}</Typography>
                        <Typography align="center">${productInfo.price.toFixed(2)}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography style={{marginTop: 10, textAlign: "center"}}>Add to Cart</Typography>    
                        <Container>
                            <Grid container direction="row" justify="space-evenly">
                                {["S", "M", "L", "XL"].map((size, index)=> {
                                    if (props.inventory[size] > 0){
                                        return (
                                            <Grid key={index} item>
                                                <Button onClick={() => props.addItem(newProductInfo, size)} style={{fontSize: props.cardWidth / 20}}>{size}</Button>
                                            </Grid>
                                        )
                                    }
                                    
                                       
                                })}
                                
                            </Grid>
                        </Container>
                    </Grid>
                </Grid>
        </GridListTile>
    )
}
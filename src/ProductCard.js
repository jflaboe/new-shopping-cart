import React from 'react';
import { Card, Typography, Grid, GridListTile, GridListTileBar, Container, Button } from '@material-ui/core';

export default function ProductCard(props){
    const productInfo = props.data;

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
                        <Typography style={{minHeight: 30, fontSize: props.cardWidth / 18, color: "gray"}} align="center">{productInfo.description}</Typography>
                        <Typography align="center">${productInfo.price.toFixed(2)}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography style={{marginTop: 10, textAlign: "center"}}>Add to Cart</Typography>    
                        <Container>
                            <Grid container direction="row" justify="space-evenly">
                                <Grid item>
                                    <Button style={{fontSize: props.cardWidth / 20}}>S</Button>
                                </Grid>
                                <Grid item>
                                    <Button style={{fontSize: props.cardWidth / 20}}>M</Button>
                                </Grid>
                                <Grid item>
                                    <Button style={{fontSize: props.cardWidth / 20}}>L</Button>
                                </Grid>
                                <Grid item>
                                    <Button style={{fontSize: props.cardWidth / 20}}>XL</Button>
                                </Grid>
                            </Grid>
                        </Container>
                    </Grid>
                </Grid>
        </GridListTile>
    )
}
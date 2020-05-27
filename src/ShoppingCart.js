import React, {useState, useRef, useEffect} from 'react'
import { Drawer, Grid, Typography, Button, Container } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import useWindowDimensions from './useWindowDimensions'
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

function ShoppingCartItem(props){
    const item = props.item;
    
    const [imgSize, setImgSize] = useState(19);
    


    return (
        <Grid container alignItems="center" direction="row" style={{marginBottom: 30}}>
            <Grid item xs={2}>
                <img src={"./data/products/" + item.sku.toString() + '_2.jpg'} style={{width:'100%'}}/>
            </Grid>
            <Grid item xs={8} style={{paddingLeft: 8}}>
                <Typography>{item.title}</Typography>
                <Typography>{item.size} | {item.description}</Typography>
                <Typography>Quantity: {item.quantity}</Typography>
            </Grid>
            <Grid item>
                <Button align={'right'}><CloseIcon/></Button>
            </Grid>
        </Grid>
    )
}

export default function ShoppingCart(props) {
    const items = props.items;
    const { height, width } = useWindowDimensions();
    const delItem = props.delItem;
    const increaseItem = props.increaseItem;
    const isOpen = props.isOpen;
    const setIsOpen = props.setIsOpen;
    var totalCost = 0;
    for (var i =0; i < items.length; i++) {
        totalCost += items[i].price * items[i].quantity;
    }

    return (
        <React.Fragment>
        <Drawer variant='persistent' anchor="right" open={isOpen} style={{width: '30%'}}>
            <Grid container direction="column" style={{width: 400}}>
            <Grid item>
                <Container style={{height: height * 0.11, borderBottomStyle: 'solid', padding: 0}}>
                    <Button onClick={() => {setIsOpen(false);}}><CloseIcon /></Button>
                    
                    <Typography style={{textAlign: "center", width: '100%'}}>Shopping Cart</Typography>
                </Container>
            </Grid>
            <Grid item>
            <Container style={{height: height * 0.65, padding: 0, overflowY: 'auto'}}>
                {items.map((item, index) => {
                    return (
                        <ShoppingCartItem key={index} item={item} delItem={delItem} />
                    );
                })
                }
            </Container>
                
            </Grid>
            <Grid item style={{borderTop: 'solid', paddingTop: 20}}>
                <Grid container direction="row">
                    <Grid item xs={6}>
                        <Typography style={{textAlign: "left", paddingLeft: 20}}>Subtotal:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography style={{textAlign: "right", paddingRight: 20}}>${totalCost.toFixed(2)}</Typography>
                    </Grid>
                </Grid>
            </Grid>
            </Grid>
        </Drawer></React.Fragment>
    )

}
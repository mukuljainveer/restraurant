import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router";
import _ from 'lodash'
import { useSelector } from "react-redux";
import Paper from '@material-ui/core/Paper';
import { Grid, makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: 10,
        backgroundColor: 'yellow'
    },
    paper:{
        padding: 10,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const ViewRestaurant = () => {
    const location = useLocation();
    const [editable, setEditable] = useState(0)
    const [restaurant, setRestaurant] = useState({ menu: [] })
    const data = useSelector(state => {
        return state.Restaurant.data;
    })


    useEffect(() => {
        setEditable(_.split(location.pathname, '/')[1] - 1)
        setRestaurant(data[editable])
    })

    const classes = useStyles();

    return (
        <>
            <h1>{restaurant.name}</h1>
            <Paper className={classes.paper}>
                <Typography variant="h5" component="h2">
                    <b>Menu:</b>
                </Typography>
                <Grid container>
                    {restaurant.menu.map((item,index) => {
                        return (
                            <Grid item key={index}>
                                <Card className={classes.root} variant="outlined">
                                    <CardContent>
                                        <Typography variant="h5" component="h2">
                                            {item.name}
                                        </Typography>
                                        <Typography className={classes.pos} color="textSecondary">
                                            {item.type}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            Rs.{item.price}
                                </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">Order Now</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            </Paper>
        </>
    )
}

export default ViewRestaurant;
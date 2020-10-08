import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Grid, Box, Button, Paper, Container } from "@material-ui/core";
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import _ from 'lodash'
import store from "../store";
import { editRestaurant } from "../store/actions/crud";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import SnackBar from "../components/SnackBar";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
            width: "100%",
        },
        paper: {
            marginTop: '32px',
            backgroundColor: 'red',
        }
    },
    rootTextField: {
        width: '100%'
    },
    container: {
        paddingLeft: '0px',
        paddingRight: '0px',
    },
    formControl: {
        minWidth: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


const EditRestaurant = () => {
    const location = useLocation();

    const [editable, setEditable] = useState(0)

    const data = useSelector(state => {
        return state.Restaurant.data;
    })

    useEffect(() => {
        setEditable(_.split(location.pathname, '/')[1] - 1)
        setRestaurant(data[editable])
    },[data,editable,location.pathname])

    const classes = useStyles();

    const [restaurant, setRestaurant] = useState({ menu: [] })
    const [snackBarStatus, setsnackBarStatus] = useState(false)

    const [menuData, setMenuData] = useState({ type: '', name: '',price: '' })
    const [isMenuUpdate, setIsMenuUpdate] = useState(false)


    const MenuRender = (props) => {
        return (
            <>
                {!_.isEmpty(props.menuData) ?
                    props.menuData.map((item, index) => {
                        return (
                            <Box key={index} justifyContent="space-between" display="flex" >
                                <Box p={1}>
                                    {item.type}
                                </Box>
                                <Box p={1}>
                                    {item.name}
                                </Box>
                                <Box p={1}>
                                    {item.price}
                                </Box>
                                <Box p={1}>
                                    <Button onClick={() => removeMenuHandler(index)} variant="contained" color="primary">
                                        Remove
                                    </Button>
                                </Box>
                            </Box>
                        )
                    })
                    : ""
                }
            </>
        )
    }

    // const textBoxHandler = (event) => {
    //     setRestaurant({ ...restaurant, [event.target.name]: event.target.value })
    // }

    const removeMenuHandler = (index) => {
        restaurant.menu.splice(index, 1)
        setIsMenuUpdate(!isMenuUpdate)
    }

    const addMenuHandler = () => {
        restaurant.menu.push(menuData)
        let data = restaurant;
        setRestaurant(data)
        setMenuData({ type: '', name: '', price: '' })
        setIsMenuUpdate(!isMenuUpdate)
    }

    const handleChange = (event) => {
        setMenuData({ ...menuData, [event.target.name]: event.target.value })
    }

    const addRestaurant = () => {
        setsnackBarStatus(!snackBarStatus)
        setMenuData({ type: '', name: '',price: ''})
        store.dispatch(editRestaurant({ editable, restaurant }))
        // setInterval(()=>{
        //     history.push("/");
        // },3000)
    }

    const handleChangeSelect = (event) => {
        setMenuData({ ...menuData, 'type': event.target.value });
    };

    return (
        <>
            <h1>Edit Restaurant</h1>

            <Container className={classes.container}>
                <Paper style={{ padding: 10 }}>
                    <div className={classes.paper}>
                        <form className={classes.root} noValidate autoComplete="off">
                            <Grid container direction='column'>
                                <Grid item md={12} lg={12}>
                                    <Paper>
                                        <Box justifyContent="center" display="flex">
                                            <Box p={1} css={{ width: '100%' }}>
                                                <h1>{restaurant.name}</h1>
                                            </Box>
                                        </Box>
                                    </Paper>
                                </Grid>
                                <Grid item lg={12}>
                                    <h3>Menu Management</h3>
                                </Grid>
                                <Grid item lg={12}>
                                    <Paper>
                                        <Box justifyContent="center" display="flex" direction="column">
                                            <Box p={1} css={{ width: '100%' }}>
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={menuData.type}
                                                        onChange={handleChangeSelect}
                                                    >
                                                        <MenuItem value='Dish'>Dish</MenuItem>
                                                        <MenuItem value='Cuisine'>Cuisine</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                            <Box p={1} css={{ width: '100%' }}>
                                                <TextField name="name" value={menuData.name} onChange={handleChange}
                                                    className={classes.rootTextField} id="standard-basic" label="Name" />
                                            </Box>
                                            <Box p={1} css={{ width: '100%' }}>
                                                <TextField name="price" value={menuData.price} onChange={handleChange}
                                                    className={classes.rootTextField} id="standard-basic" label="Price" />
                                            </Box>
                                            <Box p={1} css={{ width: '100%' }}>
                                                <Button onClick={addMenuHandler} variant="contained" color="primary">
                                                    Add
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                    <Grid container direction="column">
                        <Grid item lg={12}>
                            <h3>Menu:</h3>
                        </Grid>
                        <Grid item lg={12}>
                            <Paper>
                                <Box justifyContent="space-between" display="flex" >
                                    <Box p={1}>
                                        Type
                                    </Box>
                                    <Box p={1}>
                                        Name
                                    </Box>
                                    <Box p={1}>
                                        Price
                                    </Box>
                                    <Box p={1}>
                                        Action
                                    </Box>
                                </Box>
                                <MenuRender update={isMenuUpdate} menuData={restaurant.menu} />
                            </Paper>
                        </Grid>
                        <Grid item lg={12} style={{ textAlign: "center" }}>
                            <Button style={{ margin: 20 }} onClick={addRestaurant} variant="contained" color="primary">
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
                <SnackBar status={snackBarStatus} />
            </Container>
        </>
    )
        ;
};

export default EditRestaurant;

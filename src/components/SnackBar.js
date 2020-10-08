import React, { useEffect } from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackBar = (props) => {

    useEffect(() => {
        setOpen(props.status)
    },[props.status])


    const [open, setOpen] = React.useState(false);

    // const handleClick = () => {
    //     setOpen(true);
    // };

    return (
        <>
            <Snackbar open={open} autoHideDuration={10}>
                <Alert severity="success">
                    This is a success message!
                </Alert>
            </Snackbar>
        </>
    )
}

export default SnackBar;
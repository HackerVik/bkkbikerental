import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        backgroundColor: 'white',
        border: '2px solid darkblue',
        borderRadius: '1em',
        boxShadow: theme.shadows[5],
        padding: '1em',
    },
}));

export default function StationDataModal() {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {setOpen(true);};
    const handleClose = () => {setOpen(false);};

    return (
        <div>
            {/*<button onClick={handleOpen}>Station modal</button>*/}
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h2>Station data</h2>
                    <p>Description</p>
                    <button style={{fontSize: "1.25vmin"}} onClick={handleClose}>Close</button>
                </div>
            </Modal>
        </div>
    );
}

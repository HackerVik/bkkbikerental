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
        width: '80%',
        height: '80%',
        backgroundColor: 'white',
        border: '2px solid darkblue',
        borderRadius: '1em',
        boxShadow: theme.shadows[5],
        padding: '1em',
    },
}));

export default function RawDataModal() {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <div onClick={handleOpen}>
                Raw data
            </div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <p>Data requested from BKK server:</p>
                    <iframe
                        title={"rawdatamodal"}
                        src="https://futar.bkk.hu/api/query/v1/ws/otp/api/where/bicycle-rental.json?key=apaiary-test"
                        style={{width: '100%', height: '90%'}}
                    />
                </div>
            </Modal>
        </div>
    );
}

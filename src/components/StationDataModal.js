import React from 'react';
import {Modal} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Bubi from '../images/stationpicture.png';

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
        width: '70%',
        position: 'absolute',
        backgroundColor: 'white',
        border: '2px solid darkblue',
        borderRadius: '1em',
        boxShadow: theme.shadows[5],
        padding: '1em',
    },
}));

export default function StationDataModal(props) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    return (
        <div className="Modal">
            <Modal
                open={props.stationModal}
                onClose={props.handleModal}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h2>{props.stationName}</h2>
                    <p>GPS: {props.stationPositionLat} ,{props.stationPositionLon}<br/><br/>Bikes
                        available: {props.stationBikes}<br/>Spaces available: {props.stationSpaces}</p>
                    <img src={Bubi} alt={"stationpicture"} style={{width: '100%'}}/><br/>
                    <button style={{fontSize: "1.25vmin"}} onClick={props.handleModal}>Close</button>
                </div>
            </Modal>
        </div>
    );
}

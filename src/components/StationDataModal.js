import React from 'react';
import {Modal} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import StationPicture from '../images/stationpicture.png';

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
        width: '80%',
        position: 'absolute',
        backgroundImage: 'linear-gradient(to right, #9bccc9, #66cccc)',
        border: '2px solid darkblue',
        borderRadius: '1em',
        boxShadow: theme.shadows[5],
        padding: '1em',
        color: 'darkblue',
    },
}));

export default function StationDataModal(props) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const fixedLon = parseFloat(props.stationPositionLon).toFixed(6);
    const fixedLat = parseFloat(props.stationPositionLat).toFixed(6);
    return (
        <div>
            <Modal
                open={props.stationModal}
                onClose={props.handleModal}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h2>{props.stationName}</h2>
                    <p>GPS: {fixedLat} , {fixedLon}<br/><br/>Bikes
                        available: {props.stationBikes}<br/>Spaces available: {props.stationSpaces}</p>
                    <img src={StationPicture} alt={"stationpicture"} style={{width: '100%'}}/><br/>
                    <button style={{fontSize: "4vmin"}} onClick={props.handleModal}>Close</button>
                </div>
            </Modal>
        </div>
    );
}

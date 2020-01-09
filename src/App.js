import React, {Component} from 'react';
import biker from './images/biker.gif';
import pin from './images/bubilogo.png';
import Map from 'pigeon-maps';
import Overlay from 'pigeon-overlay';
import './App.css';
import RawDataModal from './components/RawDataModal';
import StationDataModal from './components/StationDataModal';


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            isMapView: true,
            stationModal: false,
            stationName: null,
            stationSpaces: null,
            stationBikes: null,
            stationPositionLat: null,
            stationPositionLon: null,
        };
        this.setMapView = this.setMapView.bind(this);
        // this.setHome = this.setHome.bind(this);
        this.stationHandle = this.stationHandle.bind(this);
    }

    stationHandle(name, spaces, bikes, lat, lon) {
        this.setState({
            ...this.state,
            stationModal: !this.state.stationModal,
            stationName: name,
            stationSpaces: spaces,
            stationBikes: bikes,
            stationPositionLat: lat,
            stationPositionLon: lon,
        })
    }

    setMapView() {
        this.setState({
            ...this.state,
            isMapView: !this.state.isMapView,
        })
    }

    // setHome() {
    //     this.setState({
    //         ...this.state,
    //         isMapView: true,
    //     })
    // }

    componentDidMount() {
        // fetch('https://futar.bkk.hu/api/query/v1/ws/otp/api/where/bicycle-rental.json?key=apaiary-test')
        //     .then(res => res.json())
        //     .then(data => {
        //         this.setState({
        //             items: data.data.list,
        //             isLoaded: true,
        //         });
        //         return data;
        //     });
        let proxyUrl = 'https://cors-anywhere.herokuapp.com/',
            targetUrl = 'https://futar.bkk.hu/api/query/v1/ws/otp/api/where/bicycle-rental.json?key=apaiary-test';
        fetch(proxyUrl + targetUrl)
            .then(blob => blob.json())
            .then(data => {
                // console.table(data);
                // console.log(data.data.list);
                this.setState({
                    items: data.data.list,
                    isLoaded: true,
                });
                return data;
            })
            .catch(e => {
                // console.log(e);
                return e;
            });
    }

    render() {
        const {isLoaded, items} = this.state;
        if (!isLoaded) {
            return <div style={{textAlign: "center"}}>
                <img alt={"loading"} src={biker} className="App-loading" style={{transition: 'width 1s ease-out 1s'}}/>
            </div>;
        } else {
            return (
                <div className="App">
                    <div className="App-header" style={{fontFamily: "headerFont"}}>BKKBikeRental
                    </div>
                    <div style={{background: "none",
                        margin: '1vmin'}}>
                        {/*<button onClick={this.setHome}>*/}
                        {/*    Home*/}
                        {/*</button>*/}
                        <button>
                            <RawDataModal/>
                        </button>
                        <button type="submit" onClick={this.setMapView}
                        >Switch to {!this.state.isMapView ? "Map" : "Table"} view
                        </button>
                    </div>
                    <div style={{
                        textAlign: "center",
                        display: (this.state.isMapView ? "inline" : "none")
                    }}>
                        <Map center={[47.505, 19.06]}
                             zoom={14}
                             width={0}
                             height={1000}
                             maxZoom={19}
                             minZoom={14}
                             animate={true}
                        >
                            {items.map(item => (
                                <Overlay key={item.id}
                                         anchor={[item.lat, item.lon]}
                                         payload={1}
                                         onClick={({event, anchor, payload}) => {
                                         }}>
                                    <img
                                        onClick={() => this.stationHandle(
                                            item.name,
                                            item.spaces,
                                            item.bikes,
                                            item.lat,
                                            item.lon
                                        )}
                                        className="Station-pin"
                                        src={pin}
                                        width={25}
                                        height={25}
                                        alt={item.id}
                                    />
                                </Overlay>
                            ))}
                        </Map>
                        <StationDataModal items={{items}}
                                          stationModal={this.state.stationModal}
                                          handleModal={this.stationHandle}
                                          stationName={this.state.stationName}
                                          stationSpaces={this.state.stationSpaces}
                                          stationBikes={this.state.stationBikes}
                                          stationPositionLat={this.state.stationPositionLat}
                                          stationPositionLon={this.state.stationPositionLon}
                        />
                    </div>
                    <div style={{display: (!this.state.isMapView ? "inline" : "none")}}>
                        <table>
                            <thead>
                            <tr>
                                <th>code</th>
                                <th>name</th>
                                <th>bikes</th>
                                <th>spaces</th>
                                {/*<th>id</th>*/}
                                {/*<th>lat</th>*/}
                                {/*<th>lon</th>*/}
                                {/*<th>type</th>*/}
                            </tr>
                            </thead>
                            <tbody>
                            {items.map(item => (
                                <tr key={item.id}
                                    onClick={() => this.stationHandle(
                                        item.name,
                                        item.spaces,
                                        item.bikes,
                                        item.lat,
                                        item.lon
                                    )}>
                                    <td>{item.code}</td>
                                    <td>{item.name}</td>
                                    <td>{item.bikes}</td>
                                    <td>{item.spaces}</td>
                                    {/*<td>{item.id}</td>*/}
                                    {/*<td>{item.lat}</td>*/}
                                    {/*<td>{item.lon}</td>*/}
                                    {/*<td>{item.type}</td>*/}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
    }
}

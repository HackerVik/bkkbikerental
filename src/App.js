import React, {Component} from 'react';
import biker from './images/biker.gif';
import Map from 'pigeon-maps';
import Overlay from 'pigeon-overlay';
import './App.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
        }
    }

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
                /*console.table(data);
                console.log(data.data.list);*/
                this.setState({
                    items: data.data.list,
                    isLoaded: true,
                });
                return data;
            })
            .catch(e => {
                console.log(e);
                return e;
            });
    }

    render() {
        const {isLoaded, items} = this.state;
        if (!isLoaded) {
            return <div className="App">
                <img alt={"loading"} src={biker}
                     style={{
                         borderRadius: "50%",
                         boxShadow: ".5em .5em .5em grey",
                         border: "1px dotted double grey",
                     }}/></div>;
        } else {
            const isMapView = true;
            return (
                <div className="App">
                    <div style={{
                        background: "lightblue",
                        textAlign: "center",
                        paddingTop: ".5em",
                        fontFamily: "headerFont",
                        fontSize: "5em",
                        color: "darkblue"
                    }}>BKKBikeRental
                    </div>
                    <div style={{
                        textAlign: "center",
                        display: (isMapView ? "inline" : "none")
                    }}>
                        <Map center={[47.505, 19.06]}
                             zoom={14}
                             width={0}
                             height={1000}
                             maxZoom={19}
                        >
                            {items.map(item => (
                                <Overlay key={item.id}
                                         anchor={[item.lat, item.lon]}
                                         payload={1}
                                         onClick={({event, anchor, payload}) => {
                                         }}>
                                    <img style={{
                                        borderRadius: "50%",
                                        boxShadow: ".2em .2em .2em grey",
                                        border: "1px dotted double grey"
                                    }} src={biker}
                                         width={25}
                                         height={25}
                                         alt={item.id}
                                    />
                                </Overlay>
                            ))}
                        </Map>
                    </div>
                    <div style={{display: (!isMapView ? "inline" : "none")}}>
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
                                <tr key={item.id}>
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

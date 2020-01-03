import React, {Component} from 'react';
import biker from './biker.gif';
import Map from 'pigeon-maps'
import Overlay from 'pigeon-overlay'


export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
        }
    }

    componentDidMount() {
        fetch('http://futar.bkk.hu/api/query/v1/ws/otp/api/where/bicycle-rental.json?key=apaiary-test')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    items: json,
                    isLoaded: true,
                })
            });

        /*let proxyUrl = 'https://cors-anywhere.herokuapp.com/',
            targetUrl = 'https://futar.bkk.hu/api/query/v1/ws/otp/api/where/bicycle-rental.json?key=apaiary-test';
        fetch(proxyUrl + targetUrl)
            .then(blob => blob.json())
            .then(data => {
                console.table(data);
                console.log(data.data.list);
                this.setState({
                    items: data.data.list,
                    isLoaded: true,
                });
                return data;
            })
            .catch(e => {
                console.log(e);
                return e;
            });*/
    }

    render() {
        const {isLoaded, items} = this.state;
        if (!isLoaded) {
            return <div>
                <img alt={"loading"} src={biker}
                     style={{
                         borderRadius: "50%",
                         boxShadow: ".5em .5em .5em grey",
                         border: "1px dotted double grey",
                     }}/></div>;
        } else {
            return (
                <div>
                    <Map center={[47.505, 19.06]}
                         zoom={13}
                         width={800}
                         height={800}
                         maxZoom={15}
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
                                     width={25} height={25} alt={item.id}/>
                            </Overlay>
                        ))}
                    </Map>
                    <table style={{border: "1px solid black"}}>
                        <thead>
                        <tr style={{border: "1px solid black",
                            background: "lightblue"}}>
                            <th style={{border: "1px solid black"}}>code</th>
                            <th style={{border: "1px solid black"}}>name</th>
                            <th style={{border: "1px solid black"}}>bikes</th>
                            <th style={{border: "1px solid black"}}>spaces</th>
                            {/*<th style={{border: "1px solid black"}}>id</th>*/}
                            {/*<th style={{border: "1px solid black"}}>lat</th>*/}
                            {/*<th style={{border: "1px solid black"}}>lon</th>*/}
                            {/*<th style={{border: "1px solid black"}}>type</th>*/}
                        </tr>
                        </thead>
                        <tbody>
                        {items.map(item => (
                            <tr key={item.id}>
                                <td style={{border: "1px solid black", textAlign: "center"}}>{item.code}</td>
                                <td style={{border: "1px solid black", textAlign: "center"}}>{item.name}</td>
                                <td style={{border: "1px solid black", textAlign: "center"}}>{item.bikes}</td>
                                <td style={{border: "1px solid black", textAlign: "center"}}>{item.spaces}</td>
                                {/*<td style={{border: "1px solid black", textAlign: "center"}}>{item.id}</td>*/}
                                {/*<td style={{border: "1px solid black", textAlign: "center"}}>{item.lat}</td>*/}
                                {/*<td style={{border: "1px solid black", textAlign: "center"}}>{item.lon}</td>*/}
                                {/*<td style={{border: "1px solid black", textAlign: "center"}}>{item.type}</td>*/}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

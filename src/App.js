import React, {Component} from 'react';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
        }
    }

    componentDidMount() {
        /*fetch('https://futar.bkk.hu/api/query/v1/ws/otp/api/where/bicycle-rental.json?key=apaiary-test')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    items: json,
                    isLoaded: true,
                })
            });*/

        let proxyUrl = 'https://cors-anywhere.herokuapp.com/',
            targetUrl = 'https://futar.bkk.hu/api/query/v1/ws/otp/api/where/bicycle-rental.json?key=apaiary-test';
        fetch(proxyUrl + targetUrl)
            .then(blob => blob.json())
            .then(data => {
                console.table(data);
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
        let {isLoaded, items} = this.state;
        if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="App">
                    <ul>
                        {items.map(item => (
                            <li key={item.id}>
                                code: {item.code}|
                                name: {item.name}|
                                bikes: {item.bikes}|
                                id: {item.id}|
                                lat: {item.lat}|
                                lon: {item.lon}|
                                spaces: {item.spaces}|
                                type: {item.type}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    }
}

export default App;

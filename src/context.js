import React, { Component } from 'react'
import items from './data';

const RoomContext = React.createContext();

class RoomProvider extends Component {
    state = {
        rooms:[],
        sortedRoom:[],
        featuredRooms:[],
        loading: true
    };
    //getDate
    
    componentDidMount(){
        //this.getData
        let rooms = this.formatData(items);
        let featuredRooms = rooms.filter(room => room.featured === true);
        this.setState({
            rooms,
            featuredRooms,
            sortedRoom:rooms,
            loading:false
        });
    }

    formatData(items){
        let tempItems = items.map(item => {
            let id = item.sys.id
            let images = item.fields.images.map(image => image.fields.file.url);

            let rooms = { ...item.fields, images,id}
            return rooms;
        });
        return tempItems;
    }

    render() {
        return (
            <RoomContext.Provider value ={{ ...this.state }}>
                {this.props.children}
            </RoomContext.Provider>
        );
    }
}

const RoomCunsumer = RoomContext.Consumer;

export {RoomProvider, RoomCunsumer, RoomContext };
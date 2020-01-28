import React, { Component } from 'react';
//import Carousel from 'react-material-ui-carousel'
import {GridList, GridListTile} from "@material-ui/core"

const root_style = {
    display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
}
const gridList_style = {
    flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
}

class Carousel extends Component {
    state = { 
        images: []
     } 

    componentDidMount() {
        //this.importImages()
    }

    renderImages = () => {
        let image_array = []

        for (let i = 1; i<=3; i++){
            image_array.push(require("../images/banner/" + i +".png"))
        }
        const component = image_array.map(img => {
            return(
                <GridListTile key={img}>
                    <img src={img} alt=""></img>
                </GridListTile>
            ) 
        })

        return component
    }
    render() { 
        return ( 
            <div style={root_style}>
            <GridList style={gridList_style} cols={1}>
                {this.renderImages()}
            </GridList>
            </div>
            
         );
    }
}
 
export default Carousel;
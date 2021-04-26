import React from 'react';
import axios from 'axios';
import './styles.css';
// import GifPlayer from 'react-gif-player';
// import {
//     Grid
//   } from "@giphy/react-components";
//   import { imagesLoaded } from 'imagesloaded';

export default class GifLibrary extends React.Component {
  state = {
      gifs: []
  }

  componentDidMount() {
    const api_key = "NBbgMtO2fN18xuTOmm9M8MG3gdcYAkN6";
    //fetching trending gifs from the Api 
    axios.get(`https://api.giphy.com/v1/gifs/trending?api_key=${api_key}`)
    .then(res => {
        this.setState({
            gifs: res.data
        })
    })
    // this.resizeAllGridItems();
    // window.addEventListener("resize", this.resizeAllGridItems());
    // let allItems = document.getElementsByClassName("gif");
    // console.log(allItems,"allItems")
    // for(let x=0; x<allItems.length; x++){
    // imagesLoaded( allItems[x], this.resizeInstance());
// }
  }

//   resizeGridItem = (item) => {
//     console.log(item,"item")
//     let grid = document.getElementsByClassName("layout")[0];
//     let rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
//     let rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
//     let rowSpan = Math.ceil((document.querySelector('.item').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
//     // item.style.gridRowEnd = "span "+ rowSpan;
//  }

//  resizeAllGridItems= () => {
//     let allItems = document.getElementsByClassName("item");
//     // console.log(allItems,"allItems")
//     for(let x=0; x<allItems.length; x++){
//        this.resizeGridItem(allItems[x]);
//     }
//  }

// resizeInstance = (instance) => {
//     console.log(instance, "instance")
// 	// let item = instance.state.gifs && instance.state.gifs.data && instance.state.gifs.data[0];
//     // this.resizeGridItem(item);
// }

  render() {
      const { gifs } = this.state;
    //   console.log(gifs,"gifs")
    return (
        <div  className="layout">
            {gifs && gifs.data && gifs.data.length > 0 && gifs.data.map((gif, index) => {
                return(
                        <div className="item">
                            <div className="content">
                                <img src={gif.images.original.webp} className = "gif" alt="Powered By GIPHY"/>
                            </div>
                        </div>
                )
            })}
            </div>
    )
  }
}
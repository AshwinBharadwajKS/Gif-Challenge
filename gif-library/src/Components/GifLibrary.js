import React from 'react';
import axios from 'axios';
import './styles.css';
import Masonry from 'react-masonry-css';

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
    const grid = document.getElementsByClassName('grid');
    console.log(grid,"grid")
    const masonry = new Masonry(grid, {
        itemSelector: '.grid-item',
        gutter: 10,
    });
  }

  render() {
      const { gifs } = this.state;
      console.log(gifs,"gifs")
      const breakPoints = {
          default: 4,
          1100: 2,
          700: 1
      }
    return (
            <Masonry
            breakpointCols={breakPoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
            >
            {gifs && gifs.data && gifs.data.length > 0 && gifs.data.map((gif, index) => {
                return(
                        <div>
                            <img src={gif.images.original.webp} height = {gif.images.original.height} className="gif" alt="Powered By GIPHY"/>
                        </div>
                )
            })}
            </Masonry>
    )
  }
}
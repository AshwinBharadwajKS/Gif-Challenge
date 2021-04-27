import React from 'react';
import axios from 'axios';
import './styles.css';
import Masonry from 'react-masonry-css';
import ReactPaginate from 'react-paginate';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class GifLibrary extends React.Component {
  state = {
      gifs: [],
      totalNumberOfPages: null,
      isButtonClicked: false,
      searchString: null
  }

  componentDidMount() {
    const api_key = "NBbgMtO2fN18xuTOmm9M8MG3gdcYAkN6";
    //fetching trending gifs from the Api 
    axios.get(`https://api.giphy.com/v1/gifs/trending?api_key=${api_key}`)
    .then(res => {
        this.setState({
            gifs: res.data,
            totalNumberOfPages: res.data.pagination && res.data.pagination.total_count,
            offset: res.data.pagination && res.data.pagination.offset,
            count: res.data.pagination && res.data.pagination.count,
            pageCount: (res.data.pagination && res.data.pagination.total_count) / (res.data.pagination && res.data.pagination.count)
        })
    })
  }

  onPageChange = (pageNumber) => {
    const { searchString } = this.state;
    const api_key = "NBbgMtO2fN18xuTOmm9M8MG3gdcYAkN6";
    //fetching trending gifs from the Api 
    let offset = pageNumber.selected * 50;
    if(searchString === null || searchString === "" || searchString === " "){
    axios.get(`https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&offset=${offset}`)
    .then(res => {
        this.setState({
            gifs: res.data,
            offset: res.data.pagination && res.data.pagination.offset,
            count: res.data.pagination && res.data.pagination.count,
            pageCount: (res.data.pagination && res.data.pagination.total_count) / (res.data.pagination && res.data.pagination.count)
        })
    })}
    else if(searchString){
        console.log("coming here")
        axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${searchString}&offset=${offset}`)
        .then(res => {
            this.setState({
                gifs: res.data,
                offset: res.data.pagination && res.data.pagination.offset,
                count: res.data.pagination && res.data.pagination.count,
                pageCount: (res.data.pagination && res.data.pagination.total_count) / (res.data.pagination && res.data.pagination.count),
            })
        })
    }
  }

  handleSearch = (e) => {
      console.log("coming here")
      const { searchString, isButtonClicked } = this.state;
      console.log(searchString,"searchString")
      const api_key = "NBbgMtO2fN18xuTOmm9M8MG3gdcYAkN6";
      if(isButtonClicked){
        axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${searchString}`)
        .then(res => {
            this.setState({
                gifs: res.data,
                offset: res.data.pagination && res.data.pagination.offset,
                count: res.data.pagination && res.data.pagination.count,
                pageCount: (res.data.pagination && res.data.pagination.total_count) / (res.data.pagination && res.data.pagination.count),
                isButtonClicked: false
            })
        })
      }
      else if(e.keyCode === 13 ){
        axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${e.target.value ? e.target.value : searchString}`)
        .then(res => {
            this.setState({
                gifs: res.data,
                offset: res.data.pagination && res.data.pagination.offset,
                count: res.data.pagination && res.data.pagination.count,
                pageCount: (res.data.pagination && res.data.pagination.total_count) / (res.data.pagination && res.data.pagination.count),
            })
        })
      }
      else if(searchString === "" || searchString === " ") {
        axios.get(`https://api.giphy.com/v1/gifs/trending?api_key=${api_key}`)
        .then(res => {
            this.setState({
                gifs: res.data,
                offset: res.data.pagination && res.data.pagination.offset,
                count: res.data.pagination && res.data.pagination.count,
                pageCount: (res.data.pagination && res.data.pagination.total_count) / (res.data.pagination && res.data.pagination.count),
            })
        })
      }
  }

  onSearch = () => {
      this.setState({

      })
  }

  render() {
      const { gifs, pageCount  } = this.state;
      const breakPoints = {
          default: 4,
          1100: 2,
          700: 1
      }
      console.log(pageCount, "pageCount")
    return (
        <div className="wrapper"> 
        <h1 className="heading">StitcherAds Coding Challenge</h1>
            <div className="searchField">
            <TextField 
                id="outlined-search" 
                placeholder="Search here for GIFs" 
                type="text" 
                variant="outlined"
                value={this.state.searchString} 
                onChange={(e) => this.setState({searchString: e.target.value})}
                onKeyUp={(e) => this.handleSearch(e)}
                 />
                 <Button 
                    variant="contained"
                    color="primary"
                    type="submit"
                    borderRadius="20px"
                    onClick={() => this.setState({isButtonClicked: true},() => this.handleSearch())}
                 >Search</Button>
                 </div>
        <div className="gifContainer">
            <Masonry
            breakpointCols={breakPoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
            >
            {gifs && gifs.data && gifs.data.length > 0 && gifs.data.map((gif, index) => {
                return(
                        <div>
                            <img src={gif.images.original.webp} height = {gif.images.original.height} className="gif" alt="Powered By GIPHY" />
                        </div>
                )
            })}
            </Masonry>
            <div style={{display: 'flex'}}>
                <ReactPaginate 
                pageCount={Math.ceil(pageCount)} 
                pageRangeDisplayed={10} 
                marginPagesDisplayed={10} 
                containerClassName="pagination"
                breakClassName="paginationElipsis" 
                containerClassName="pagination"
                previousLabel={<div className="paginate"><span>Back</span></div>}
                nextLabel={<div className="paginate"><span>Next</span></div>}
                onPageChange={(page) => this.onPageChange(page)}
                />
             </div>
        </div>
        </div>
    )
  }
}
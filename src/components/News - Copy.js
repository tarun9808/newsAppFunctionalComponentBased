import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export default class News extends Component {
  
    static defaultProps=
    {
        country:'in',
        pageSize:6,
        category:'general'
    }
    static propTypes=
    {
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string,
    }
    capitalizeFirstLetter=(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 
  constructor(props)
  {
    super(props);
    console.log("I am from news constructure");
    this.state=
    {
        articles:[],
        loading:false,
        page:1,
    }
    document.title=`${this.capitalizeFirstLetter(this.props.category)} - Nile Sports`;
  }
  // getData
   getData=async ()=>
  {
    this.setState({loading:true});
    console.log("Updated Count",this.state.page);
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=19c29ad0774e49ac92d01df3cd92f67b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let dataP=await fetch(url);
    let parseData=await dataP.json();
    this.setState({articles:parseData.articles,loading:false,totalResults:parseData.totalResults});
  }
  // gettting next page news of set
 handleNextClick=async()=>
  {
        this.setState({page:this.state.page+1});
        await this.getData();
  }
  // getting previous news page
  handlePreviousClick=async ()=>
  {
        this.setState({page:this.state.page-1});
        await this.getData();
  }
  async componentDidMount()
  {
    await this.getData();
  }

  render() {
    console.log("From Randor");
    return (
      <div className='container my-3'>
        <h2 className="text-center" style={{margin:'40px 0px'}}>Nile Sports - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">
            {!this.state.loading && this.state.articles && this.state.articles.map((data)=>{
                return <div key={data.url} className="col-md-4">
                     <NewsItems title={data.title.length>45 ? data.title.slice(0,45) : data.title} description={data.description?data.description.slice(0,90):""} imageUrl={data.urlToImage} newsUrl={data.url} newsDate={data.publishedAt} sourceName={data.source.name} author={data.author}/>
                </div>
            })}
                
        </div>
        <div className="container text-center">
        <button type="button" className="btn btn-dark" onClick={this.handlePreviousClick} disabled={this.state.page<=1}>&#x2190; Previous</button>
        <button type="button" className="btn btn-dark mx-2" onClick={this.handleNextClick} disabled={this.state.totalResults<=this.state.page*this.props.pageSize}>Next &#8594;</button>
        </div>
      </div>
    )
  }
}

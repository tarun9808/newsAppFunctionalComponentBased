import React, { useEffect,useState } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News=(props)=>{
  
   const [articles, setArticles] = useState([]);
   const [loading, setLoading] = useState(false);
   const [page, setPage] = useState(1);
   const [totalResults, setTotalResults] = useState(0)
   
   
   const capitalizeFirstLetter=(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 

  // getData
   const getData= async ()=>
  {
    props.setProgress(10);
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let dataP=await fetch(url);
    props.setProgress(30);
    let parseData=await dataP.json();
    setArticles(parseData.articles);
    setLoading(false);
    setTotalResults(parseData.totalResults)
    props.setProgress(70);
    props.setProgress(100);
   
  }

  useEffect(() => {
    getData();
    document.title=`${capitalizeFirstLetter(props.category)} - Nile Sports`;
  }, [])
   

  // for infiniy scrolling
  const fetchMoreData = async() => {
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    let dataP=await fetch(url);
    let parseData=await dataP.json();
    if(!parseData.status==='error')
    {
      console.log("Response Length",parseData.articles.length)
      setPage(page+1)
      setArticles(articles.concat(parseData.articles));
      setLoading(false);
      setTotalResults(parseData.totalResults)
    }
    else{
      setLoading(true);
    }
   
    };


    return (
     <>
        <h2 className="text-center" style={{margin:'40px 0px'}}>Nile Sports - Top {capitalizeFirstLetter(props.category)} Headlines</h2>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
        >
        <div className='container my-3'>
        <div className="row">
            
            {articles && articles.map((data)=>{
                return <div key={data.url} className="col-md-4">
                     <NewsItems title={data.title.length>45 ? data.title.slice(0,45) : data.title} description={data.description?data.description.slice(0,90):""} imageUrl={data.urlToImage} newsUrl={data.url} newsDate={data.publishedAt} sourceName={data.source.name} author={data.author}/>
                </div>
            })}
                
        </div>
        </div>

        </InfiniteScroll>
      </>
    )
  
}

News.defaultProps=
{
    country:'in',
    pageSize:6,
    category:'general'
}

News.propTypes = {
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string,
}
export default News;
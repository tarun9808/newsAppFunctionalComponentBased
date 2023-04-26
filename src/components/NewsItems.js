import React from 'react'
import moment from 'moment';
const NewsItems =(props)=> {
  
    let {title, description, imageUrl,newsUrl,newsDate,sourceName,author}=props
    moment(newsDate);
    //new Date(newsDate).toGMTString()
 return (
      
      <div className="my-3">
            <div className="card">
                <div style={{display:'flex',position:'absolute',right:0}}>
                <span className="badge rounded-pill bg-danger">{sourceName}</span>
                </div>
            
                <img src={imageUrl?imageUrl:'https://rajannasircilla.telangana.gov.in/wp-content/themes/district-theme-8/images/blank.jpg' } className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}...</p>
                    <div className='clearfix'></div>
                    <p className="card-text"><small className="text-muted">By {author?author:''} on {moment().format('dddd MMMM Do YYYY h:mm:ss a')}</small></p>
                    <div className='clearfix'></div>
                    <a href={newsUrl} className="btn btn-sm btn-dark my-3" target="new" >Read more</a>
                    <span className="text-right" style={{marginTop:'20px',float:'right'}}>Source: {sourceName}</span>

                </div>
            </div>
      </div>
    )

}

export default NewsItems

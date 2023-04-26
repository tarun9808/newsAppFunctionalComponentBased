import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App =()=> {
   const pageSize=6;
  //apiKey=process.env.REACT_NEWS_API_KEY;
   const apiKey="19c29ad0774e49ac92d01df3cd92f67b";
   const [progressBar, setProgressBar] = useState(10)
  
   const setProgress=(progress)=>
   {
      setProgressBar(progress)
   }

    return (
      <BrowserRouter>
      <div>
         {/* including navigation bar */}
         <LoadingBar color='#f11946' height={3} progress={progressBar} />
         <Navbar />
         <Routes> 
         <Route path="/" exact element={''}>
         <Route index path="/" exact element={<News setProgress={setProgress} apiKey={apiKey}  key="general"  country='us' category="general" pageSize={pageSize}/>}/>
         <Route path="/business" exact element={<News setProgress={setProgress} apiKey={apiKey}  key="business" country='us' category="business" pageSize={pageSize}/>}/>
         <Route path="/entertainment" exact element={<News setProgress={setProgress} apiKey={apiKey}  key="entertainment" country='us' category="entertainment" pageSize={pageSize}/>}/>
         <Route path="/general" exact element={<News setProgress={setProgress} apiKey={apiKey}  key="general" country='us' category="general" pageSize={pageSize}/>}/>
         <Route path="/health" exact element={<News setProgress={setProgress} apiKey={apiKey}  key="health" country='us' category="health" pageSize={pageSize}/>}/>
         <Route path="/science" exact element={<News setProgress={setProgress} apiKey={apiKey}  key="science" country='us' category="science" pageSize={pageSize}/>}/>
         <Route path="/sports" exact element={<News setProgress={setProgress} apiKey={apiKey}  key="sports" country='us' category="sports" pageSize={pageSize}/>}/>
         <Route path="/technology" exact element={<News setProgress={setProgress} apiKey={apiKey}  key="technology" country='us' category="technology" pageSize={pageSize}/>}/>
        </Route>
         </Routes>
         
      </div>
      </BrowserRouter>
    )
  
}
export default App


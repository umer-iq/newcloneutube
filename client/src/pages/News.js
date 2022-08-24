import React, { useEffect, useState } from "react";
import Newsitem from "./Newsitem";
import Spinner from "../components/Spinner";

import PropTypes from "prop-types";

const News = (props) => {
  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResults] = useState(0);

  const updateNews = async () => {
    // props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=4ce176c077924652acefc6af234f8e15&page=${page}&pageSize=${props.pageSize}`;
    //setState({ loading: true });
    setloading(true);
    let data = await fetch(url);
    //props.setProgress(30);
    let parsedData = await data.json();
    //props.setProgress(70);
    setarticles(parsedData.articles);
    setloading(false);
    //setpage(parsedData.page)
    settotalResults(parsedData.totalResults);

    //props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
  }, []);

  //async componentDidMount() {
  // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4ce176c077924652acefc6af234f8e15&page=1&pageSize= ${props.pageSize}`;
  //this.setState({loading:true});
  //let data = await fetch(url);
  //let parsedData = await data.json()
  //console.log(parsedData);
  //this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
  //this.updateNews();
  // }
  const handleNextClick = async () => {
    console.log("Next");
    if (!this.state.page + 1 > Math.ceil(this.state.totalResults /props.pageSize)) {

     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4ce176c077924652acefc6af234f8e15&page=${this.state.page + 1}&pageSize= ${props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
     page: this.state.page + 1,
    articles: parsedData.articles
    ,loading:false
    })
    setpage(page + 1);
    this.setState({ page: page + 1 });
    updateNews();
  };

  const handlePrevClick = async () => {
    console.log("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=4ce176c077924652acefc6af234f8e15&page=${this.state.page - 1}&pageSize= ${props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
     page: this.state.page - 1,
    articles: parsedData.articles,loading:false
    })
    this.setState({ page: page - 1 });
    setpage(page - 1);
    updateNews();
  };
  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=4ce176c077924652acefc6af234f8e15&page=${page}&pageSize=${props.pageSize}`;
    //setState({ loading: true });
    setloading(true);
    let data = await fetch(url);
    //props.setProgress(30);
    let parsedData = await data.json();
    //props.setProgress(70);
    setarticles(articles.concat(parsedData.articles));

    settotalResults(parsedData.totalResults);

    //props.setProgress(100);
  };

  return (
    <div className="container my-3">
      <h1 className="text-center"> DAILY NEWS</h1>
      {loading && <Spinner />}
      <div className="row ">
        {!loading &&
          articles.map((element) => {
            return (
              <div className="col-md-3" key={element.url}>
                <Newsitem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageURL={element.urlToImage}
                  content={element.url}
                  author={element.author}
                  date={element.publishedAt}
                />
              </div>
            );
          })}
      </div>
      <div className="container d-flex justify-content-between">
        <button
          disabled={page <= 1}
          type="button"
          className="btn btn-dark"
          onClick={handlePrevClick}
        >
          &larr; Previous
        </button>
        <button
          type="button"
          className="btn btn-dark"
          onClick={handleNextClick}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
};
}
export default News

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "business",
  // ,setProgress: ''
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  //,setProgress:PropTypes.number
};


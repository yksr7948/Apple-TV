import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useLocation, useNavigate } from "react-router-dom"
import { useDebounce } from "../../hooks/useDebounce";
import "./SearchPage.css";

const SearchPage = () => {

  const [searchResult, setSearchResult] = useState([]);
  const navigate = useNavigate();

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  let query = useQuery();
  const debouncedSearchTerm = useDebounce(query.get('q'), 500);

  useEffect(() => {
    if(debouncedSearchTerm){
      fetchSearchMovie(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const fetchSearchMovie = async (searchTerm) => {
    try{
      const response = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      )
      setSearchResult(response.data.results);
    } catch (error) {
      console.log(error);
    }
  }
  
  // return
  if(searchResult.length > 0) {
    return(
      <section className="search_container">
        {searchResult.map((movie) => {
          if(movie.backdrop_path !== null && movie.media_type !== "person"){
            const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            
            return (
              <div className="movie" key={movie.id}>
                <div
                  onClick={() => navigate(`/${movie.id}`)}
                  className="movie_column_poster"
                >
                  <img
                    src= {movieImageUrl}
                    alt="movie"
                    className="movie_poster">
                  </img>
                </div>
              </div>
            )
        }})}
      </section>
    );
  }else{
    return(
      <section className="no_results">
        <div className="no_results_text">
          <p>
            찾고자하는 검색어 {debouncedSearchTerm} 에 맞는 영화가 없습니다.
          </p>
        </div>
      </section>
    );
  }
}

export default SearchPage
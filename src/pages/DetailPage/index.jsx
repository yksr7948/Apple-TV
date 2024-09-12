import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { imageBasePath } from '../../constant'
import './DetailPage.css';
import axios from "../../api/axios";

const DetailPage = () => {
  
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchData(){
      const response = await axios.get(
        `/movie/${movieId}`
      );
      setMovie(response.data);
    }
    fetchData();
  }, [movieId])
  
  console.log(movie);
  if(!movie) return null;
  
  return (
    <section className="detail_section">
      <div className="detail_background" 
        style={{
          backgroundImage: `url(${imageBasePath}${movie.backdrop_path})`,
        }}
      />
      <div className="detail_content">
        <h1 className="detail_title">{movie.title}</h1>
        <span className="detail_runtime"><b>Runtime : </b>{movie.runtime}분</span>
        <span className="detail_vote_average"><b>Rating : </b>{movie.vote_average}점</span>
        <span className="detail_release_date"><b>Release Date : </b>{movie.release_date}</span>
        <p className="detail_overview">{movie.overview}</p>
      </div>

      <div className="detail_poster">
        <img src={`${imageBasePath}${movie.poster_path}`} alt="" />
      </div>
    </section>
  )
}

export default DetailPage
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import requests from '../api/requests';
import './Banner.css';
import styled from 'styled-components';

const Banner = () => {

  const [movie, setMovie] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  // url 주소
  const fetchData = async() => {
    // 현재 상영중인 영화들 정보 가져오기
    const response = await axios.get(requests.fetchNowPlaying);
    // 여러 영화중 영화 하나의 id 가져오기
    let index = Math.floor(Math.random() * response.data.results.length);
    const movieId = response.data.results[index].id;
    // 특정 영화의 더 상세한 정보를 가져오기
    const {data : movieDetail} = await axios.get(`movie/${movieId}`,{
      params: {append_to_response: "videos"}
    });
    setMovie(movieDetail);
  }

  // 설명 subString
  const truncate = (str, n) => {
    return str?.length > n ? str.substring(0, n) + "...": str;
  }

  // return
  if(!movie){
    return(
      <div>
        loading...
      </div>
    )
  }
  
  if(!isClicked){
    return(
      // 이미지 영역
      <div
        className='banner'
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
          backgroundPosition: 'top center',
          backgroundSize: 'cover'
        }}>
        <div className='banner_contents'>
          {/* 영화 제목 */}
          <h1 className='banner_title'>
            {movie.title || movie.name || movie.original_name}
          </h1>
          {/* 영화 비디오 */}
          <div className='banner_buttons'>
            {movie.videos?.results[0]?.key?
            <button
              className='banner_button play'
              onClick={() => setIsClicked(true)}>
              play
            </button>
            : null
          }
          </div>
          {/* 영화 설명 */}
          <p className='banner_description'>
            {truncate(movie.overview, 100)}
          </p>
        </div>
        <div className='banner_fadeBottom'></div>
      </div>
    )
  }else{
    return(
      <>
        <button onClick={() => setIsClicked(false)}>
          x
        </button>
        <Container>
          <HomeContainer>
            <Iframe src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?control=0&autoplay=1&mute=1`}></Iframe>
          </HomeContainer>
        </Container>
      </>
    )
  }
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`
const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`
const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;
`

export default Banner
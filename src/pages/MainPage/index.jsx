import styled from 'styled-components'

import Banner from '../../components/Banner'
import Row from '../../components/Row'
import requests from '../../api/requests'

const MainPage = () => {
  return (
    <Container>
      <Banner></Banner>
      <Row title="Trending Now" id="TN" fetchUrl={requests.fetchTrending}></Row>
      <Row title="Top Rated" id="TR" fetchUrl={requests.fetchTopRated}></Row>
      <Row title="Action Movies" id="AM" fetchUrl={requests.fetchActionMovies}></Row>
      <Row title="Comedy Movies" id="CM" fetchUrl={requests.fetchComedyMovies}></Row>
    </Container>
  )
}

// 메인영역 styled
const Container = styled.main`
  position: relative;
  display: block;
  top: 70px;
  padding: 0 calc(3.5vw + 5px);
`

export default MainPage
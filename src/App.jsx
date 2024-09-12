import { Routes, Route, Outlet } from 'react-router-dom';
import Nav from './components/Nav';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';
import './App.css';

const Layout = () => {
  return (
    <>
      <Nav></Nav>

      <Outlet></Outlet>
    </>
  )
}

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout></Layout>}>
          <Route index element={<LoginPage></LoginPage>}></Route>
          <Route path='main' element={<MainPage></MainPage>}></Route>
          <Route path=':movieId' element={<DetailPage></DetailPage>}></Route>
          <Route path='search' element={<SearchPage></SearchPage>}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App

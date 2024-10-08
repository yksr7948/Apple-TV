import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import app from "../firebase";
import styled from "styled-components"

const initalUserData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : {}

const Nav = () => {

  const [show, setShow] = useState("false");
  // user 정보
  const [userData, setUserData] = useState(initalUserData);
  // 검색바 입력값 
  const [searchValue, setSearchValue] = useState();
  // react-router-dom에서 제공하는 함수(페이지 이동)
  const navigate = useNavigate();

  // 현재 경로
  const { pathname } = useLocation();

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  
  // 스크롤 이벤트
  const listener = () => {
    if(window.scrollY > 50){
      setShow("true");
    }else{
      setShow("false");
    }
  }
  // 페이지 이동
  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  }

  // 로그인 버튼 클릭시 팝업
  const handleAuth = () => {
    signInWithPopup(auth, provider)
    .then((resilt) => {
      setUserData(resilt.user);
      localStorage.setItem("userData", JSON.stringify(resilt.user));
    })
    .catch((error) => {
      alert(error.message);
    })
  }

  // 로그인 시 경로 이동
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(!user) {
        navigate('/');
      }else if(user && pathname == "/"){
        navigate('/main');
      }
    });
  }, [auth, navigate, pathname])
  

  // 스크롤 이벤트 등록
  useEffect(() => {
    window.addEventListener('scroll', listener);
    return () => {
      window.removeEventListener('scroll',  listener);
    }
  }, [])

  // 로그아웃
  const handleLogOut = () => {
    signOut(auth).then(() => {
      setUserData({});
      localStorage.removeItem("userData");
    }).catch((error) => {
      alert(error.message);
    })
  }

  // return
  return (
    <NavWrapper show={show}>
      <Logo>
        <img alt="logo" src="/images/apple-logo.png" onClick={() => (window.location.href="/")}></img>
      </Logo>

      {pathname === "/" ? (
        <Login
          onClick={handleAuth}>
          LogIn
        </Login>
      ):(
          <Input
            type="text"
            className="nav_input"
            value={searchValue || ""}
            onChange={handleChange}
            placeholder="영화를 검색해주세요.">
          </Input>
        )
      }

      {pathname !== "/" ? 
        <Signout>
          <UserImg src={userData.photoURL} alt={userData.displayName}></UserImg>
          <DropDown>
            <span onClick={handleLogOut}>Sign Out</span>
          </DropDown>
        </Signout>
        : 
        null
      }

    </NavWrapper>
  )
}

// 네비바 styled
const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${props => props.show === "false" ? "#000000" : "#000000"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`
// 로고영역 styled
const Logo = styled.a`
  padding: 0;
  width: 70px;
  font-size: 0;
  display: inline-block;
  margin-bottom: 10px;
  cursor: pointer;

  img {
  display: block;
  width: 100%;
  }
`

// 검색바 styled
const Input = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  color: white;
  padding: 5px;
  border: 1px solid lightgray;
`

// 로그인 styled
const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover{
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`

// 로그아웃 styled
const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0/ 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`

const Signout = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-items: center;

  &:hover{
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`
const UserImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
`
  
export default Nav
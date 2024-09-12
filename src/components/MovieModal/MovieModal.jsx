import React, { useRef } from 'react'
import './MovieModal.css';
import { imageBasePath } from '../../constant'
import useOnClickOutside from '../../hooks/useOnClickOutside';

const MovieModal = ({ 
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setModalOpen
}) => {

  const ref = useRef(null);
  
  // 이 함수 실행되면 모달창 꺼주기
  useOnClickOutside(ref, () => {
    setModalOpen(false);
  })

  return (
    <div className='presentation' role='presentation'>
      <div className="wrapper_modal">
        <div className="modal" ref={ref}>
          {/* x 버튼 */}
          <span 
            className="modal_close"
            onClick={() => setModalOpen(false)}>
            x
          </span>
          {/* 이미지 */}
          <img 
            className="modal_poster_img" 
            src={`${imageBasePath}${backdrop_path}`}
            alt='modal_poster_img'>
          </img>
          {/* 내용 */}
          <div className='modal_content'>
            {/* 상세내용 */}
            <p className="modal_details">
              <span>
                100% for you
              </span> 
              &nbsp;
              {release_date ? release_date : first_air_date}
            </p>
            {/* 제목 */}
            <h2 className='modal_title'>
              {title ? title : name}
            </h2>
            <p className="modal_overview">평점: {vote_average}</p>
            <p className="modal_overview">{overview}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieModal
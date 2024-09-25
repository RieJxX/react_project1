import React from "react";
// import

const Pagination = ({ pagesArray, page, setPage })=>{
    return(
        <div className='page__wrapper'>
        {pagesArray && pagesArray.map( p =>
          <span
             key = {p} 
             className = {page === p ? 'page page__current' : 'page'}
             onClick = {() => setPage(p)}>
            {p}
          </span>
        )} 
        </div>
    )
}

export default Pagination
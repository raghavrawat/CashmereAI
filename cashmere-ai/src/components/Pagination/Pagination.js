import { memo } from 'react'
import './Paginations.css'

function Pagination ({ totalResults, pageNumber, setPageNumber }) {

    const totalPageNumber = Math.ceil(totalResults / 9)

    return (
        <div className="pagination">
            <span className={`clickable ${pageNumber === 1 && 'disabled'}`} onClick={() => setPageNumber(1)}>First</span>
            <span className={`clickable ${pageNumber === 1 && 'disabled'}`} onClick={() => setPageNumber(pageNumber - 1)}>Prev</span>
            <span className="page-numbers" >{`Page ${pageNumber} of ${totalPageNumber}`}</span>
            <span className={`clickable ${pageNumber === totalPageNumber && 'disabled'}`} onClick={() => setPageNumber(pageNumber + 1)}>Next</span>
            <span className={`clickable ${pageNumber === totalPageNumber && 'disabled'}`} onClick={() => setPageNumber(totalPageNumber)}>Last</span>
        </div>
    )
}

export default memo(Pagination)
function Navigation({currentPage, setCurrentPage}) {

    const nextPage = () => {
        const newPageNumber = currentPage + 1;
        setCurrentPage(newPageNumber);
    }

    const prevPage = () => {
        if(currentPage > 1 ) {
            const newPageNumber = currentPage - 1;
            setCurrentPage(newPageNumber);
        }
    }

    return (
        <div className="navigation">
            <div className="navigation-item">
                <button className="navigation-button" onClick={prevPage}>Prev Page</button>
            </div>
            <div className="navigation-item">
                <button className="navigation-button" onClick={nextPage}>Next Page</button>
            </div>
        </div>
        
    )
  }
  
  export default Navigation
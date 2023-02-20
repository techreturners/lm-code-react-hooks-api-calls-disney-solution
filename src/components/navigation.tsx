import { useFavourites } from "../fav_char_context";


interface NavigationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  setCurrentPage,
}) => {

  const nextPage = () => {
    const newPageNumber = currentPage + 1;
    setCurrentPage(newPageNumber);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      const newPageNumber = currentPage - 1;
      setCurrentPage(newPageNumber);
    }
  };

  const { toggleFavouritesPage, isFavouritesPage } = useFavourites()

  return (
    <div className="navigation">
      <div className="navigation__item">
        {!isFavouritesPage && (
          <button className="navigation__button" onClick={prevPage}>
            Prev Page
          </button>
        )}
      </div>
      <div className="navigation__item">
        <button className="navigation__button" onClick={toggleFavouritesPage}>
          {isFavouritesPage ? "Show All" : "Show Favourites"}
        </button>
      </div>
      <div className="navigation__item">
        {!isFavouritesPage && (
          <button className="navigation__button" onClick={nextPage}>
            Next Page
          </button>
        )}
      </div>
    </div>
  );
};

export default Navigation;

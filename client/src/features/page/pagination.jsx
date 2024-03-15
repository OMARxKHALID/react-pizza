import Button from '/src/ui/button';
import { useDispatch } from 'react-redux';
import { next, prev } from './../page/pageSlice';
function Pagination({ currentPage, totalPages }) {
  const dispatch = useDispatch();

  const goToPrevPage = () => {
    dispatch(prev());
  };

  const goToNextPage = () => {
    dispatch(next());
  };

  return (
    <div className="mt-4 flex justify-between w-full">
      <Button onClick={goToPrevPage} disabled={currentPage === 1} type="small">
        Previous
      </Button>
      <p className="text-stone-800">
        {currentPage} of {totalPages}
      </p>
      <Button onClick={goToNextPage} disabled={currentPage === totalPages} type="small">
        Next
      </Button>
    </div>
  );
}

export default Pagination;

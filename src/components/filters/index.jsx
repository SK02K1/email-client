import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeSelectedFilter } from '@src/features';
import { filters } from '@src/constants';

export const Filters = () => {
  const { selectedFilter } = useSelector((store) => store.emails);
  const dispatch = useDispatch();

  const filterBtnHandler = (filter) => {
    dispatch(changeSelectedFilter({ filter }));
  };

  const filtersListing = filters.map(({ id, filter }) => {
    return (
      <button
        data-active_filter={selectedFilter === filter}
        onClick={() => filterBtnHandler(filter)}
        key={id}
        className='btn-filter'
      >
        {filter}
      </button>
    );
  });

  return (
    <header className='filters'>
      <div>
        <span>Filter By:</span> {filtersListing}
      </div>
    </header>
  );
};

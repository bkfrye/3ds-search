import {
  Hits,
  Pagination,
  connectStateResults,
} from 'react-instantsearch-dom';
import Hit from './Hit';


const CustomResults = connectStateResults(({ searchState, searchResults }) => (
  <div className="search-panel-results">
    <div className="results-wrapper">
      {searchResults && searchResults.nbHits ? (
        <div>
          <Hits hitComponent={Hit} />
          <footer>
            <Pagination showLast={true} />
          </footer>
        </div>
      ) : (
        <div className="no-results">
          <h3>No results found matching </h3>
          <span className="query">&quot;{searchState.query}&quot;</span>
        </div>
      )}
    </div>
  </div>
));


export default CustomResults;

import React, {useEffect, useState} from 'react';
import {
  Pagination,
  connectStateResults,
} from 'react-instantsearch-dom';
import CustomHits from './CustomHits';


const CustomResults = connectStateResults(({ searchState, searchResults }) => {

  const [ isQueryActive, setIsQueryActive ] = useState(0);

  useEffect(() => {
    if (searchState.refinementList) {
      if ( (searchState.refinementList.industry && searchState.refinementList.industry.length) || (searchState.refinementList.sub_industry && searchState.refinementList.sub_industry.length) || (searchState.refinementList.resource_type && searchState.refinementList.resource_type.length)) {
        setIsQueryActive(1)
      } else {
        setIsQueryActive(0)
      }
    }
  }, [searchState, setIsQueryActive])

  return (
    <div className={`results ${isQueryActive ? 'active-query' : ''} `}>
      <div className="results-wrapper">
        {searchResults && searchResults.nbHits ? (
          <div>
            <CustomHits />
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
  )
})

export default CustomResults;

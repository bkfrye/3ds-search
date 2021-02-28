import React, { useEffect, useState } from 'react';
import {
  ClearRefinements,
  connectStateResults,
  SearchBox,
} from 'react-instantsearch-dom';
import FilterDropdown from './FilterDropdown';

// custom results widget to pull number of hits
const StateResults = ({ searchResults }) => searchResults && searchResults.nbHits;
const CustomStateResults = connectStateResults(StateResults);


const SearchOptions = ({ props }) => {

  const [ isQueryActive, setIsQueryActive ] = useState(0);

  const [isIndustryFilterOpen, setIsIndustryFilterOpen] = useState(0);
  const [isSubIndustryFilterOpen, setIsSubIndustryFilterOpen] = useState(0);
  const [isResourceFilterOpen, setIsResourceFilterOpen] = useState(0);

  const [industryActive, setIndustryActive] = useState(0);
  const [subIndustryActive, setSubIndustryActive] = useState(0);
  const [resourceActive, setResourceActive] = useState(0);

  const [ isMobileFilterActive, setIsMobileFilterActive ] = useState(0);

  useEffect(() => {
    if (props && props.refinementList) {
      (props.refinementList.industry) ? setIndustryActive(1) : setIndustryActive(0);
      (props.refinementList.sub_industry) ? setSubIndustryActive(1) : setSubIndustryActive(0);
      (props.refinementList.resource_type) ? setResourceActive(1) : setResourceActive(0);
    }
  }, [ props ])

  useEffect(() => {
    if (props.refinementList) {
      if ( (props.refinementList.industry && props.refinementList.industry.length) || (props.refinementList.sub_industry && props.refinementList.sub_industry.length) || (props.refinementList.resource_type && props.refinementList.resource_type.length)) {
        setIsQueryActive(1)
      } else {
        setIsQueryActive(0)
      }
    }
  }, [props, setIsQueryActive])

  const toggleIndustry = (el) => {
    if ( isIndustryFilterOpen ) {
      setIsIndustryFilterOpen(0)
    } else {
      setIsIndustryFilterOpen(1)
      setIsResourceFilterOpen(0)
      setIsSubIndustryFilterOpen(0)
    }
  }

  const toggleSubIndustry = (el) => {
    if ( isSubIndustryFilterOpen ) {
      setIsSubIndustryFilterOpen(0)
    } else {
      setIsSubIndustryFilterOpen(1)
      setIsResourceFilterOpen(0)
      setIsIndustryFilterOpen(0)
    }
  }

  const toggleResource = (el) => {
    if ( isResourceFilterOpen ) {
      setIsResourceFilterOpen(0)
    } else {
      setIsResourceFilterOpen(1)
      setIsIndustryFilterOpen(0)
      setIsSubIndustryFilterOpen(0)
    }
  }

  const toggleMobileFiltering = () => {
    ( isMobileFilterActive ) ? setIsMobileFilterActive(0) : setIsMobileFilterActive(1)
  }

  return (
    <>
      {(!isMobileFilterActive && !isQueryActive) && (
        <>
          <div
            className="mobile-filter-button"
            onClick={toggleMobileFiltering}
          >
            <span>Filters</span>
          </div>
          <h2 className="mobile-title">Find Resources for your Industry</h2>
        </>
      )}
      <div className="search">
        <div className={`search-header ${isQueryActive ? "mobile-query-active" : ""} ${isMobileFilterActive ? "mobile-active" : ""}`}>
          <div
            className="close-filters"
            onClick={toggleMobileFiltering}
          >
            { (isMobileFilterActive === 1) &&
              <svg xmlns="http://www.w3.org/2000/svg" width="15.443" height="15.443" viewBox="0 0 15.443 15.443">
                <g transform="translate(0.354 0.354)">
                  <line style={{ stroke: `#000000` }} x2="14.736" y2="14.736"/>
                  <line style={{ stroke: `#000000` }} y1="14.736" x2="14.736"/>
                </g>
              </svg>
            }
          </div>
          <p>Filters <span></span></p>
          <ClearRefinements
            translations={{
              reset: 'Reset',
            }}
          />
        </div>


        <div className={`search-group ${industryActive ? "active" : ""} ${isMobileFilterActive ? "mobile-active" : ""}`}>
          <SearchBox
            className="searchbox"
            translations={{
              placeholder: 'Search Resources',
            }}
          />
            <FilterDropdown
              attribute="industry"
              open={isIndustryFilterOpen}
              active={industryActive}
              toggle={toggleIndustry}
            />

          { (industryActive === 1) && (
            <FilterDropdown
              attribute="sub_industry"
              open={isSubIndustryFilterOpen}
              active={subIndustryActive}
              toggle={toggleSubIndustry}
            />
          )}

          <FilterDropdown
            attribute="resource_type"
            open={isResourceFilterOpen}
            active={resourceActive}
            toggle={toggleResource}
          />

          <div className="search-footer">
            <div
              className="mobile-view-results-button"
              onClick={toggleMobileFiltering}
            >
              <span>View Results (<CustomStateResults />)</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchOptions;
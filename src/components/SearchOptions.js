import React, { useEffect, useState } from 'react';
import {
  SearchBox,
} from 'react-instantsearch-dom';

import FilterDropdown from './FilterDropdown';

const SearchOptions = ({ props }) => {

  const [isIndustryFilterOpen, setIsIndustryFilterOpen] = useState(0);
  const [isSubIndustryFilterOpen, setIsSubIndustryFilterOpen] = useState(0);
  const [isResourceFilterOpen, setIsResourceFilterOpen] = useState(0);

  const [industryActive, setIndustryActive] = useState(0);
  const [subIndustryActive, setSubIndustryActive] = useState(0);
  const [resourceActive, setResourceActive] = useState(0);

  useEffect(() => {
    if (props && props.refinementList) {
      (props.refinementList.industry) ? setIndustryActive(1) : setIndustryActive(0);
      (props.refinementList.sub_industry) ? setSubIndustryActive(1) : setSubIndustryActive(0);
      (props.refinementList.resource_type) ? setResourceActive(1) : setResourceActive(0);
    }
  }, [ props ])

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

  return (
    <div className="results-list">
      <div className={`results-list-group ${industryActive ? "active" : ""}`}>
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
      </div>
    </div>
  );
}

export default SearchOptions;
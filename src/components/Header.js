import React, { useEffect, useState } from 'react';
import CustomCurrentRefinements from './CurrentRefinements';

const Header = ({ props }) => {

  const [ isQueryActive, setIsQueryActive ] = useState(0);

  useEffect(() => {
    if ( (props.refinementList.industry && props.refinementList.industry.length) || (props.refinementList.sub_industry && props.refinementList.sub_industry.length) || (props.refinementList.resource_type && props.refinementList.resource_type.length)) {
      setIsQueryActive(1)
    } else {
      setIsQueryActive(0)
    }
  }, [props, setIsQueryActive])

  if (!isQueryActive) {
    return (
      <div className="resource-finder-header">
        <div className="resource-finder-header-title">
          <h2>Find Resources for your Industry</h2>
        </div>
      </div>
    )
  } else {
    return (
      <div className="resource-finder-header">
        <div className="resource-finder-header-title">
          <h2>Results for:</h2>
        </div>
        <div className="refinements">
          <CustomCurrentRefinements />
        </div>
      </div>
    )
  }



}

export default Header;
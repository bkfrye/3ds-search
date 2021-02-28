import React from 'react';
import {
  connectCurrentRefinements,
} from 'react-instantsearch-dom';

const CurrentRefinements = ({ items, refine }) => {

  const nameToColor = (str) => {
    return str.replace(/[^A-Z]+/ig, '-').toLowerCase();
  }

  return (
    <div className="ais-CurrentRefinements">
      <ul className="ais-CurrentRefinements-list">
        {items.map(item => (
          <li
            key={item.label}
            className={`ais-CurrentRefinements-item ${item.label.replace(/[:]/g,'')}`}
          >
            {item.items && (
              <>
                {item.items.map(nested => (
                  <span
                    key={nested.label}
                    className={`ais-CurrentRefinements-category ${nameToColor(nested.label)}`}

                  >
                    <span className="ais-CurrentRefinements-categoryLabel">{nested.label}</span>
                    <div
                      className="ais-CurrentRefinements-delete"
                      onClick={evt => {
                        evt.preventDefault();
                        refine(nested.value);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="15.443" height="15.443" viewBox="0 0 15.443 15.443">
                        <g transform="translate(0.354 0.354)">
                          <line style={{ stroke: `#fff` }} x2="14.736" y2="14.736"/>
                          <line style={{ stroke: `#fff` }} y1="14.736" x2="14.736"/>
                        </g>
                      </svg>
                    </div>
                  </span>
                ))}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

const CustomCurrentRefinements = connectCurrentRefinements(CurrentRefinements);
export default CustomCurrentRefinements;
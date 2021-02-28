import {
  connectRefinementList,
} from 'react-instantsearch-dom';

const RefinementList = ({ items, currentRefinement, refine }) => (
  <ul className="ais-RefinementList-list">
    {items.map(item => (
        <li
          key={item.label}
          className={`ais-RefinementList-item ${item.isRefined ? 'ais-RefinementList-item--selected' : ''} `}
          onClick={event => {
            event.preventDefault();
            refine(item.value);
          }}
        >
        <span className="ais-RefinementList-label">
          <span className="ais-RefinementList-labelText">{item.label}</span>
          <span className="ais-RefinementList-count">({item.count})</span>
        </span>
      </li>
    ))}
  </ul>
);

const CustomRefinementList = connectRefinementList(RefinementList);
export default CustomRefinementList;



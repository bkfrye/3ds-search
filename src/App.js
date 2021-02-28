import React from 'react';
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import withURLSync from './URLSync';
import CustomResults from './components/CustomResults';
import Header from './components/Header';
import SearchOptions from './components/SearchOptions';
import './styles/App.scss';

import Helmet from 'react-helmet';


const searchClient = algoliasearch(
  '2K2AJITPNU',
  '728e5e0d936d5e2cca8761c5cb5eb2c2'
);


const App = (props) => {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" media="all" href="https://www.3dsystems.com/sites/default/files/css/css_de_cqvMSwGi7GTGMa02QhCZbw3AQZMLCLnWFJaoOwVM.css" />
        <link rel="stylesheet" media="all" href="https://www.3dsystems.com/sites/default/files/css/css_X2xH7erch99FmianGy2fXa6fhNQuU0YIgI1dwWe1kj8.css" />
      </Helmet>
      <div className="resource-finder">
        <InstantSearch
          searchClient={searchClient}
          indexName="resource_finder_en"
          searchState={props.searchState}
          createURL={props.createURL}
          onSearchStateChange={props.onSearchStateChange}
        >
          <Configure
            hitsPerPage={10}
            filters="resource_type:'Reseller Seminar' OR resource_type:'Trade Show' OR resource_type:'Customer Story' OR resource_type:'Webinar' OR resource_type:'eBook' OR resource_type:'Partner Seminar' OR resource_type:'Technology Guide' OR resource_type:'Application'"
          />
          <Header props={props.searchState}/>
          <SearchOptions props={props.searchState}/>
          <CustomResults />
        </InstantSearch>
      </div>
    </>
  );
};



export default withURLSync(App);

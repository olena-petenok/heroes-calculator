import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Index from '../Index/Index';

// import DataDocumentTitles from '../../constants/json/.........json';
// import {  } from '../../utils/helper.js';

function Page(props) {
  const page = props.page;
  // const titles = DataDocumentTitles;
  // useEffect(() => { document.title = `${titles[page] || titles['default']}`; }, [page]);

  const pages = {
    'index': <Index />,
    'default': <Index />
  };

  return (
    <>
      <Header />
      {pages[page] || pages['default']}
      <Footer />
    </>
  );
}

Page.propTypes = { page: PropTypes.string };
Page.defaultProps = { page: 'index' };

export default Page;

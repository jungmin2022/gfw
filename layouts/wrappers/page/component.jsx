import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Loader, MediaContextProvider } from 'gfw-components';

import { usePageTrack } from 'analytics';
import { useSetLanguage } from 'utils/lang';

import Head from 'layouts/wrappers/head';

import Header from 'components/header';
import Footer from 'components/footer';
import Cookies from 'components/cookies';
import ContactUsModal from 'components/modals/contact-us';

import './styles.scss';

const PageWrapper = ({
  children,
  showFooter,
  title,
  description,
  noIndex,
  metaTags,
}) => {
  usePageTrack();
  useSetLanguage();

  // if a page is statically built with fallback true and not cached
  // we show a loader while the staticProps are fetched
  const { isFallback } = useRouter();

  return (
    <MediaContextProvider>
      <Head
        title={title}
        description={description}
        noIndex={noIndex}
        metaTags={metaTags}
      />
      <div className="l-page">
        <Header />
        <div className="content-wrapper">
          {isFallback ? <Loader /> : children}
        </div>
        {showFooter && <Footer />}
        <Cookies />
        <ContactUsModal />
      </div>
    </MediaContextProvider>
  );
};

PageWrapper.propTypes = {
  children: PropTypes.node,
  showFooter: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.string,
  noIndex: PropTypes.bool,
  metaTags: PropTypes.string,
};

PageWrapper.defaultProps = {
  showFooter: true,
};

export default PageWrapper;
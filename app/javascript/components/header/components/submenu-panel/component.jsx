import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { NavLink } from 'redux-first-router-link';

import Icon from 'components/ui/icon';
import Search from 'components/ui/search';

import moreIcon from 'assets/icons/more.svg';

import MyGfwLogin from 'components/mygfw-login';
import DropdownMenu from '../dropdown-menu';

import './styles.scss';

class Header extends PureComponent {
  state = {
    search: ''
  };

  handleSubmit = () => {
    window.location.href = `${window.location.origin}/search?query=${
      this.state.search
    }`;
  };

  handleSearchChange = search => {
    this.setState({ search });
  };

  render() {
    const {
      className,
      apps,
      moreLinks,
      showSubmenu,
      onClick,
      isMobile,
      navMain,
      activeLang,
      languages,
      myGfwLinks,
      handleLangSelect,
      loggedIn,
      toggleContactUs,
      hideMenu
    } = this.props;

    return (
      <div
        className={cx(
          'c-submenu-panel',
          { 'full-screen': showSubmenu },
          className
        )}
        onClick={onClick}
        role="button"
        tabIndex={0}
      >
        <div className="submenu-wrapper">
          <Search
            className="menu-search"
            placeholder="Search"
            onChange={this.handleSearchChange}
            onSubmit={this.handleSubmit}
          />
          {isMobile && (
            <div className="menu-section">
              <DropdownMenu
                className="sub-menu -plain"
                options={navMain}
                hideMenu={hideMenu}
              />
            </div>
          )}
          {isMobile && (
            <div className="menu-section">
              <h4>Select a language</h4>
              <DropdownMenu
                className="sub-menu -plain"
                options={languages}
                selected={activeLang}
                handleSelect={lang => {
                  handleLangSelect(lang);
                }}
              />
            </div>
          )}
          {isMobile && (
            <div className="menu-section">
              <h4>My GFW</h4>
              {loggedIn ? (
                <DropdownMenu
                  className="sub-menu -plain"
                  options={myGfwLinks}
                />
              ) : (
                <MyGfwLogin plain />
              )}
            </div>
          )}
          <div className="menu-section">
            <h4>Other applications</h4>
            <div className="apps-slider">
              {apps &&
                apps.map(d => (
                  <a
                    key={d.label}
                    href={d.path}
                    target="_blank"
                    rel="noopener nofollower"
                    className="app-card"
                  >
                    <div
                      className="app-image"
                      style={{ backgroundImage: `url('${d.image}')` }}
                    />
                  </a>
                ))}
              <a
                href="https://developers.globalforestwatch.org"
                target="_blank"
                rel="noopener noreferrer"
                className="app-card"
              >
                <div className="all-apps">
                  <Icon className="icon-more" icon={moreIcon} />
                  Explore all apps
                </div>
              </a>
            </div>
          </div>
          <div className="menu-section">
            <h4>More in GFW</h4>
            <ul className="row more-links">
              {moreLinks.map(m => (
                <li key={m.label} className="column small-12 medium-4 large-3">
                  {m.path ? (
                    <NavLink to={m.path} onClick={hideMenu}>
                      <Icon icon={m.icon} />
                      {m.label}
                    </NavLink>
                  ) : (
                    <a
                      href={m.extLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon icon={m.icon} />
                      {m.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="legal-section">
            <a className="title" href="/terms">
              Terms
            </a>
            <a className="title" href="/privacy-policy">
              Privacy Policy
            </a>
            <button className="title" onClick={() => toggleContactUs(true)}>
              Contact us
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  className: PropTypes.string,
  apps: PropTypes.array,
  moreLinks: PropTypes.array,
  showSubmenu: PropTypes.bool,
  onClick: PropTypes.func,
  isMobile: PropTypes.bool,
  navMain: PropTypes.array,
  activeLang: PropTypes.object,
  languages: PropTypes.array,
  myGfwLinks: PropTypes.array,
  hideMenu: PropTypes.func,
  handleLangSelect: PropTypes.func,
  toggleContactUs: PropTypes.func,
  loggedIn: PropTypes.bool
};

export default Header;

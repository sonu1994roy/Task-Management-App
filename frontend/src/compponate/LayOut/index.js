import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar'
import Footer from './Footer'
import SideNave from './sideNave'
export default function Layout({ children }) {
  const location = useLocation();
  const [isFullPageLayout, setIsFullPageLayout] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false)

const toggle = (()=>{
  setToggleMenu(!toggleMenu)
})

  useEffect(() => {
    onRouteChanged();
  }, [location]);

  const onRouteChanged = () => {
    const body = document.querySelector('body');
    if (location.pathname === '/layout/RtlLayout') {
      body.classList.add('rtl');
      // i18n.changeLanguage('ar');
    } else {
      body.classList.remove('rtl');
      // i18n.changeLanguage('en');
    }
    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = [
      '/',
    
    ];    
    for (let i = 0; i < fullPageLayoutRoutes.length; i++) {
      if (location.pathname !== fullPageLayoutRoutes[i]) {
        setIsFullPageLayout(true);
        break;
      } else {
        setIsFullPageLayout(false);
      }
    }
  };
  const renderFullPageContent = () => {
    // If it's a full-page layout, render only  || login and sinup 
    return <>{children}</>;
  };

  const renderGridContainer = () => {
    // If it's not a full-page layout, render with Navbar, Sidebar, Footer
    return (
      <div className="grid-container">
        <header className="header">
          <Navbar  click={toggle }/>
        </header>
        <aside className= {toggleMenu ? "aside active": "aside" }>
          <SideNave />
        </aside>
        <main className="main">
          {children}
        </main>
        <footer className="footer">
          <Footer />
        </footer>
      </div>
    );
  };

  return !isFullPageLayout ? renderFullPageContent() : renderGridContainer();
}
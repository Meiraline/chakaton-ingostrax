import React from 'react';
import './Layout.css';

function Layout({ children }) {
  return <div className="page-layout">{children}</div>;
}

export default Layout;

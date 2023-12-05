import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SideNav() {
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const [menuStates, setMenuStates] = useState(null);
  const [dropdownPaths, setDropdownPaths] = useState([]);

  useEffect(() => {
    const isAdmin = user?.role === 'admin';

    const userPaths = [
     { path: '/me/acount', name: 'Profile' },
      { path: '/password/update', name: 'Update Password' },
      { path: '/me/update', name: 'Update Profile' },
      { path: '/me/task', name: 'Task' },
    ];

    const adminPaths = [
      { path: '/Team/new-team', name: 'New Team' },
      { path: '/Team/list-team', name: 'List Team' },
      { path: '/task/create', name: 'Create Task' },
      { path: '/task/list', name: 'List Task' },
      { path: '/task/history', name: 'Task Completion History' },
    ];

    // Merge both admin and user paths 
    const paths = isAdmin ? [ ...userPaths ,...adminPaths ] : userPaths;
    setDropdownPaths(paths);

    paths.forEach((menu, index) => {
      if (menu.path === location.pathname) {
        setMenuStates(index);
      }
    });
  }, [location, user]);

  return (
    <>
      <ul className="aside_list">
        {dropdownPaths.map((menu, i) => (
          <li key={i} className={menuStates === i ? 'aside_list-item active' : 'aside_list-item'}>
            <Link className='nav-link' to={menu.path}>
              {menu.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default SideNav;

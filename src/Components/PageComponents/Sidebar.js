import { NavLink } from "react-router-dom";

const SidebarItem = ({ to, icon, text }) => (
  <li className='nav-item'>
    <NavLink to={to} className='nav-link'>
      <i className={`far fa-circle nav-icon ${icon ? "fas " + icon : ""}`}></i>
      <p>{text}</p>
    </NavLink>
  </li>
);

const SidebarMenu = ({ title, icon, items }) => (
  <li className='nav-item'>
    <a href='#' className='nav-link'>
      <i className={`nav-icon fas ${icon}`}></i>
      <p>
        {title}
        <i className='fas fa-angle-left right'></i>
      </p>
    </a>
    <ul className='nav nav-treeview'>
      {items.map((item, index) => (
        <SidebarItem key={index} {...item} />
      ))}
    </ul>
  </li>
);

const Sidebar = () => {
  return (
    <aside className='main-sidebar sidebar-dark-primary elevation-4'>
      <a href='/' className='brand-link'>
        <img
          src='dist/img/AdminLTELogo.png'
          alt='AdminLTE Logo'
          className='brand-image img-circle elevation-3'
          style={{ opacity: 0.8 }}
        />
        <span className='brand-text font-weight-light'>AdminLTE 3</span>
      </a>
      <div className='sidebar'>
        <div className='user-panel mt-3 pb-3 mb-3 d-flex'>
          <div className='image'>
            <img
              src='dist/img/user2-160x160.jpg'
              className='img-circle elevation-2'
              alt='UserImage'
            />
          </div>
          <div className='info'>
            <a href='/' className='d-block'>
              Alexander Pierce
            </a>
          </div>
        </div>

        <div className='form-inline'>
          <div className='input-group' data-widget='sidebar-search'>
            <input
              className='form-control form-control-sidebar'
              type='search'
              placeholder='Search'
              aria-label='Search'
            />
            <div className='input-group-append'>
              <button className='btn btn-sidebar'>
                <i className='fas fa-search fa-fw'></i>
              </button>
            </div>
          </div>
        </div>

        <nav className='mt-2'>
          <ul
            className='nav nav-pills nav-sidebar flex-column'
            data-widget='treeview'
            role='menu'
            data-accordion='false'
          >
            <li className='nav-item menu-open'>
              <NavLink to='/' className='nav-link'>
                <i className='nav-icon fas fa-tachometer-alt'></i>
                <p>Dashboard</p>
              </NavLink>
            </li>
            <SidebarMenu
              title='Manage Users'
              icon='fa-copy'
              items={[
                { to: "/users", text: "Users" },
                { to: "/user-type/user-role/B2B", text: "UnApproved Users" },
              ]}
            />
            <SidebarMenu
              title='Master Section'
              icon='fa-copy'
              items={[
                { to: "/work-types", text: "WorkType" },
                { to: "/education", text: "Education" },
                { to: "/roles", text: "Roles" },
                { to: "/units", text: "Units" },
                { to: "/services", text: "Services" },
              ]}
            />
            <SidebarMenu
              title='Material Section'
              icon='fa-copy'
              items={[
                { to: "brands", text: "Brands" },
                { to: "/budget", text: "Budget" },
                { to: "/project", text: "Projects" },
                { to: "/category", text: "Category" },
                { to: "/sub-category", text: "Sub Category" },
                { to: "/supplier", text: "Supplier" },
                { to: "/product", text: "Product" },
              ]}
            />
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

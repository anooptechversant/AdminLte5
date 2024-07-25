import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside class='main-sidebar sidebar-dark-primary elevation-4'>
      <a href='/' class='brand-link'>
        <img
          src='dist/img/AdminLTELogo.png'
          alt='AdminLTE Logo'
          class='brand-image img-circle elevation-3'
          style={{ opacity: 0.8 }}
        />
        <span class='brand-text font-weight-light'>AdminLTE 3</span>
      </a>
      <div class='sidebar'>
        <div class='user-panel mt-3 pb-3 mb-3 d-flex'>
          <div class='image'>
            <img
              src='dist/img/user2-160x160.jpg'
              class='img-circle elevation-2'
              alt='UserImage'
            />
          </div>
          <div class='info'>
            <a href='/' class='d-block'>
              Alexander Pierce
            </a>
          </div>
        </div>

        <div class='form-inline'>
          <div class='input-group' data-widget='sidebar-search'>
            <input
              class='form-control form-control-sidebar'
              type='search'
              placeholder='Search'
              aria-label='Search'
            />
            <div class='input-group-append'>
              <button class='btn btn-sidebar'>
                <i class='fas fa-search fa-fw'></i>
              </button>
            </div>
          </div>
        </div>

        <nav class='mt-2'>
          <ul
            class='nav nav-pills nav-sidebar flex-column'
            data-widget='treeview'
            role='menu'
            data-accordion='false'
          >
            <li class='nav-item menu-open'>
              <NavLink to='/' className='nav-link'>
                <i class='nav-icon fas fa-tachometer-alt'></i>
                <p>Dashboard</p>
              </NavLink>
            </li>
            <li class='nav-item'>
              <a href='#' class='nav-link'>
                <i class='nav-icon fas fa-copy'></i>
                <p>
                  Master Section
                  <i class='fas fa-angle-left right'></i>
                </p>
              </a>
              <ul class='nav nav-treeview'>
                <li class='nav-item'>
                  <NavLink to='/work-types' className='nav-link'>
                    <i class='far fa-circle nav-icon '></i>
                    <p>WorkType</p>
                  </NavLink>
                </li>
                <li class='nav-item'>
                  <NavLink to='/education' className='nav-link'>
                    <i class='far fa-circle nav-icon'></i>
                    <p>Education</p>
                  </NavLink>
                </li>
                <li class='nav-item'>
                  <NavLink to='/roles' className='nav-link'>
                    <i class='far fa-circle nav-icon'></i>
                    <p>Roles</p>
                  </NavLink>
                </li>
                <li class='nav-item'>
                  <NavLink to='/units' className='nav-link'>
                    <i class='far fa-circle nav-icon'></i>
                    <p>Units</p>
                  </NavLink>
                </li>
                <li class='nav-item'>
                  <NavLink to='/services' className='nav-link'>
                    <i class='far fa-circle nav-icon'></i>
                    <p>Services</p>
                  </NavLink>
                </li>
              </ul>
            </li>
            <li class='nav-item'>
              <a href='#' class='nav-link'>
                <i class='nav-icon fas fa-copy'></i>
                <p>
                  Material Section
                  <i class='fas fa-angle-left right'></i>
                </p>
              </a>
              <ul class='nav nav-treeview'>
                <li class='nav-item'>
                  <NavLink to='brands' className='nav-link'>
                    <i class='far fa-circle nav-icon '></i>
                    <p>Brands</p>
                  </NavLink>
                </li>
                <li class='nav-item'>
                  <NavLink to='/budget' className='nav-link'>
                    <i class='far fa-circle nav-icon'></i>
                    <p>Budget</p>
                  </NavLink>
                </li>
                <li class='nav-item'>
                  <NavLink to='/project' className='nav-link'>
                    <i class='far fa-circle nav-icon'></i>
                    <p>Projects</p>
                  </NavLink>
                </li>
                <li class='nav-item'>
                  <NavLink to='/category' className='nav-link'>
                    <i class='far fa-circle nav-icon'></i>
                    <p>Category</p>
                  </NavLink>
                </li>
                <li class='nav-item'>
                  <NavLink to='/sub-category' className='nav-link'>
                    <i class='far fa-circle nav-icon'></i>
                    <p>Sub Category</p>
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

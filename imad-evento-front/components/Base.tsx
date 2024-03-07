export default function Base({active}){
    return(
        <>
      <header id="header" className=" overflow-hidden">
        <div className=" flex justify-between  px-52">
          <div id="logo" className="pull-left">
            <a href="#intro" className="scrollto">
              <img src="img/logo.png" alt="" title="" />
            </a>
          </div>
          <nav id="nav-menu-container">
            <ul className="nav-menu  border-t-4 border-b  pt-.5  border-white shadow-md rounded-md">
            <li className={active === 1 ? "menu-active mt-1" : ""}>
                <a href="#intro" className={active === 1 ? "" : ""}>Home</a>
              </li>
              <li className={active === 2 ? "menu-active mt-1" : ""}>
                <a href="#about" className={active === 1 ? "" : ""}>
                  Events
                </a>
              </li>
              <li className={active === 3 ? "menu-active mt-1" : ""}>
                <a href="#speakers" className={active === 1 ? "" : ""}>
                  Organizers
                </a>
              </li>
              <li className={active === 4 ? "menu-active mt-1" : ""}>
                <a href="#schedule" className={active === 1 ? "" : ""}>
                  Reservations
                </a>
              </li>
              <li className="buy-tickets mt-1 ">
                <a href="#buy-tickets">Workspace</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      
      
      </>
    )
}
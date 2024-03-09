import * as components from "@/components/modules"
import Link from "next/link";
import { useEffect, useState } from "react";


export default function Base({active}){
 const [Role,setRole] = useState<boolean | string>(false);

 useEffect(() => {
  components.getCookie('token')
      .then((myCookie) => {
          console.log(myCookie);
          if (!myCookie) return;
          console.log(myCookie + '-k');
          setRole(myCookie);
      });
}, []);
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
                <Link href="./" className={active === 1 ? "" : ""}>Home</Link>
              </li>
              <li className={active === 2 ? "menu-active mt-1" : ""}>
                <Link href="./Events" className={active === 1 ? "" : ""}>
                  Events
                </Link>
              </li>
              <li className={active === 3 ? "menu-active mt-1" : ""}>
                <Link href="./Organizers" className={active === 1 ? "" : ""}>
                  Organizers
                </Link>
              </li>
              <li className={active === 4 ? "menu-active mt-1" : ""}>
                <Link href="./Reservations" className={active === 1 ? "" : ""}>
                  Reservations
                </Link>
              </li>

              <li className="buy-tickets mt-1 ">
                {
                  !Role ?
                  
                  <Link  href="./">Se connecter</Link>
                  :
                    (Role === 'user' ?
                    <Link  href="./">Logout</Link>
                      :
                      (Role === 'organizer' ?
                      <Link  href="./Workspace">Workspace</Link>
                        :
                        null
                      )
                    )
                }

              </li>
            </ul>
          </nav>
        </div>
      </header>

      
      
      </>
    )
}
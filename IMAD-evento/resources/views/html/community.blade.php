<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>El evento</title>
  <link rel="shortcut icon" type="image/png" href="../assets/images/logos/logo.png" />
  <link rel="stylesheet" href="../assets/css/styles.min.css" />
</head>

<body>
  <!--  Body Wrapper -->
  <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
    data-sidebar-position="fixed" data-header-position="fixed">
    <!-- Sidebar Start -->
    <aside class="left-sidebar">
      <!-- Sidebar scroll-->
      <div>
        <div class="brand-logo d-flex align-items-center justify-content-between">
          <a href="./index.html" class="text-nowrap logo-img">
            <img src="../assets/images/logos/logo.png" width="180" alt="" />
          </a>
          <div class="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
            <i class="ti ti-x fs-8"></i>
          </div>
        </div>
        <!-- Sidebar navigation-->
        <nav class="sidebar-nav scroll-sidebar" data-simplebar="">
          <ul id="sidebarnav">
            <li class="nav-small-cap">
              <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
              <span class="hide-menu">Home</span>
            </li>
            <li class="sidebar-item">
              <a class="sidebar-link" href="./" aria-expanded="false">
                <span>
                  <i class="ti ti-layout-dashboard"></i>
                </span>
                <span class="hide-menu">Dashboard</span>
              </a>
            </li>
            <li class="nav-small-cap">
              <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
              <span class="hide-menu">Community</span>
            </li>
            <li class="sidebar-item">
              <a class="sidebar-link" href="./community" aria-expanded="false">
                <span>
                  <i class="ti ti-article"></i>
                </span>
                <span class="hide-menu">Opinions</span>
              </a>
            </li>
           
           
          
            
            
          </ul>
          
        </nav>
        <!-- End Sidebar navigation -->
      </div>
      <!-- End Sidebar scroll-->
    </aside>
    <!--  Sidebar End -->
    <!--  Main wrapper -->
    <div class="body-wrapper">
      <!--  Header Start -->
      
      <!--  Header End -->
      <div class="container-fluid">
        <div class="container-fluid">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title fw-semibold mb-4">Categories Requested</h5>
              <div class="card">
                <div class="card-body p-4">
                  
                <div class="container ">
                  <input type="text" name="text" class="input" placeholder="Likes Number">
                  <button class="search__btn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22">
                      <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z" fill="#efeff1"></path>
                    </svg>
                  </button>
                </div>
                @foreach($requestedcategories as $cat)
                    <form action="{{ route('categorie.add', ['cat' => $cat->id]) }}" method="post">
                        @csrf
                        <button type="submit" class="btn btn-outline-secondary m-1">{{$cat->name}}</button>
                    </form>
                @endforeach

                  
                <style>
                  .container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  margin-bottom:20px;
}

.input {
  max-width: 190px;
  height: 100%;
  outline: none;
  font-size: 14px;
  font-weight: 500;
  background-color: #53535f;
  caret-color: #f7f7f8;
  color: #fff;
  padding: 7px 10px;
  border: 2px solid transparent;
  border-top-left-radius: 7px;
  border-bottom-left-radius: 7px;
  margin-right: 1px;
  transition: all .2s ease;
}

.input:hover {
  border: 2px solid rgba(255, 255, 255, 0.16);
}

.input:focus {
  border: 2px solid #a970ff;
  background-color: #0e0e10;
}

.search__btn {
  border: none;
  cursor: pointer;
  background-color: rgba(42, 42, 45, 1);
  border-top-right-radius: 7px;
  border-bottom-right-radius: 7px;
  height: 100%;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search__btn:hover {
  background-color: rgba(54, 54, 56, 1);
}
                </style>
                </div>
              </div>
              <h5 class="card-title fw-semibold mb-4">Community Opinions</h5>
              <div class="card mb-0">
                <div class="card-body p-4">
                  @foreach($chats as $cat)
                  <button type="button" class="btn btn-outline-warning m-1">{{$cat->msg}}</button>
                @endforeach 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        </div>
        
      </div>
    </div>
  </div>
  <script src="../assets/libs/jquery/dist/jquery.min.js"></script>
  <script src="../assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
  <script src="../assets/js/sidebarmenu.js"></script>
  <script src="../assets/js/app.min.js"></script>
  <script src="../assets/libs/apexcharts/dist/apexcharts.min.js"></script>
  <script src="../assets/libs/simplebar/dist/simplebar.js"></script>
  <script src="../assets/js/dashboard.js"></script>
</body>

</html>
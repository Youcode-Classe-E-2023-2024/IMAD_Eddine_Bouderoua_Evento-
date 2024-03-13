<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>El EvenTo</title>
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
        <!--  Row 1 -->
        <div class="row">
          <div class="col-lg-8 d-flex align-items-strech">
            <div class="card w-100 ">
              <div class="card-body">
                <div class="d-sm-flex d-block align-items-center justify-content-between mb-9">
                  <div class="mb-3 mb-sm-0">
                    <h5 class="card-title fw-semibold">Network Overview</h5>
                  </div>
                 
                </div>
                <div id="chart"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          
          <div class="col-lg-8 d-flex align-items-stretch">
            <div class="card w-100">
              <div class="card-body p-4">
                <h5 class="card-title fw-semibold mb-4">Manage Users</h5>
                <div class="table-responsive">
                  <table class="table text-nowrap mb-0 align-middle">
                    <thead class="text-dark fs-4">
                      <tr>
                        <th class="border-bottom-0">
                          <h6 class="fw-semibold mb-0">id</h6>
                        </th>
                        <th class="border-bottom-0">
                          <h6 class="fw-semibold mb-0">UserName</h6>
                        </th>
                        <th class="border-bottom-0">
                          <h6 class="fw-semibold mb-0">Useremail</h6>
                        </th>
                        <th class="border-bottom-0">
                          <h6 class="fw-semibold mb-0">Role</h6>
                        </th>
                        <th class="border-bottom-0 bg-red-600">
                          <h6 class="fw-semibold bg-red-600 mb-0">Delete</h6>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      @foreach($users as $user)
                          <tr>
                              <td class="border-bottom-0">
                                  <h6 class="fw-semibold mb-0">{{ $user->id }}</h6>
                              </td>
                              <td class="border-bottom-0">
                                  <h6 class="fw-semibold mb-0">{{ $user->name }}</h6>
                              </td>
                              <td class="border-bottom-0">
                                  <h6 class="fw-semibold mb-0">{{ $user->email }}</h6>
                              </td>
              
                              <td class="border-bottom-0">
                                <div class="d-flex align-items-center gap-2">
                                <form action="{{ route('update.role', $user) }}" method="post">
                                      @csrf
                                      @method('post')
                                      <button class="badge {{ $user->organizer == 1.00 ? 'bg-secondary' : 'bg-success' }} rounded-3 fw-semibold">
                                          {{ $user->organizer == 1.00 ? 'Organizer' : 'User' }}
                                      </button>
                                  </form>

                                </div>
                              </td>
                              
                              
                              <td class="border-bottom-0 bg-red-600">
                                <form action="{{ route('delete.user', ['id' => $user->id]) }}" method="post">
                                    @csrf
                                    @method('delete')
                                    <button class="badge bg-danger rounded-3 fw-semibold">
                                          delete
                                      </button>
                                </form>
                            </td>
                          </tr>
                      @endforeach
                  </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row border">
        @foreach($events as $event)
    <div class="col-sm-6 col-xl-3">
      <div class="card overflow-hidden rounded-2">
        <div class="position-relative">
          <a href="javascript:void(0)"><img src="http://127.0.0.1:8000/api/photo/{{$event->photo}}" class="card-img-top rounded-0 " alt="..."></a>
          
          <button  class="bg-danger rounded-circle  text-white d-inline-flex position-absolute top-0 end-0 mb-n3 " data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add To Cart"><img width="30" height="30" src="https://img.icons8.com/ios-filled/30/cancel-2.png" alt="cancel-2"/></button>

          <form action="{{ route('acceptevent', $event) }}" method="POST">
          @csrf
          @method('POST')
          <button type="submit" class="bg-success rounded-circle p-1 text-white d-inline-flex position-absolute bottom-0 end-0 mb-n3 me-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Accept Event">
              <img width="24" height="24" src="https://img.icons8.com/external-tal-revivo-bold-tal-revivo/24/external-approved-checkmark-symbol-to-verify-the-result-basic-bold-tal-revivo.png" alt="external-approved-checkmark-symbol-to-verify-the-result-basic-bold-tal-revivo"/>
          </button>
      </form>
        </div>
        <div class="card-body pt-3 p-4">
          <h6 class="fw-semibold fs-4">{{$event->title}}</h6>
          <div class="d-flex align-items-center justify-content-between">
            <h6 class="fw-semibold fs-4 mb-0">$50 <span class="ms-2 fw-normal text-muted fs-3"><del>{{$event->price}}</del></span></h6>
            <h6 class="fw-semibold fs-4">{{$event->organizer}}</h6>
          </div>
        </div>
      </div>
    </div>
  @endforeach

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

<script>
  var dayTotalsArray = @json($dayTotalsArray);

// Log the array to the console
console.log(dayTotalsArray);
  $(function () {


// =====================================
// Profit
// =====================================
var chart = {
  series: [
    { name: "Expense this month:", data: [280, 250, 325, 215, 250, 310, 280, 250] },
    { name: "Expense this month:", data: [
                {{ $dayTotalsArray['monday'] }},
                {{ $dayTotalsArray['tuesday'] }},
                {{ $dayTotalsArray['wednesday'] }},
                {{ $dayTotalsArray['thursday'] }},
                {{ $dayTotalsArray['friday'] }},
                {{ $dayTotalsArray['saturday'] }},
                {{ $dayTotalsArray['sunday'] }}
            ]}
  ],

  chart: {
    type: "bar",
    height: 345,
    offsetX: -15,
    toolbar: { show: true },
    foreColor: "#adb0bb",
    fontFamily: 'inherit',
    sparkline: { enabled: false },
  },


  colors: ["#5D87FF", "#49BEFF"],


  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "35%",
      borderRadius: [6],
      borderRadiusApplication: 'end',
      borderRadiusWhenStacked: 'all'
    },
  },
  markers: { size: 0 },

  dataLabels: {
    enabled: false,
  },


  legend: {
    show: false,
  },


  grid: {
    borderColor: "rgba(0,0,0,0.1)",
    strokeDashArray: 3,
    xaxis: {
      lines: {
        show: false,
      },
    },
  },

  xaxis: {
    type: "category",
    categories: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    labels: {
      style: { cssClass: "grey--text lighten-2--text fill-color" },
    },
  },


  yaxis: {
    show: true,
    min: 0,
    max: 400,
    tickAmount: 4,
    labels: {
      style: {
        cssClass: "grey--text lighten-2--text fill-color",
      },
    },
  },
  stroke: {
    show: true,
    width: 3,
    lineCap: "butt",
    colors: ["transparent"],
  },


  tooltip: { theme: "light" },

  responsive: [
    {
      breakpoint: 600,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 3,
          }
        },
      }
    }
  ]


};

var chart = new ApexCharts(document.querySelector("#chart"), chart);
chart.render();


// =====================================
// Breakup
// =====================================
var breakup = {
  color: "#adb5bd",
  series: [38, 40, 25],
  labels: ["2022", "2021", "2020"],
  chart: {
    width: 180,
    type: "donut",
    fontFamily: "Plus Jakarta Sans', sans-serif",
    foreColor: "#adb0bb",
  },
  plotOptions: {
    pie: {
      startAngle: 0,
      endAngle: 360,
      donut: {
        size: '75%',
      },
    },
  },
  stroke: {
    show: false,
  },

  dataLabels: {
    enabled: false,
  },

  legend: {
    show: false,
  },
  colors: ["#5D87FF", "#ecf2ff", "#F9F9FD"],

  responsive: [
    {
      breakpoint: 991,
      options: {
        chart: {
          width: 150,
        },
      },
    },
  ],
  tooltip: {
    theme: "dark",
    fillSeriesColor: false,
  },
};

var chart = new ApexCharts(document.querySelector("#breakup"), breakup);
chart.render();



// =====================================
// Earning
// =====================================
var earning = {
  chart: {
    id: "sparkline3",
    type: "area",
    height: 60,
    sparkline: {
      enabled: true,
    },
    group: "sparklines",
    fontFamily: "Plus Jakarta Sans', sans-serif",
    foreColor: "#adb0bb",
  },
  series: [
    {
      name: "Earnings",
      color: "#49BEFF",
      data: [25, 66, 20, 40, 12, 58, 20],
    },
  ],
  stroke: {
    curve: "smooth",
    width: 2,
  },
  fill: {
    colors: ["#f3feff"],
    type: "solid",
    opacity: 0.05,
  },

  markers: {
    size: 0,
  },
  tooltip: {
    theme: "dark",
    fixed: {
      enabled: true,
      position: "right",
    },
    x: {
      show: false,
    },
  },
};
new ApexCharts(document.querySelector("#earning"), earning).render();
})
</script>
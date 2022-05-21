import React from 'react'
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StoreIcon from "@mui/icons-material/Store";
import DescriptionIcon from "@mui/icons-material/Description";

function SideNav() {
  return (
    <nav class="main-menu">
      <div>
        <a class="logo" href="#">
          <img
            style={{ height: "5vh", paddingTop: "3vh" }}
            src="https://th.bing.com/th/id/R.7c69cbe7959df2182878a7db9a06f687?rik=pGqi8UgSDZWtxw&riu=http%3a%2f%2fjdh.on.ca%2fwp-content%2fuploads%2f2016%2f06%2fwarehouse-design-layout-icon.png&ehk=cqJbH51bCstx%2braQR7FK4D7oreXoYmWBq1ws73uZL4M%3d&risl=&pid=ImgRaw&r=0"
            alt="logo"
          />
        </a>
      </div>
      <div class="settings">
        <h1
          style={{ fontFamily: "whisper, cursive", color: "rgb(17, 136, 196)" }}
        >
          ProManage
        </h1>
      </div>
      <div class="scrollbar" id="style-1">
        <ul>
          <li>
            <a href="/home">
              <span className="fa-lg fa">
                <DashboardIcon />
              </span>
              <span class="nav-text">Dashboard</span>
            </a>
          </li>

          <li>
            <a href="/home/inventory/items">
              <span className="fa-lg fa">
                <AddShoppingCartIcon />
              </span>
              <span activeClassName="active" class="nav-text">Inventory</span>
            </a>
          </li>
          {/* <li>
            <a href="/home/sales/customers">
              <span className="fa-lg fa">
                <DescriptionIcon />
              </span>
              <span class="nav-text">Sales</span>
            </a>
          </li> */}

          <li>
            <a href="/home/purchase/Vendors">
              <span className="fa-lg fa">
                <StoreIcon />
              </span>
              <span class="nav-text">Purchase</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default SideNav
import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import axios from "axios";

// grid tooltip content display
function isOverflown(element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

const GridCellExpand = React.memo(function GridCellExpand(props) {
  const { width, value } = props;
  const wrapper = React.useRef(null);
  const cellDiv = React.useRef(null);
  const cellValue = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showFullCell, setShowFullCell] = React.useState(false);
  const [showPopper, setShowPopper] = React.useState(false);

  const handleMouseEnter = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current);
    setShowPopper(isCurrentlyOverflown);
    setAnchorEl(cellDiv.current);
    setShowFullCell(true);
  };

  const handleMouseLeave = () => {
    setShowFullCell(false);
  };

  React.useEffect(() => {
    if (!showFullCell) {
      return undefined;
    }

    function handleKeyDown(nativeEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === "Escape" || nativeEvent.key === "Esc") {
        setShowFullCell(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setShowFullCell, showFullCell]);

  return (
    <Box
      ref={wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        alignItems: "center",
        lineHeight: "24px",
        width: 1,
        height: 1,
        position: "relative",
        display: "flex",
      }}
    >
      <Box
        ref={cellDiv}
        sx={{
          height: 1,
          width,
          display: "block",
          position: "absolute",
          top: 0,
        }}
      />
      <Box
        ref={cellValue}
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {value}
      </Box>
      {showPopper && (
        <Popper
          open={showFullCell && anchorEl !== null}
          anchorEl={anchorEl}
          style={{ width, marginLeft: -17 }}
        >
          <Paper
            elevation={1}
            style={{ minHeight: wrapper.current.offsetHeight - 3 }}
          >
            <Typography variant="body2" style={{ padding: 8 }}>
              {value}
            </Typography>
          </Paper>
        </Popper>
      )}
    </Box>
  );
});

GridCellExpand.propTypes = {
  value: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

function renderCellExpand(params) {
  return (
    <GridCellExpand
      value={params.value || ""}
      width={params.colDef.computedWidth}
    />
  );
}

renderCellExpand.propTypes = {
  /**
   * The column of the row that the current cell belongs to.
   */
  colDef: PropTypes.object.isRequired,
  /**
   * The cell value, but if the column has valueGetter, use getValue.
   */
  value: PropTypes.string.isRequired,
};

// grid tooltip content display


export default function ItemTable() {
  
  const [ items, setItems ] = useState([]);

  const listItems = () => {
    var config = {
      method: "get",
      url: "/api/item",
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setItems(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
   listItems();
  }, [])

  // table data
const columns = [
  { field: "id", headerName: "ID", width: 30, renderCell: renderCellExpand },
  {
    field: "itemName",
    headerName: "Item name",
    width: 230,
    renderCell: renderCellExpand,
  },
  {
    field: "image",
    headerName: "Item Image",
    width: 150,
    renderCell: (params) => (
      <img style={{ height: "90px" }} src={params.value} />
    ),
  },
  { field: "unit", headerName: "Unit", width: 70 },
  {
    field: "weight",
    headerName: "Weight (g)",
    type: "number",
    width: 90,
    renderCell: renderCellExpand,
  },
  {
    field: "height",
    headerName: "Height (cm)",
    type: "number",
    width: 90,
    renderCell: renderCellExpand,
  },
  {
    field: "width",
    headerName: "Width (cm)",
    type: "number",
    width: 90,
    renderCell: renderCellExpand,
  },
  {
    field: "manufacturer",
    headerName: "Manufacturer",
    width: 130,
    renderCell: renderCellExpand,
  },
  {
    field: "group",
    headerName: "Group",
    width: 90,
    renderCell: renderCellExpand,
  },
  {
    field: "brand",
    headerName: "Brand",
    width: 90,
    renderCell: renderCellExpand,
  },
  {
    field: "sellingPrice",
    headerName: "S.P",
    width: 90,
    renderCell: renderCellExpand,
  },
  {
    field: "costPrice",
    headerName: "C.P",
    width: 90,
    renderCell: renderCellExpand,
  },
  {
    field: "openingStock",
    headerName: "O.Stock",
    width: 90,
    renderCell: renderCellExpand,
  },
  {
    field: "reorderPoint",
    headerName: "Reorder",
    width: 90,
    renderCell: renderCellExpand,
  },
  {
    field: "vendor",
    headerName: "Vendor",
    width: 90,
    renderCell: renderCellExpand,
  },
  {
    field: "description",
    headerName: "Item Description",
    minWidth: 350,
    resizable: true,
    renderCell: renderCellExpand,
  },
];

// table data
  
  return (
    <div style={{ padding: "5vh 0vw" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ height: 460, width: "100%" }}>
          <DataGrid
            rowHeight={100}
            rows={items}
            columns={columns}
            pageSize={3}
            rowsPerPageOptions={[3]}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
}

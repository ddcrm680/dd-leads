"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Download, Plus, Upload } from "lucide-react";
import {
  MaterialReactTable,
  MRT_ColumnFiltersState,
  MRT_ShowHideColumnsButton,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton,
  MRT_ToggleGlobalFilterButton,
  MRT_ToggleFiltersButton,
  useMaterialReactTable,
} from "material-react-table";
import { Loader } from "../loader";
import { Button } from "../../../ui/button";
import { useAuth } from "../../../lib/auth";
import { Menu, MenuItem } from "@mui/material";

export default function MaterialTanStackTable({
  columns,
  hideColumnFilterToggle = false,
  columnOrdering = false,
  isLoading,
  onRowClick,
  data,
  enableGrouping = false,
  enableRowSelection = false,
  expandedRowRender,
  filtersSlot,
  setDateRange,
  isExportLoading,
  enableExpand = false,
  tableBodyHeight = "",
  actions,
  setIsModalOpen,
  tabDisplayName,

  exportHandler,
  setPage,
  isAdd = false,
  onFilterChange,
  isExport = false,
  shouldTableStyleUpdate,
  page,
  searchValue = "",
  setSelectedRows,
  perPage = 2,
  onSearch,
  className = "",
  debounceDelay = 300,
}: any) {
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    [],
  );
  const storageKey = `table-column-order-${tabDisplayName}`;
  const [columnOrder, setColumnOrder] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];

    const saved = localStorage.getItem(storageKey);

    return saved ? JSON.parse(saved) : [];
  });
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const tableColumns = [
    ...columns.map((col: any) => ({
      ...col,
      enableColumnFilter: !!col.showFilter,
      enableColumnActions: col.showFilter || col.enableSorting !== false,
    })),

    ...(actions
      ? [
          {
            id: "actions",
            header: "Actions",
            size: 80,
            enableSorting: false,
            enableColumnFilter: false,
            Cell: ({ row }: any) => actions(row.original),
          },
        ]
      : []),
  ];

  useEffect(() => {
    setExpandedRows([]);
  }, [data]);
  const [localSearch, setLocalSearch] = useState(searchValue);
  // const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // 🔁 Keep local state in sync if parent changes search
  useEffect(() => {
    setLocalSearch(searchValue);
  }, [searchValue]);

  const [showFilters, setShowFilters] = useState(false);
  // ⏳ Debounce logic
  useEffect(() => {
    if (!hasUserTyped.current) return;

    const timer = setTimeout(() => {
      onSearch?.(localSearch);

      // ✅ RESET after firing search
      hasUserTyped.current = false;
    }, debounceDelay);

    return () => clearTimeout(timer);
  }, [localSearch, debounceDelay, onSearch]);

  const hasUserTyped = useRef(false);

  const [storeList, setStoreList] = useState<
    { value: string; label: string; isDisabled?: boolean }[]
  >([]);

  const hadDateFilter = useRef(false);

  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState({});
  const tableState: any = {
    globalFilter,
    columnFilters,
    rowSelection,
    isLoading,
    pagination: {
      pageIndex: page - 1,
      pageSize: perPage,
    },
  };
  if (columnOrdering) {
    tableState.columnOrder = columnOrder;
  }
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const table = useMaterialReactTable({
    positionActionsColumn: "last",
    columns: tableColumns,
    data,
    enableExpanding: enableExpand,
    positionToolbarAlertBanner: "none",
    getRowCanExpand: () => enableExpand,
    muiTablePaperProps: {
      elevation: 0,
      sx: {
        boxShadow: "none",
        borderRadius: 0,
        border: "none",
        background: "#fff",
      },
    },
    muiTableContainerProps: {
      sx: {
        border: "none",
        borderRadius: 0,
        boxShadow: "none",
        height: "calc(100vh - 140px)",
      },
    },

    renderDetailPanel:
      enableExpand && expandedRowRender
        ? ({ row }) => expandedRowRender(row.original)
        : undefined,
    manualPagination: true,
    manualFiltering: true,
    initialState: {
      density: "compact",
    },
    manualSorting: true,
    muiTableHeadCellProps: {
      sx: {
        background: "#fff",
        fontWeight: 600,
        fontSize: "14px",
        color: "#111827",
        borderBottom: "1px solid #e5e7eb",
        borderRight: "1px solid #e5e7eb",

        "& .Mui-TableHeadCell-Content": {
          justifyContent: "flex-start",
        },
      },
    },
    muiTableBodyCellProps: {
      sx: {
        fontSize: "14px",
        borderBottom: "1px solid #e5e7eb",
        borderRight: "1px solid #e5e7eb",
        padding: "8px 12px",
      },
    },
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => onRowClick?.(row.original),

      sx: {
        cursor: "pointer",
        height: 42,

        "&:hover": {
          background: "#fafafa",
        },
      },
    }),
    muiTopToolbarProps: {
      sx: {
        background: "#fff",
        borderBottom: "1px solid #e5e7eb",
        minHeight: 56,
        px: 1, // remove horizontal padding
        py: 0,

        "&.MuiToolbar-root": {
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
    },

    onColumnFiltersChange: (updater) => {
      const next =
        updater instanceof Function ? updater(columnFilters) : updater;

      setColumnFilters(next);

      const openingDate = next.find((f) => f.id === "opening_date");

      const nextRange = openingDate?.value as
        | [Date | null | undefined, Date | null | undefined]
        | undefined;

      const hasValue = !!(nextRange?.[0] || nextRange?.[1]);

      // User cleared the filter
      if (hadDateFilter.current && !hasValue) {
        hadDateFilter.current = false;

        setDateRange({
          startDate: null,
          endDate: null,
        });

        setPage(1);
        return;
      }

      // Ignore opening/closing popover when nothing is selected
      if (!hasValue) return;

      // User selected/changed a filter
      hadDateFilter.current = true;

      setDateRange({
        startDate: nextRange![0],
        endDate: nextRange![1],
      });

      setPage(1);
    },
    enableGlobalFilter: true,
    defaultColumn: {
      Cell: ({ cell }: any) => {
        const value = cell.getValue();

        return value === null || value === undefined || value === ""
          ? "-"
          : value;
      },
    },
    renderTopToolbarCustomActions: () => (
      <div className="flex !h-full items-center gap-3">
        {isAdd && (
          <>
            <div className="flex h-11 !items-center overflow-hidden  shadow-sm">
              {/* Main Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex h-8 items-center gap-2 bg-[#2E9148] rounded-l-[4px] px-4 text-sm font-medium text-white hover:bg-[#25773b]"
              >
                <Plus size={18} />
                {tabDisplayName || "Lead"}
              </button>

              {/* Dropdown */}
              <button
                onClick={handleMenuOpen}
                className="flex h-8 w-8 items-center justify-center border-l rounded-r-[4px] border-green-700 bg-[#2E9148] text-white hover:bg-[#25773b]"
              >
                <ChevronDown size={18} />
              </button>
            </div>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              slotProps={{
                paper: {
                  sx: {
                    mt: 1,
                    width: 220,
                    borderRadius: "8px",
                    boxShadow:
                      "0 8px 24px rgba(16,24,40,.12), 0 2px 8px rgba(16,24,40,.08)",
                    "& .MuiMenuItem-root": {
                      fontSize: 14,
                      gap: 1.5,
                    },
                  },
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  console.log("Import");
                }}
              >
                <Upload size={16} className="mr-0" />
                Import data
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  console.log("Export");
                }}
              >
                <Download size={16} className="mr-0" />
                Export data
              </MenuItem>
            </Menu>
          </>
        )}
      </div>
    ),

    enableRowSelection: enableRowSelection,
    onRowSelectionChange: (updater) => {
      const next =
        updater instanceof Function ? updater(rowSelection) : updater;

      setRowSelection(next);

      const ids = Object.keys(next)
        .filter((key) => next[key])
        .map((key) => data[Number(key)]?.id);

      setSelectedRows(ids);
    },
    enableColumnOrdering: columnOrdering,

    ...(columnOrdering && {
      onColumnOrderChange: (updater) => {
        const next =
          updater instanceof Function
            ? updater(columnOrder ?? table.getState().columnOrder)
            : updater;

        setColumnOrder(next); // <-- THIS IS MISSING

        localStorage.setItem(storageKey, JSON.stringify(next));
      },
    }),
    muiCircularProgressProps: {
      size: 30,
      thickness: 4,
      sx: {
        color: "#fe0000",
      },
    },
    muiDetailPanelProps: {
      sx: {
        p: 0,
        backgroundColor: "transparent",

        "& > td": {
          p: 0, // remove default MRT padding
          border: 0,
        },
      },
    },
    enableGrouping: enableGrouping,
    renderToolbarInternalActions: ({ table }) => (
      <>
        <MRT_ToggleGlobalFilterButton table={table} />

        {!hideColumnFilterToggle && <MRT_ToggleFiltersButton table={table} />}

        <MRT_ShowHideColumnsButton table={table} />
        <MRT_ToggleDensePaddingButton table={table} />
        <MRT_ToggleFullScreenButton table={table} />
      </>
    ),

    muiTableProps: {
      sx: {
        borderCollapse: "collapse",
        minWidth: "100%",
      },
    },
    muiBottomToolbarProps: {
      sx: {
        background: "#fff",
        borderTop: "1px solid #e5e7eb",
        borderRadius: 0,
        boxShadow: "none",
      },
    },
    muiSelectCheckboxProps: {
      size: "small",
    },
    state: tableState,

    onGlobalFilterChange: (value: any) => {
      setGlobalFilter(value);

      // call parent
      onSearch?.(value);

      // reset page
      setPage?.(1);
    },
  });
  return (
    <div className={`w-full  flex flex-col   ${" gap-3"} ${className}`}>
      {filtersSlot}
      {/* Table */}
      {
        <div
          className={`
    relative
    overflow-visible h-full
  `}
        >
          <MaterialReactTable table={table} />
        </div>
      }
    </div>
  );
}

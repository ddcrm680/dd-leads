// src/components/profile/profile.tsx
"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MRT_ColumnDef } from "material-react-table";
import { useToast } from "../../hooks/use-toast";
import { useAuth } from "../../lib/auth";
import { Card, CardContent } from "../../ui/card";

import { motion } from "framer-motion";
import MaterialTanStackTable from "../../components/common/Table/Tanstack";
import { leadList } from "../../utils/mockData";
import { Box } from "@mui/material";
import { useLocation } from "wouter";
import CommonDeleteModal from "../../components/common/CommonDeleteModal";
import { Edit2Icon, EyeIcon } from "lucide-react";
import CommonRowMenu from "../../components/common/CommonRowMenu";
import CommonAnimatedModal from "../../components/common/CommonAnimatedModal";
import { CommonModalInfo } from "../../types/common.type";
import LeadForm from "../../components/leads/Form";
import { AnimatePresence } from "framer-motion";
import AnimatedDrawer from "../../components/common/AnimatedDrawer";
import ViewEditContent from "../../components/leads/ViewEditContent";

export function Leads() {
  const { toast } = useToast();
  const {} = useAuth();
  const [customers, setCustomers] = useState<Array<any>>([]);
  const [perPage, setPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [total, setTotal] = useState(0);
  const [has_next, setHasNext] = useState(false);
  const [IsLeadModalOpenInfo, setIsLeadModalOpenInfo] =
    useState<CommonModalInfo>({
      open: {
        open: false,
        type: "",
      },
      info: {},
    });

  const [isExportLoading, setIsExportLoading] = useState(false);
  const [, navigate] = useLocation();
  const [filters, setFilters] = useState({
    status: "",
    store_id: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [lastPage, setLastPage] = useState(1);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [isListLoading, setIsListLoading] = useState(true);
  const [isCustomerDeleteModalInfo, setIsCustomerDeleteModalOpenInfo] =
    useState<{ open: boolean; info: any }>({
      open: false,
      info: {},
    });
  const PER_PAGE = 10;
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const CustomerDeleteHandler = async () => {
    try {
      setIsLoading(true);

      // await DeleteCustomer(isCustomerDeleteModalInfo?.info?.id);
      // toast({ title: `Delete Customer`, description: "Customer deleted successfully", variant: "success", });

      fetchCustomer(false);
    } catch (err: any) {
      // toast({
      //   title: "Error",
      //   description:
      //     err?.response?.data?.message ||
      //     err?.message ||
      //     `Failed to delete territory`,
      //   variant: "destructive",
      // });
    } finally {
      setIsCustomerDeleteModalOpenInfo({ open: false, info: {} });
      setIsLoading(false);
    }
  };
  useEffect(() => {
    console.log(selectedLead, "selectedLead");
  });
  const columns = useMemo<MRT_ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        size: 220,
        enableClickToCopy: true,
      },

      {
        accessorKey: "nextActivity",
        header: "Next Activity",
        size: 170,
        Cell: ({ cell }) => (
          <span
            className={`font-medium ${
              cell.getValue<string>() === "No activity"
                ? "text-amber-600"
                : "text-slate-700"
            }`}
          >
            {cell.getValue<string>()}
          </span>
        ),
      },

      {
        accessorKey: "labels",
        header: "Labels",
        size: 140,
        Cell: ({ cell }) => {
          const label = cell.getValue<string>();

          const color =
            label === "Hot"
              ? "bg-red-100 text-red-700"
              : label === "Warm"
                ? "bg-orange-100 text-orange-700"
                : label === "Cold"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-green-100 text-green-700";

          return (
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${color}`}
            >
              {label}
            </span>
          );
        },
      },

      {
        accessorKey: "sourceOrigin",
        header: "Source Origin",
        size: 180,
      },

      {
        accessorKey: "owner",
        header: "Owner",
        size: 140,
        Cell: ({ cell }) => (
          <span className="font-medium">{cell.getValue<string>()}</span>
        ),
      },
      {
        accessorKey: "leadCreated",
        header: " Created At",
        size: 180,
      },
    ],
    [navigate],
  );

  const fetchCustomer = async (isLoaderHide = false) => {
    try {
      if (!isLoaderHide) setIsListLoading(true);

      const res = leadList;
      const mappedTerritory = res?.data;
      setHasNext(res?.meta.has_next);
      setTotal(res?.meta.total);
      setCustomers(mappedTerritory);
      setLastPage(res?.meta.last_page);
    } catch (e: any) {
      console.error(e);
      // toast({
      //   title: "Error",
      //   description:
      //     e?.response?.data?.message ||
      //     e?.message ||
      //     "Failed to fetch customers.",
      //   variant: "destructive",
      // });
    } finally {
      if (!isLoaderHide) setIsListLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomer(false);
  }, [search, page, perPage, filters]);

  const DEFAULT_FILTERS = {
    store_id: "",
    startDate: null,
    endDate: null,

    status: "",
  };
  function resetFilter() {
    // if (
    //   !shouldResetFilters({
    //     search,
    //     page,
    //     filters: {
    //       status: filters.status,
    //       store_id: filters.store_id,
    //     },
    //     defaultFilters: DEFAULT_FILTERS,
    //   })
    // ) {
    //   return; // 🚫 no-op
    // }
    // setDateRange({
    //   startDate: DEFAULT_FILTERS.startDate,
    //   endDate: DEFAULT_FILTERS.endDate,
    // });
    // setSearch("");
    // setPage(1);
    // setFilters({
    //   status: "",
    //   store_id: "",
    // });
  }
  async function exportHandler() {
    if (isExportLoading) return;

    try {
      setIsExportLoading(true);

      const params: Record<string, any> = {};
      if (selectedRows.length > 0) params.selected_rows = selectedRows;

      if (search) params.search = search;
      if (filters.status !== "") params.status = filters.status;
      if (filters.store_id) params.store_id = filters.store_id;

      // if (dateRange?.startDate) {
      //   params.from_date = formatLocalDate(dateRange.startDate);
      // }

      // if (dateRange?.endDate) {
      //   params.to_date = formatLocalDate(dateRange.endDate);
      // }

      // await exporter("customer", params);
      // setSelectedRows([]);
      // toast({
      //   title: "Export",
      //   description: "Customers exported successfully",
      //   variant: "success",
      // });
    } catch (e: any) {
      console.error(e);
      // toast({
      //   title: "Export ",
      //   description:
      //     e?.response?.data?.message ||
      //     e?.message ||
      //     "Failed to export customers.",
      //   variant: "destructive",
      // });
    } finally {
      setIsExportLoading(false);
    }
  }
  const modalConfigMap: Record<
    string,
    {
      primaryText?: string;
      showPrimary?: boolean;
    }
  > = {
    create: {
      primaryText: "Add",
      showPrimary: true,
    },
  };
  return (
    <div>
      <div className="relative h-full">
        <MaterialTanStackTable
          isBorderHide={true}
          columns={columns}
          data={customers}
          enableRowSelection={true}
          // filtersPosition={
          //   shouldUseCompactLayout || tillTab
          //     ? ""
          //     : isMobile
          //       ? ""
          //       : "inline"
          // }
          rowIdKey="id"
          tabSearchWidth={"min-w-[320px]"}
          showFilters={true}
          hideColumnFilterToggle={true}
          selectedRows={selectedRows}
          expandedRowRender={(row: any) => (
            <div className="relative px-3 py-2 pl-[38px] bg-gray-50 border-t text-[10px]">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 w-[75px] shrink-0">Email</span>
                  <span className="text-gray-800">{row?.email || "-"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 w-[75px] shrink-0">
                    Address
                  </span>
                  <span className="text-gray-800 leading-snug">
                    {row?.address || "-"}
                  </span>
                </div>
              </div>
            </div>
          )}
          onSelectionChange={setSelectedRows}
          filters={filters}
          isAdd={true}
          perPage={perPage}
          isExport={true}
          viewType={"table"}
          shouldTableStyleUpdate={true}
          isExportLoading={isExportLoading}
          exportHandler={exportHandler}
          setPerPage={setPerPage}
          resetFilter={resetFilter}
          isLoading={isListLoading}
          total={total}
          setSelectedRows={setSelectedRows}
          hasNext={has_next}
          searchLabel=""
          showSearchLabel={true}
          tabDisplayName="Lead"
          isClear={true}
          page={page}
          setPage={setPage}
          lastPage={lastPage}
          onRowClick={(lead) => {
            setSelectedLead(lead);
          }}
          searchValue={search}
          onSearch={(value: string) => {
            // if (value) {
            setSearch(value);
            setPage(1); // reset page on new search
            // }
          }}
          setIsModalOpen={(value: boolean) => {
            setIsLeadModalOpenInfo({
              open: { open: true, type: "create" },
              info: value,
            });
          }}
          actions={(row: any) => (
            <CommonRowMenu
              items={[
                {
                  key: "view",
                  label: "View ",
                  icon: <EyeIcon size={16} />,
                  onClick: () => navigate(`/customers/view?id=${row.id}`),
                },
                {
                  key: "edit",
                  label: "Edit ",
                  icon: <Edit2Icon size={16} />,
                  onClick: () =>
                    navigate(`/customers/manage?id=${row.id}&mode=edit`),
                },
              ]}
            />
          )}
        />
        <AnimatedDrawer
          open={selectedLead}
          showBackdrop
          onClose={() => setSelectedLead(null)}
          side="right"
          width={1000}
        >
          <ViewEditContent></ViewEditContent>
        </AnimatedDrawer>
      </div>
      <CommonDeleteModal
        width="330px"
        maxWidth="330px"
        isOpen={isCustomerDeleteModalInfo.open}
        title="Delete Customer"
        description={`Are you sure you want to delete this customer? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isLoading}
        onCancel={() =>
          setIsCustomerDeleteModalOpenInfo({ open: false, info: {} })
        }
        onConfirm={CustomerDeleteHandler}
      />

      <CommonAnimatedModal
        closeOnBackdropClick={!isLoading}
        contentClassName={`  w-[95vw]
   sm:w-[calc(100vw-100px)]
   md:max-w-2xl`}
        isOpen={IsLeadModalOpenInfo.open.open}
        onClose={() => {
          setIsLeadModalOpenInfo({
            open: { open: false, type: "" },
            info: {},
          });
        }}
        showCloseIcon={true}
        title={`${modalConfigMap[IsLeadModalOpenInfo.open.type]?.primaryText} Lead`}
        isLoading={isLoading}
        primaryText={modalConfigMap[IsLeadModalOpenInfo.open.type]?.primaryText}
        showPrimary={false}
      >
        <LeadForm
          mode=""
          initialValues={IsLeadModalOpenInfo.info}
          isLoading={isLoading}
          onClose={() =>
            setIsLeadModalOpenInfo({
              open: { open: false, type: "" },
              info: {},
            })
          }
          onSubmit={(values, setError) => {
            // handler
          }}
        />
      </CommonAnimatedModal>
    </div>
  );
}

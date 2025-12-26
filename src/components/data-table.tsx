"use client";

import { useEffect, useMemo, useState } from "react";
import { Download, Filter, Search, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type DataTableColumn<T> = {
  key: keyof T;
  header: string;
  render?: (row: T) => React.ReactNode;
};

export type DataTableProps<T> = {
  title: string;
  data: T[];
  columns: DataTableColumn<T>[];
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onSearch: (query: string) => void;
  onSort: (key: keyof T) => void;
  onBulkAction?: (ids: string[], action: string) => void;
  rowId: (row: T) => string;
};

type SavedView = {
  name: string;
  query: string;
};

export function DataTable<T>({
  title,
  data,
  columns,
  total,
  page,
  pageSize,
  onPageChange,
  onSearch,
  onSort,
  onBulkAction,
  rowId
}: DataTableProps<T>) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [savedViews, setSavedViews] = useState<SavedView[]>([]);
  const totalPages = Math.ceil(total / pageSize);

  useEffect(() => {
    const stored = window.localStorage.getItem(`datatable:${title}`);
    if (stored) {
      setSavedViews(JSON.parse(stored));
    }
  }, [title]);

  const selectedIds = useMemo(() => Object.keys(selected).filter((id) => selected[id]), [selected]);

  const exportCsv = () => {
    const header = columns.map((col) => col.header).join(",");
    const rows = data
      .map((row) =>
        columns
          .map((col) => {
            const value = col.render ? col.render(row) : String(row[col.key]);
            return `"${String(value).replaceAll('"', '""')}"`;
          })
          .join(",")
      )
      .join("\n");
    const blob = new Blob([`${header}\n${rows}`], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.toLowerCase().replace(/\s+/g, "-")}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const saveView = () => {
    if (!query.trim()) return;
    const next = [...savedViews, { name: `View ${savedViews.length + 1}`, query }];
    setSavedViews(next);
    window.localStorage.setItem(`datatable:${title}`, JSON.stringify(next));
  };

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">Manage records with server-side controls.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={saveView}>
            <Settings2 className="mr-2 h-4 w-4" />
            Save view
          </Button>
          <Button variant="outline" size="sm" onClick={exportCsv}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => {
                const next = event.target.value;
                setQuery(next);
                onSearch(next);
              }}
              placeholder="Search"
              aria-label="Search"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            {onBulkAction && selectedIds.length > 0 && (
              <Button variant="destructive" size="sm" onClick={() => onBulkAction(selectedIds, "delete")}> 
                Bulk delete ({selectedIds.length})
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          {savedViews.map((view) => (
            <button
              key={view.name}
              className="rounded-full border border-border px-2 py-0.5"
              onClick={() => {
                setQuery(view.query);
                onSearch(view.query);
              }}
            >
              {view.name}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <input
                    type="checkbox"
                    aria-label="Select all"
                    checked={selectedIds.length === data.length && data.length > 0}
                    onChange={(event) => {
                      const next: Record<string, boolean> = {};
                      if (event.target.checked) {
                        data.forEach((row) => {
                          next[rowId(row)] = true;
                        });
                      }
                      setSelected(next);
                    }}
                  />
                </TableHead>
                {columns.map((column) => (
                  <TableHead key={String(column.key)}>
                    <button className="flex items-center gap-1" onClick={() => onSort(column.key)}>
                      {column.header}
                    </button>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => (
                <TableRow key={rowId(row)}>
                  <TableCell>
                    <input
                      type="checkbox"
                      aria-label="Select row"
                      checked={selected[rowId(row)] ?? false}
                      onChange={(event) =>
                        setSelected((prev) => ({
                          ...prev,
                          [rowId(row)]: event.target.checked
                        }))
                      }
                    />
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell key={String(column.key)} className={cn("whitespace-nowrap")}> 
                      {column.render ? column.render(row) : String(row[column.key])}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {data.length === 0 && (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} className="py-10 text-center text-muted-foreground">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col gap-2 text-sm md:flex-row md:items-center md:justify-between">
          <div>
            Showing {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, total)} of {total}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
              Previous
            </Button>
            <span className="text-xs text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

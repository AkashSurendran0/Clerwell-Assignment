"use client";

import { useMemo, useState } from "react";
import queueData from "../mock-data/emails.json";
import { EmailList } from "@/components/queue/EmailList";
import type { EmailItem } from "@/components/queue/EmailListItem";
import { FilterBar } from "@/components/queue/FilterBar";
import { Pagination } from "@/components/queue/Pagination";
import { QueueHeader } from "@/components/queue/QueueHeader";
import { SearchBar } from "@/components/queue/SearchBar";

const allEmails = [...((queueData as { emails?: EmailItem[] }).emails ?? [])].sort(
  (a, b) => a.queuePosition - b.queuePosition,
);

function mapStatusFilter(value: string) {
  const normalized = value.toLowerCase();

  switch (normalized) {
    case "pending":
      return "pending_review";
    case "approved":
      return "approved";
    case "rejected":
      return "rejected";
    case "escalated":
      return "escalated";
    default:
      return "all";
  }
}

export function editEmailStatus(emailId: string, status: string) {
  const emailIndex = allEmails.findIndex((email) => email.id === emailId);
  if (emailIndex !== -1) {
    allEmails[emailIndex].status = status;
  }
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredEmails = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return allEmails.filter((email) => {
      const queryMatches =
        normalizedQuery.length === 0 ||
        [
          email.sender.name,
          email.sender.email,
          email.subject,
          email.aiAnalysis.intent,
          ...email.thread.map((item) => item.body),
        ].some((value) => value.toLowerCase().includes(normalizedQuery));

      const statusMatches =
        statusFilter === "All" ||
        mapStatusFilter(statusFilter) === "all" ||
        email.status === mapStatusFilter(statusFilter);

      const riskMatches =
        riskFilter === "All" ||
        email.aiAnalysis.riskLevel.toLowerCase() === riskFilter.toLowerCase();

      const priorityMatches =
        priorityFilter === "All" ||
        email.priority.toLowerCase() === priorityFilter.toLowerCase();

      return queryMatches && statusMatches && riskMatches && priorityMatches;
    });
  }, [searchQuery, statusFilter, riskFilter, priorityFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredEmails.length / 5));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pageStart = (safeCurrentPage - 1) * 5;
  const paginatedEmails = filteredEmails.slice(pageStart, pageStart + 5);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleRiskChange = (value: string) => {
    setRiskFilter(value);
    setCurrentPage(1);
  };

  const handlePriorityChange = (value: string) => {
    setPriorityFilter(value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("All");
    setRiskFilter("All");
    setPriorityFilter("All");
    setCurrentPage(1);
  };

  const pendingCount = allEmails.filter((email) => email.status === "pending_review").length;

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_8px_30px_rgba(15,23,42,0.06)] sm:p-6 lg:p-8">
          <QueueHeader totalCount={allEmails.length} pendingCount={pendingCount} />

          <div className="mt-6 space-y-4">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <SearchBar value={searchQuery} onChange={handleSearch} />
              <div className="text-sm text-slate-500">
                {filteredEmails.length} result{filteredEmails.length === 1 ? "" : "s"}
              </div>
            </div>

            <FilterBar
              statusFilter={statusFilter}
              riskFilter={riskFilter}
              priorityFilter={priorityFilter}
              onStatusChange={handleStatusChange}
              onRiskChange={handleRiskChange}
              onPriorityChange={handlePriorityChange}
            />
          </div>

          <div className="mt-6">
            <EmailList emails={paginatedEmails} onClearFilters={clearFilters} />
          </div>

          <div className="mt-6">
            <Pagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              totalItems={filteredEmails.length}
              startIndex={pageStart}
              endIndex={pageStart + paginatedEmails.length}
              onPageChange={(page) => setCurrentPage(Math.min(page, totalPages))}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

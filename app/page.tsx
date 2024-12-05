"use client";

import { IssuesListContainer } from "@/containers/issueslist";
import { CreateIssue } from "@/containers/createIssue";
import React, { useState } from "react";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0); 

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="w-[900px] flex flex-col items-center justify-center mx-auto h-auto">
      <div className="flex items-center justify-center mt-10">
            <CreateIssue refresh={handleRefresh} />
            </div>
            <IssuesListContainer refresh={handleRefresh} key={refreshKey} />
      </div>
    </main>
  );
}

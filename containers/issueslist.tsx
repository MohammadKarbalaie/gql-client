"use client";

import { useQuery, useMutation } from "@apollo/client";
import { fetchIssuesQuery } from "@/gql/queries/issues";
import { DeleteIssueMutation } from "@/gql/mutations/deleteissue";
import { EditIssueMutation } from "@/gql/mutations/edit-Issue";
import React, { useState } from "react";

interface IssuesListContainerProps {
  refresh: () => void;
}

export const IssuesListContainer: React.FC<IssuesListContainerProps> = ({
  refresh,
}) => {
  const { loading, error, data, refetch } = useQuery<{ issues: Array<Issue> }>(
    fetchIssuesQuery
  );
  const [deleteIssue] = useMutation(DeleteIssueMutation);
  const [editIssue] = useMutation(EditIssueMutation);

  const [editingIssueId, setEditingIssueId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [editedStatus, setEditedStatus] = useState("");

  const handleDelete = async (id: string) => {
    try {
      await deleteIssue({ variables: { deleteIssueId: id } });
      refetch();
      refresh();
    } catch (error) {
      console.error("Error deleting issue:", error);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      const input = {
        id,
        name: editedName,
        content: editedContent,
        status: editedStatus,
      };

      await editIssue({
        variables: {
          input,
        },
      });
      refetch();
      refresh();
      setEditingIssueId(null); // Reset editing state
    } catch (error) {
      console.error("Error editing issue:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error! {error.message}</p>;

  const issueStatuses = ["BACKLOG", "INPROGRESS", "DONE"];

  return (
    <div className="flex flex-col p-10 gap-y-5 px-4 py-10">
      <button
        onClick={() => {
          refetch();
          refresh();
        }}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Refresh
      </button>
      {issueStatuses.map((status) => (
        <div className="bg-gray-300 rounded-md px-4 py-2" key={status}>
          <h2 className="font-semibold text-center pt-1 pb-2">
            {status} Issues
          </h2>
          {(data?.issues || [])
            .filter((el) => el.status === status)
            .map((el) => (
              <div
                className="grid grid-cols-5 gap-x-4 items-center"
                key={el.id}
              >
                {editingIssueId === el.id ? (
                  <>
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      placeholder="Edit Name"
                      className="border border-gray-400 px-2 py-1 rounded"
                    />
                    <input
                      type="text"
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      placeholder="Edit Content"
                      className="border border-gray-400 px-2 py-1 rounded"
                    />
                    <select
                      value={editedStatus}
                      onChange={(e) => setEditedStatus(e.target.value)}
                      className="border border-gray-400 px-2 py-1 rounded"
                    >
                      {issueStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleEdit(el.id)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingIssueId(null)}
                      className="bg-gray-500 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <h2>{el.name}</h2>
                    <h2>{el.content}</h2>
                    <h2>{el.status}</h2>
                    <div className="flex gap-x-2">
                      <button
                        onClick={() => {
                          setEditingIssueId(el.id);
                          setEditedName(el.name);
                          setEditedContent(el.content);
                          setEditedStatus(el.status);
                        }}
                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(el.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

"use client";

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CreateIssueMutaion } from "@/gql/mutations/issues";
import { useRouter } from "next/navigation";
import { Button } from "@/components/btn";
import { Input } from "@/components/input";

interface CreateIssueProps {
  refresh: () => void;
}

export const CreateIssue: React.FC<CreateIssueProps> = ({ refresh }) => {
  const [showForm, setShowForm] = useState(false);
  const [values, setValues] = useState({ name: "", content: "", status: "" });
  const [createIssue, { loading }] = useMutation(CreateIssueMutaion);
  const router = useRouter();

  const handleInputChange = (field: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [field]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createIssue({ variables: { input: values } });
      refresh();
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-slate-600 hover:bg-slate-700 w-fit mx-auto px-6 py-2 rounded-md"
      >
        Add Issue
      </button>
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-300 rounded-xl px-4 py-5 shadow-lg max-w-[500px] w-full space-y-4 mx-auto"
        >
          <Input label="Name" value={values.name} onChange={handleInputChange("name")} />
          <Input label="Content" value={values.content} onChange={handleInputChange("content")} />
          <Input label="Status" value={values.status} onChange={handleInputChange("status")} />
          <Button disabled={loading} type="submit">
            Add Issue
          </Button>
        </form>
      )}
    </div>
  );
};

type IssueStatue = "BACKLOG" | "TODO" | "INPROGRESS" | "DONE";

interface Issue {
  id: string;
  name: string;
  content: string;
  status: "BACKLOG" | "INPROGRESS" | "DONE";
}
interface ICreateIssue{
  name : string;
  content : string;
  status: string;
}

interface ICreateIssueDto {
  CreateIssue: {
    createdAt: string;
  };
}
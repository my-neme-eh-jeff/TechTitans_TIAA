const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "POSITION", uid: "position", sortable: true },
  { name: "DEPARTMENT", uid: "department" },
  { name: "TIME OF REQUEST", uid: "time" },
  { name: "PHONE NUMBER", uid: "phonenumber", sortable: true },
  { name: "ACTIONS", uid: "actions" },
  { name: "STATUS", uid: "status", sortable: true },
];

const statusOptions = [
  { name: "approved", uid: "approved" },
  { name: "pending", uid: "pending" },
];

const users = [
  {
    id: 7,
    name: "Aman Nambisan",
    position: "Head",
    department: "HR",
    time: "active",
    phone_number: 9819281311,
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocKf4OFSZ0LEnFJqY4rzJ7N2TUIPGjxNZY1PpQ5K9XdJ=s96-c",
    email: "aman2003nambisan@gmail.com",
    status: "approved",
  },
  {
    id: 11,
    name: "Divine Drapes",
    position: "Employee",
    department: "IT",
    time: "active",
    phone_number: 9743213671,
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocJDEVzhc5N20XGSk-Q3B3ZzKNmW_fIHOuJkZaSmEP5D=s96-c",
    email: "thedivinedrapes@gmail.com",
    status: "pending",
  },
  {
    id: 10,
    name: "HackoMordy",
    position: "Manager",
    department: "IT",
    time: "active",
    phone_number: 989746275,
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocLSQ3SYc6gHTLcEJmp2SBBAzQ6Zvz1nDfzwUgUVK5Wd=s96-c",
    email: "masterm.9070@gmail.com",
    status: "pending",
  },
  {
    id: 12,
    name: "Jeff",
    position: "Head",
    department: "Sales",
    time: "active",
    phone_number: 7915467214,
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocJLA0DoXG23CRD7dxPmKCqsra0Nalv7G17Yhoz9quzO=s96-c",
    email: "mynemeehjeff123@gmail.com",
    status: "pending",
  },
  {
    id: 13,
    name: "Noah Diaz",
    position: "Employee",
    department: "Sales",
    time: "active",
    phone_number: 7854645137,
    avatar:
      "https://images.unsplash.com/photo-1628563694622-5a76957fd09c?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5zdGFncmFtJTIwcHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
    email: "noah@gmail.com",
    status: "pending",
  },
];



export { columns, users, statusOptions };

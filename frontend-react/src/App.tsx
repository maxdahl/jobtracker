import JobApplicationsTable from "@components/JobApplicationsTable";

const applications = [
  {
    id: 1,
    date: "1234567",
    company: "BlaTech",
    position: "Developer",
    url: "http://bla.de/dev-position",
    status: "application send",
    notes: "I dont fucking know",
  },
];

function App() {
  return (
    <div className="App">
      <JobApplicationsTable applications={applications} />
    </div>
  );
}

export default App;

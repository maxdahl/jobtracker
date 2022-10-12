import { useState, useEffect } from "react";

import IJobApplication from "@uiTypes/IJobApplication";

import JARow from "./JARow";
import EditableJARow from "./EditableJARow";

import "./jobapplicationstable.css";

type Props = {
  applications: IJobApplication[];
};

function JobApplicationsTable({ applications }: Props) {
  const [jobApplications, setJobApplications] =
    useState<IJobApplication[]>(applications);

  const [rows, setRows] = useState<JSX.Element[]>([]);
  const [isAddRow, setIsAddRow] = useState(false);

  const onToggleEditRow = (id: number | undefined) => {
    const applicationsCopy = [...jobApplications];
    const element = applicationsCopy.find((el) => el.id === id);

    if (element) {
      // set to true if false or undefined
      element.isEditing = element.isEditing !== true;
      setJobApplications(applicationsCopy);
    }
  };

  const onSaveApplication = (application: IJobApplication) => {
    const isNewApplication = application.id === undefined;
    const applicationsCopy = [...jobApplications];
    if (isNewApplication) {
      applicationsCopy.push(application);
      setJobApplications(applicationsCopy);
      setIsAddRow(false);
    } else {
      const applicationIndex = applicationsCopy.findIndex(
        (app) => app.id === application.id
      );
      if (applicationIndex > -1) {
        applicationsCopy.splice(applicationIndex, 1, {
          ...application,
          isEditing: false,
        });
        setJobApplications(applicationsCopy);
      }
    }
  };

  const onAddApplication = (jobApplication: IJobApplication) => {
    setJobApplications([...jobApplications, jobApplication]);
    setIsAddRow(false);
  };

  useEffect(() => {
    const tmpRows: JSX.Element[] = [];
    jobApplications.forEach((application) => {
      if (application.isEditing && application.id !== undefined) {
        tmpRows.push(
          <EditableJARow
            data={application}
            onSave={onSaveApplication}
            onCancel={() => onToggleEditRow(application.id)}
          />
        );
      } else {
        tmpRows.push(
          <JARow
            data={application}
            onEdit={() => onToggleEditRow(application.id)}
          />
        );
      }
    });

    setRows(tmpRows);
  }, [jobApplications]);

  const getLastRow = () => {
    if (isAddRow) {
      return (
        <EditableJARow
          onSave={onAddApplication}
          onCancel={() => setIsAddRow(false)}
        />
      );
    }

    return (
      <div id="add-app-btn-container">
        <button type="button" onClick={() => setIsAddRow(true)}>
          +
        </button>
      </div>
    );
  };
  return (
    <table>
      <thead>
        <tr>
          <th>
            <span>Datum</span>
          </th>
          <th>
            <span>Unternehmen</span>
          </th>
          <th>
            <span>Stelle</span>
          </th>
          <th>
            <span>Status</span>
          </th>
          <th>
            <span>Bemerkungen</span>
          </th>
          <th>
            <span>Aktionen</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {rows} {getLastRow()}
      </tbody>
    </table>
  );
}

export default JobApplicationsTable;

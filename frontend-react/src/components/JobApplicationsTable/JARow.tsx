import IJobApplication from "@myTypes/IJobApplication";

type Props = {
  data: IJobApplication;
  onEdit?: (id: number | undefined) => void;
};

function JARow({ data, onEdit = () => {} }: Props) {
  const { id, date, company, url, position, status, notes } = data;
  return (
    <tr>
      <td>{date}</td>
      <td>{company}</td>
      <td>
        <a href={url}>{position}</a>
      </td>
      <td>{status}</td>
      <td>{notes}</td>
      <td>
        <button type="button" onClick={() => onEdit(id)}>
          Edit
        </button>
      </td>
    </tr>
  );
}

JARow.defaultProps = {
  onEdit: () => {},
};

export default JARow;

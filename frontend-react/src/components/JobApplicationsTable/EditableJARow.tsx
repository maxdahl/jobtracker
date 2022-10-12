import { useEffect, useState } from "react";

import type IJobApplication from "@uiTypes/IJobApplication";

import btn_ok from "@assets/button_ok.png";
import btn_cancel from "@assets/button_cancel.png";

type Props = {
  onSave: (state: IJobApplication) => void;
  onCancel: () => void;
  data?: IJobApplication | null;
};

function EditableJARow({ onSave, onCancel, data = null }: Props) {
  const [state, setState] = useState<IJobApplication>({
    date: "",
    company: "",
    url: "",
    position: "",
    notes: "",
    status: "",
  });

  useEffect(() => {
    if (data !== null) {
      setState(data);
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const key = e.target.name;
    const val = e.target.value;

    setState({ ...state, [key]: val });
  };

  return (
    <tr>
      <td>
        <input
          type="date"
          name="date"
          onChange={handleChange}
          value={state.date}
        />
      </td>
      <td>
        <input
          type="text"
          name="company"
          value={state.company}
          onChange={handleChange}
          placeholder="Unternehmen"
        />
      </td>
      <td>
        <input
          type="text"
          name="url"
          value={state.url}
          onChange={handleChange}
          placeholder="URL"
        />
        <input
          type="text"
          name="position"
          value={state.position}
          onChange={handleChange}
          placeholder="Stelle"
        />
      </td>
      <td>
        <input
          type="text"
          name="status"
          value={state.status}
          onChange={handleChange}
          placeholder="Status"
        />
      </td>
      <td>
        <textarea
          name="notes"
          value={state.notes}
          onChange={handleChange}
          placeholder="Bemerkungen"
        />
      </td>
      <td>
        <button type="button" id="btn_ok" onClick={() => onSave(state)}>
          <img src={btn_ok} alt="Speichern" />
        </button>
        <button type="button" id="btn_cancel" onClick={onCancel}>
          <img src={btn_cancel} alt="Cancel" />
        </button>
      </td>
    </tr>
  );
}

EditableJARow.defaultProps = {
  data: null,
};
export default EditableJARow;

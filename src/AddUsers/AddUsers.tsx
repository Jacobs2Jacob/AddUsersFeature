import { useState, type CSSProperties} from "react";
import { MultiValueInput } from "./Components/MultiValueInput/MultiValueInput";

interface addUsersProps {
  style?: CSSProperties
}

export const AddUsers = ({ style }: addUsersProps) => {

  const [emails, setEmails] = useState<string[]>([]);

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting emails:", emails); 
  };
 
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  return (
    <form onSubmit={onSave} style={style}>
      <div style={{ display: 'flex', gap: '1rem', height: '40px' }}>
        <MultiValueInput
        value={emails}
        onChange={setEmails}
        validate={validateEmail}
        placeholder="Enter email addresses"/>

        <button
            type="submit"
            disabled={emails.length === 0}>  
                Add Users ({emails.length})
        </button>
      </div>
    </form>
  );
}
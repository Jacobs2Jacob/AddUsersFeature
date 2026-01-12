import { useState, type KeyboardEvent } from "react";
import styles from "./MultiValueInput.module.css"; 
import { InputChip } from "../InputChip/InputChip";

const MAX_VISIBLE = 3;

interface Props  {
  value: string[];
  onChange: (next: string[]) => void;
  validate?: (value: string) => boolean;
  placeholder?: string;
  allowDuplications?: boolean;
};

export const MultiValueInput = ({
  value,
  onChange,
  validate,
  placeholder,
  allowDuplications = false
}: Props) => {
  
  const [inputValue, setInputValue] = useState("");
  const [showAll, setShowAll] = useState(false);
  const visibleItems = value.slice(0, MAX_VISIBLE);
  const hiddenCount = value.length - visibleItems.length;
   
  const addValue = (raw: string) => {
    
    const trimmed = raw.trim();

    // empty value
    if (!trimmed) {
        return;
    }

    // validation
    if (validate && !validate(trimmed)) {
        return;
    }
    
    // deduplication
    if (!allowDuplications && value.includes(trimmed)) {
         return;
    } 

    onChange([...value, trimmed]);
    setInputValue("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addValue(inputValue);
    }

    if (e.key === "Backspace" && !inputValue && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  const removeValue = (email: string) => {
    onChange(value.filter(v => v !== email));
  };

  return (
    <div className={styles.container}>
      {visibleItems.map(email => (
        <InputChip key={email} val={email} onRemove={removeValue} />
      ))}

      {hiddenCount > 0 && (
          <div className={styles.moreWrapper}
               onClick={() => setShowAll(!showAll)}>
            <span className={styles.more}>+{hiddenCount}</span>

            {showAll && (
              <div className={styles.popover}>
                <div className={styles.chipList}>
                  {value.slice(visibleItems.length).map(email => ( 
                    <InputChip key={email} val={email} onRemove={removeValue} /> 
                  ))}
                </div>
              </div>
            )}
          </div>
      )}

      <input
        className={styles.input}
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}/>
    </div>
  );
}
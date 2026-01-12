import styles from './InputChip.module.css';

interface inputChipProps {
    val: string,
    onRemove: (val: string)=> void
}

export const InputChip = ({onRemove, val}: inputChipProps) => {
 
    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      onRemove(val);
    }

    return <span key={val} className={styles.chip}>
            {val}
            <button
              type="button"
              className={styles.remove}
              onClick={handleRemove}>
              ×
            </button>
          </span>;
}
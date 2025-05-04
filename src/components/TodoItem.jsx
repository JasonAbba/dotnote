import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import { useSwipeable } from "react-swipeable";

function TodoItem({ task, completed, date, onToggle, onDelete }) {
  const handlers = useSwipeable({
    onSwipedLeft: onDelete,
  });

  return (
    <motion.li
      {...handlers}
      className={`todo-item ${completed ? "completed" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
    >
      <input
        type="checkbox"
        checked={completed}
        onChange={onToggle}
        aria-label={`Mark ${task} as ${completed ? "incomplete" : "complete"}`}
      />
      <span>{task}</span>
      <span className="date">{date}</span>
      <button onClick={onDelete} className="delete-button" aria-label={`Delete ${task}`}>
        <FaTrash />
      </button>
    </motion.li>
  );
}

export default TodoItem;
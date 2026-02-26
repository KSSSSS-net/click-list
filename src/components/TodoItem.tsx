import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem = ({ id, text, completed, onToggle, onDelete }: TodoItemProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
      className="group flex items-center gap-3 py-3 px-1 border-b border-border last:border-b-0"
    >
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={() => onToggle(id)}
        className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
          completed
            ? "bg-check border-check"
            : "border-muted-foreground/30 hover:border-muted-foreground/60"
        }`}
      >
        {completed && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <Check className="w-3 h-3 text-primary-foreground" strokeWidth={3} />
          </motion.div>
        )}
      </motion.button>

      <span
        className={`flex-1 text-sm font-light tracking-wide transition-all duration-300 ${
          completed ? "line-through text-muted-foreground" : "text-foreground"
        }`}
      >
        {text}
      </span>

      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={() => onDelete(id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-muted-foreground hover:text-destructive p-1"
      >
        <X className="w-3.5 h-3.5" />
      </motion.button>
    </motion.div>
  );
};

export default TodoItem;

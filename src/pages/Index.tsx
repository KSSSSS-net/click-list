import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import TodoItem from "@/components/TodoItem";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const addTodo = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTodos((prev) => [
      { id: crypto.randomUUID(), text: trimmed, completed: false },
      ...prev,
    ]);
    setInput("");
    inputRef.current?.focus();
  };

  const toggleTodo = (id: string) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

  const deleteTodo = (id: string) =>
    setTodos((prev) => prev.filter((t) => t.id !== id));

  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen flex items-start justify-center pt-[15vh] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <h1 className="text-4xl font-serif text-foreground mb-1">Today</h1>
        <p className="text-muted-foreground text-sm font-light mb-8">
          {todos.length === 0
            ? "Nothing yet. Start adding tasks."
            : `${remaining} task${remaining !== 1 ? "s" : ""} remaining`}
        </p>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTodo();
          }}
          className="flex items-center gap-2 mb-8"
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a task…"
            className="flex-1 bg-transparent border-b border-border py-2 text-sm font-light text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors duration-200"
          />
          <motion.button
            type="submit"
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
          </motion.button>
        </form>

        {/* List */}
        <AnimatePresence mode="popLayout">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              {...todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Index;

import React, { useEffect, useState } from "react";
import {
  Plus,
  Circle,
  CheckCircle2,
  ArrowLeftFromLine,
  ArrowRightFromLine,
  Tag,
  X,
} from "lucide-react";
import TodoService from "../../lib/api/HomeDashboard.jsx/TodoServices";

const TaskSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [newTask, setNewTask] = useState("");
  const [showLabelSelector, setShowLabelSelector] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [tasks, setTasks] = useState([]);

  const fetchTodoList = async () => {
    try {
      const todos = await TodoService.getAllTodos();
      setTasks(todos);
      console.log(todos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodoList();
  }, []);

  const labelOptions = [
    { id: 1, name: "PRIORITY", color: "bg-red-100 text-red-700" },
    { id: 2, name: "WORK", color: "bg-purple-100 text-purple-700" },
    { id: 3, name: "EXAM", color: "bg-blue-100 text-blue-700" },
    { id: 4, name: "PERSONAL", color: "bg-green-100 text-green-700" },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleTaskCompletion = async (taskUid) => {
    try {
      const response = await TodoService.toggleTodo(taskUid);
      fetchTodoList();
      console.log(response);
    } catch (error) {
      console.error("Error toggling todos:", error);
    }
  };

  const selectLabel = (labelName) => {
    setSelectedLabel(labelName === selectedLabel ? null : labelName);
    setShowLabelSelector(false);
  };

  const removeLabel = () => {
    setSelectedLabel(null);
  };

  const generateUID = () => {
    return Math.random().toString(36).substring(2, 9);
  };

  const handleAddTask = async () => {
    if (newTask.trim()) {
      const newTaskObj = {
        description: newTask,
        status: false,
        label: selectedLabel,
      };
      await TodoService.createTodo(newTaskObj);
      fetchTodoList();
      console.log(newTaskObj);
      setNewTask("");
      setSelectedLabel(null);
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-screen bg-white border-l transition-all duration-300 ${
        isOpen ? "w-80" : "w-12"
      }`}
      style={{ position: "sticky" }}>
      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-4 text-gray-400 hover:text-gray-600">
        {isOpen ? (
          <ArrowRightFromLine size={20} />
        ) : (
          <ArrowLeftFromLine size={20} />
        )}
      </button>

      {isOpen && (
        <div className="h-full flex flex-col pt-16">
          <h2 className="px-6 text-lg font-semibold mb-4">Things to be done</h2>

          <div className="flex-1 overflow-y-auto px-6">
            {tasks.map((task) => (
              <div
                key={task.uid}
                className={`mb-4 p-4 rounded-lg ${
                  task.status ? "bg-gray-50" : "bg-yellow-50"
                }`}>
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleTaskCompletion(task.uid)}
                    className="mt-1 flex-shrink-0 text-gray-400 hover:text-gray-600">
                    {task.status ? (
                      <CheckCircle2 size={20} />
                    ) : (
                      <Circle size={20} />
                    )}
                  </button>
                  <div>
                    <p
                      className={`text-sm ${
                        task.status
                          ? "line-through text-gray-500"
                          : "text-gray-700"
                      }`}>
                      {task.description}
                    </p>
                    {task.label && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            labelOptions.find((l) => l.name === task.label)
                              ?.color
                          }`}>
                          {task.label}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 flex flex-col gap-3">
            {selectedLabel && (
              <div className="flex flex-wrap gap-2 mb-2">
                {(() => {
                  const labelOption = labelOptions.find(
                    (l) => l.name === selectedLabel
                  );
                  return (
                    <span
                      key={selectedLabel}
                      className={`${labelOption.color} px-2 py-1 rounded-full text-xs flex items-center gap-1`}>
                      {selectedLabel}
                      <button
                        onClick={removeLabel}
                        className="hover:opacity-75">
                        <X size={12} />
                      </button>
                    </span>
                  );
                })()}
              </div>
            )}

            <div className="relative w-full">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add New Task..."
                className="w-full rounded-full pe-15 shadow-sm sm:text-sm p-4"
                style={{
                  backgroundColor: "rgba(239, 176, 52, 0.2)",
                  border: "0px",
                  padding: "1.5rem",
                  borderRadius: "1000px",
                  width: "100%",
                  color: "black",
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleAddTask();
                }}
              />
              <button
                className="absolute inset-y-0 end-0 grid w-10 place-content-center text-[#EFB034] pr-4"
                onClick={handleAddTask}>
                <Plus />
              </button>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowLabelSelector(!showLabelSelector)}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors px-4 py-2 rounded-full bg-gray-50 hover:bg-gray-100">
                <Tag size={16} />
                {selectedLabel || "Add Label"}
              </button>

              {showLabelSelector && (
                <div className="absolute bottom-full left-0 mb-2 w-full bg-white rounded-lg shadow-lg border p-2 z-10">
                  <div className="grid grid-cols-2 gap-2">
                    {labelOptions.map((label) => (
                      <button
                        key={label.id}
                        onClick={() => selectLabel(label.name)}
                        className={`${
                          label.color
                        } px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors
                                                    ${
                                                      selectedLabel ===
                                                      label.name
                                                        ? "ring-2 ring-offset-1"
                                                        : "opacity-80 hover:opacity-100"
                                                    }`}>
                        {selectedLabel === label.name && (
                          <CheckCircle2 size={14} />
                        )}
                        {label.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskSidebar;

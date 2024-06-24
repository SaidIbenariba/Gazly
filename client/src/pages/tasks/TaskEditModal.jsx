import React, { useState } from 'react';
import { Dialog, Button, Input, Select, Option } from "@material-tailwind/react";
import TasksTable from './TasksTable';

const TaskEditModal = ({ task, isOpen, onClose, onSave }) => {
  const [editedTask, setEditedTask] = useState(task);
  console.log(task); 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} size="lg">
      <div className="p-6">
        <h3 className="text-xl mb-4">Edit Task</h3>
        <div className="mb-4">
          <Input
            type="datetime-local"
            label="Date"
            name="date"
            value={editedTask.date}
            onChange={handleChange}
            className="mb-4"
          />
        </div>
        <div className="mb-4">
          <Input
            type="text"
            label="Duree"
            name="duree"
            value={editedTask.duree}
            onChange={handleChange}
            className="mb-4"
          />
        </div>
        <div className="mb-4">
          <Input
            type="text"
            label="Description"
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            className="mb-4"
          />
        </div>
        <div className="mb-4">
          <Select
            label="Status"
            name="status"
            value={editedTask.status}
            onChange={(e) => handleChange({ target: { name: 'status', value: e } })}
            className="mb-4"
          >
            <Option value="done">Done</Option>
            <Option value="inprogress">In Progress</Option>
            <Option value="expired">Expired</Option>
          </Select>
        </div>
        <div className="flex justify-end mt-4">
          <Button className="mr-2" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onSave(editedTask)}>
            Save
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default TaskEditModal;

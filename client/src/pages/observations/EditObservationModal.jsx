import React, { useState } from 'react';
import axios from 'axios';

const EditObservationModal = ({ observation, onClose, onSave }) => {
  const [feedback, setFeedback] = useState(observation.feedback);
  const [status, setStatus] = useState(observation.status);
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    axios
      .put(`http://localhost:5000/api/observations/edit/${observation.date}/${observation.id_ws}/${observation.id_resp}`, { feedback, status })
      .then((res) => {
        console.log(res); 
        onSave();
        onClose();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg w-1/3">
        <div className="p-4 border-b">
          <h5 className="text-xl font-bold text-gray-800">Edit Observation</h5>
        </div>
        <div className="p-4">
          <textarea
            className="w-full p-2 border rounded-lg"
            rows="5"
            placeholder="Feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              className="w-full p-2 border rounded-lg"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="archive">Archived</option>
            </select>
          </div>
        </div>
        <div className="p-4 border-t flex justify-end">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 bg-green-500 text-white rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleSave}
            disabled={loading}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditObservationModal;

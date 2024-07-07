import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Form from '../../components/form';
import  { toast } from 'react-toastify';

const CreateEspaceForm = () => {
  const [espace, setEspace] = useState({
    id: "",
    start: "",
    end: "",
    id_resp: "",
    name: "",
  });
  const [responsables, setResponsables] = useState([]);
  const [err, setErr] = useState({ exist: false, msg: "" });
  const [loading, setLoading] = useState(false);
  const [showResponsableForm, setShowResponsableForm] = useState(false);

  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      if (location.state.type === "success") {
        toast.success(location.state.message);
      } else if (location.state.type === "error") {
        toast.error(location.state.message);
      }
    }
  }, [location]);

  useEffect(() => {
    console.log(espace, responsables);
  }, [espace, responsables, showResponsableForm]);

  useEffect(() => {
    setLoading(true);
    fetchResponsable();
    setLoading(false);
  }, []);

  const formFields = [
    {
      name: "name",
      label: "Workspace Name",
    },
  ];

  const handleFormChange = (value, fieldName) => {
    setEspace({ ...espace, [fieldName]: value });
  };

  async function fetchResponsable() {
    const res = await axios.get("http://localhost:5000/api/users/search-role/responsable");
    setResponsables(res.data);
    console.log(res.data);
  }

  function handleSubmit(data) {
    console.log(data);
    axios
      .post("http://localhost:5000/api/workspaces/create", { name: data.name })
      .then((res) => {
        // setEspace({ ...espace, id: res.data.id });
        const id_ws = res.data.id_ws; 
        if(espace.id_resp) { 
        handleAddResponsable(id_ws);
        } 
        nav("/private/espaces", {
          state: { message: "Workspace Created successfully!", type: "success" },
        });
      })
      .catch((err) => {
        console.log(err);
        nav("/private/espaces", {
          state: { message: "Failed to create workspace.", type: "error" },
        }); 
      });
  }

  function handleAddResponsable(id_ws) {
    // console.log(space);
    axios
      .post(`http://localhost:5000/api/affectations/create`, { start:espace.start, end:espace.end, id_ws:id_ws, id_resp:espace.id_resp})
      .then((res) => {
        nav("/private/espaces", {
          state: { message: "Responsable added successfully!", type: "success" },
        });
      })
      .catch((err) => {
        console.log(err);
        nav("/private/espaces", {
          state: { message: "Failed to add responsable.", type: "error" },
        });
      });
  }

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col h-[100vh] p-2 items-center">
          <div className="flex flex-col items-center">
            <span className="err">{err.exist && err.msg}</span>
            <nav className="flex justify-between">
              <h1 className="text-3xl font-bold text-text dark:text-text text-wrap mr-10">
                {espace.id_resp ? "Edit Workspace" : "Create Workspace"}
              </h1>
              <Link to="/private/espaces" className="button">
                Home
              </Link>
            </nav>
            <Form fields={formFields} onSubmit={handleSubmit} initialValues={espace} handleChange={handleFormChange} />
              <div className="mt-4">

                <button
                  onClick={() => setShowResponsableForm(!showResponsableForm)}
                  className="button"
                >
                  {showResponsableForm ? "Hide Responsable Form" : "Add Responsable"}
                </button>
                {showResponsableForm && (
                  <Form
                    fields={[
                        {
                            name: "start",
                            label: "Start Date",
                            type: "datetime-local",
                          },
                          {
                            name: "end",
                            label: "End Date",
                            type: "datetime-local",
                          },
                      {
                        label: "Responsable",
                        name: "id_resp",
                        inputType: "select",
                        options: responsables.map((responsable) => ({
                          label: responsable.firstname + " " + responsable.lastname,
                          value: responsable.id,
                        })),
                        required: true,
                      },
                    ]}
                    onSubmit={handleSubmit}
                    initialValues={espace}
                    handleChange={handleFormChange}
                  />
                )}
              </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateEspaceForm;

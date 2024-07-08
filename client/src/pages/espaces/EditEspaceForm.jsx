import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Form from "../../components/form";
import { Button } from '@material-tailwind/react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const EditEspaceForm = () => {
    const { id_ws } = useParams();
    const [espace, setEspace] = useState({
        id: "",
        start: "",
        end: "",
        id_resp: "",
        name: "",
    });
    const [responsableName, setResponsableName] = useState(""); // Holds the name of the responsable
    const [responsables, setResponsables] = useState([]);
    const [err, setErr] = useState({ exist: false, msg: "" });
    const [loading, setLoading] = useState(true);
    const [isChangingResp, setIsChangingResp] = useState(false);

    const nav = useNavigate();

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
        if (espace.id_resp) {
            axios.get(`http://localhost:5000/api/users/read/${espace.id_resp}`)
                .then((res) => {
                    const responsable = res.data[0];
                    setResponsableName(`${responsable.firstname} ${responsable.lastname}`);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [espace.id_resp]);

    useEffect(() => {
        setLoading(true);
        Promise.all([fetchEspace(id_ws), fetchResponsables()])
            .catch(err => {
                console.log("error when fetch data", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id_ws]);

    const formFields = [
        {
            name: "start",
            label: "Start Date",
            type: "datetime-local",
            required:true,
        },
        {
            name: "end",
            label: "End Date",
            type: "datetime-local",
            required:true,
        },
        {
            name: "name",
            label: "Name",
        },
        {
            label: "Responsable",
            name: "id_resp",
            inputType: "select",
            options: responsables.map(responsable => ({ label: responsable.firstname + " " + responsable.lastname, value: responsable.id })),
            required: true
        }
    ];

    const handleSubmit = (data) => {
        console.log(data);
        axios.post("http://localhost:5000/api/workspaces/create", { name: data.name })
            .then((res) => {
                const id_ws = res.data.id_ws;
                if (espace.id_resp) {
                    handleAddResponsable(id_ws);
                } else {
                    nav("/private/espaces", {
                        state: { message: "Workspace Created successfully!", type: "success" },
                    });
                    toast.success("Workspace Created successfully!");
                }
            })
            .catch((err) => {
                console.log(err);
                nav("/private/espaces", {
                    state: { message: "Failed to create workspace.", type: "error" },
                });
                toast.error("Failed to create workspace.");
            });
    }

    const handleAddResponsable = async (id_ws) => {
        try {
            await axios.post(`http://localhost:5000/api/affectations/create`, {
                start: espace.start,
                end:espace.end,
                id_ws: id_ws,
                id_resp: espace.id_resp,
            });
            nav("/private/espaces", {
                state: { message: "Responsable updated successfully!", type: "success" },
            });
            toast.success("Responsable updated successfully!");
        } catch (err) {
            console.log(err);
            toast.error("Failed to update responsable.");
        }
    }

    const handleFormChange = (value, fieldName) => {
        if (fieldName === "id_resp" && espace.id_resp) {
            setIsChangingResp(true);
        } else {
            setEspace({ ...espace, [fieldName]: value });
        }
    };

    const fetchResponsables = async () => {
        const res = await axios.get("http://localhost:5000/api/users/search-role/responsable");
        setResponsables(res.data);
        console.log(res.data);
    }

    const fetchEspace = async (id) => {
        const res = await axios.get(`http://localhost:5000/api/workspaces/${id}`);
        console.log("response from espaces api ", res.data[0]);
        setEspace({
            id: res.data[0].id,
            start: res.data[0].start ? new Date(res.data[0].start).toISOString().slice(0, 19).replace('T', ' ') : "",
            end: res.data[0].end ? new Date(res.data[0].end).toISOString().slice(0, 19).replace('T', ' ') : "",
            id_resp: res.data[0].id_resp,
            name: res.data[0].name,
        });
    }

    const handleStopRes = async () => {
        console.log(espace);
        try {
            const response = await axios.delete(`http://localhost:5000/api/affectations/delete/${espace.start}/${espace.id}/${espace.id_resp}`);
            console.log(response);
            setEspace({ ...espace, id_resp: "" });
            setIsChangingResp(false);
            toast.success("Responsable stopped successfully.");
        } catch (err) {
            console.log(err);
            toast.error("Failed to stop responsable.");
        }
    }

    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="flex flex-col h-[100vh] p-2 items-center">
                    <ToastContainer/>
                    <div className="flex flex-col items-center">
                        <span className="err">{err.exist && err.msg}</span>
                        <nav className="flex justify-between">
                            <h1 className="text-3xl font-bold text-text dark:text-text text-wrap mr-10">
                                {espace.id_resp ? "Edit workspace" : "Add responsable for this workspace"}
                            </h1>
                            <Link to="/private/espaces" className="button">
                                Home
                            </Link>
                        </nav>
                        {isChangingResp ? (
                            <div>
                                <p>Do you want to stop the current responsable before adding a new one?</p>
                                <Button onClick={handleStopRes} className="button w-full mt-10">
                                    Yes, stop current responsable
                                </Button>
                                <Button onClick={() => setIsChangingResp(false)} className="button w-full mt-10">
                                    Cancel
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Form fields={formFields} onSubmit={handleSubmit} initialValues={espace} isEditMode={true} handleChange={handleFormChange} />
                                {espace.id_resp && (
                                    <>
                                        <div className="mt-4 absolute top-[500px]">
                                            <span>Responsable: {responsableName}</span>
                                        </div>
                                        <Button onClick={handleStopRes} className="button w-full mt-10">
                                            Stop Responsable
                                        </Button>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default EditEspaceForm;

"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { TrashIcon, XMarkIcon, PencilIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner, select } from "@material-tailwind/react";
import useVerifyRole from "../hooks/useVerifyRoles"

export default function Calendar() {
  const [responsables, setResponsables] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editMeeting,setEditMeeting] = useState(false); 
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    allDay: false,
    id: 0,
    description: "",
    id_resp: null,
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { user } = useAuth();
  const isAdmin   = useVerifyRole("admin"); 
  useEffect(() => {
    fetchMeetings();
    fetchResponsables();
  }, [user, selectedEvent]);
  useEffect(()=>{
    console.log(allEvents); 
  },[allEvents]); 
  useEffect(() => {
    const draggableEl = document.getElementById("draggable-el");
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: ".fc-event",
        eventData: function (eventEl) {
          const title = eventEl.getAttribute("title");
          const id = eventEl.getAttribute("data");
          const start = eventEl.getAttribute("start");
          return { title, id, start };
        },
      });
    }
  }, []);

  const fetchResponsables = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/search-role/responsable");
      setResponsables(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMeetings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/meetings/");
      setAllEvents(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelection = (arg) => {

    const end = arg.allDay ? new Date(arg.end.setSeconds(arg.end.getSeconds() - 1)) : arg.end;
    setNewEvent({
      ...newEvent,
      start: arg.start,
      end:arg.end,
      allDay: arg.allDay,
      id: new Date().getTime(),
    });
    setShowModal(true);
  };

  const handleDateClick = (arg) => {
    console.log(arg); 
    setNewEvent({
      ...newEvent,
      start: arg.date,
      end:arg.date,
      allDay: arg.allDay,
      id: new Date().getTime(),
    });
    setShowModal(true);
  };

  const addEvent = (data) => {
    const event = {
      ...newEvent,
      start: data.date.toISOString(),
      title: data.draggedEl.innerText,
      allDay: data.allDay,
      id: new Date().getTime(),
    };
    setAllEvents([...allEvents, event]);
  };

  const handleEventClick = (data) => {
    console.log("we click on event"); 
    console.log(data.event); 
    setSelectedEvent(data.event);
    setShowViewModal(true);
  };

  const handleDelete = async () => {
     
    // const end = new Date(selectedEvent.end.toString().replace(/GMT.*$/,'GMT+0000')).toISOString(); 
    //   const start = new Date(selectedEvent.start.toString().replace(/GMT.*$/,'GMT+0000')).toISOString(); 
    // const id_resp = selectedEvent.extendedProps.id_resp;  
    console.log(selectedEvent.start,selectedEvent.end);  
    // console.log(start,end,id_resp); 
    const end = new Date(selectedEvent.end).toISOString(); 
    const start = new Date(selectedEvent.start).toISOString(); 
    const id_resp = selectedEvent.extendedProps.id_resp; 
    console.log(start); 
    console.log(end); 
    console.log(id_resp); 
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`http://localhost:5000/api/meetings/delete/${start}/${id_resp}`);
        setShowViewModal(false);
        setSelectedEvent(null);
        setAllEvents(allEvents.filter((event) => event.id !== selectedEvent.id));
        toast.success("Event deleted successfully");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEdit = async () => {
    setNewEvent({
      title: selectedEvent.title,
      start: selectedEvent.start,
      end: selectedEvent.end,
      allDay: selectedEvent.allDay,
      id: selectedEvent.id,
      description: selectedEvent.extendedProps.description,
      id_resp: selectedEvent.extendedProps.id_resp,
    });
    // delete the previous meeting 
    let end = null; 
    if(!selectedEvent.allDay) { 
       end = new Date(selectedEvent.end).toISOString(); 
    }
   const start = new Date(selectedEvent.start).toISOString(); 
   
   console.log(start);  // YYYY-MM-DD HH:MM:SS
      try {
        await axios.delete(`http://localhost:5000/api/meetings/delete/${start}/${selectedEvent.extendedProps.id_resp}`);
        // setSelectedEvent(null);
        setShowModal(true);
        setShowViewModal(false);
        console.log("edited meeting was deleted"); 
        setAllEvents(allEvents.filter((event) => event.id !== selectedEvent.id));
        // toast.success("Event deleted successfully");
      } catch (error) {
        console.log(error);
      }
 
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowViewModal(false);
    setSelectedEvent(null);
    setNewEvent({
      title: "",
      start: "",
      end: "",
      allDay: false,
      id: 0,
      description: "",
      id_resp: null,
    });
  };

  const handleChange = (e) => {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     // YYYY-MM-DD HH:MM:SS
  
    const formattedEvent = {
      ...newEvent,
      end:!newEvent.allDay ? new Date(newEvent.end.toISOString() ) : null ,
      start:new Date(newEvent.start.toISOString()),    // YYYY-MM-DD HH:MM:SS
    };
  console.log(formattedEvent); 
    try {
      await axios.post("http://localhost:5000/api/meetings/create", formattedEvent);
      setAllEvents([...allEvents, newEvent]);
      setShowModal(false);
      setSelectedEvent(null); 
      toast.success("Event created successfully");
      handleCloseModal();
    } catch (err) {
      console.log(err);
    }
  // } 
  };
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between">
        <ToastContainer position="bottom-right" autoClose={3000} />
        <div className="h-screen grid grid-cols-8 w-full">
          <div className="col-span-8">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div
                  className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
                  role="status"
                >
                  <Spinner/>
                </div>
              </div>
            ) : (
              isAdmin ? 
              <FullCalendar 
                timeZone="UTC"
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "timeGridDay,timeGridWeek,dayGridMonth",
                }}
                events={allEvents}
                nowIndicator={true}
                editable={true}
                droppable={true}
                selectable={true}
                selectMirror={true}
                dateClick={handleDateClick}
                select={handleSelection}
                drop={(data) => addEvent(data)}
                eventClick={(data) => handleEventClick(data)}
              />    
              : 
              <FullCalendar 
              timeZone="UTC"
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "timeGridDay,timeGridWeek,dayGridMonth",
              }}
              events={allEvents}
              nowIndicator={true}
              editable={true}
              droppable={true}
              selectable={true}
              selectMirror={true}
              // dateClick={handleDateClick}
              // select={handleSelection}
              // drop={(data) => addEvent(data)}
              eventClick={(data) => handleEventClick(data)}
            />                 
            )}
          </div>   
        </div>

        {/* {feedbackMessage && (
          <div
            className={`alert ${
              feedbackMessage.type === "success"
                ? "alert-success"
                : "alert-error"
            } fixed bottom-4 left-4 z-50`}
          >
            {feedbackMessage.message}
          </div>
        )} */}

        <Transition.Root show={showViewModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setShowViewModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <div>
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        <CheckIcon
                          className="h-6 w-6 text-green-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          View Meeting
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            {selectedEvent && selectedEvent.title}
                          </p>
                          <p className="text-sm font-bold text-gray-700">
                            {selectedEvent &&  selectedEvent.start.toISOString().slice(0, 19).replace('T', ' ')}
                          </p>

                          <p className="text-sm text-gray-500">
                            {selectedEvent &&
                              selectedEvent.extendedProps.description}
                          </p>
                          <p className="text-sm text-gray-500">
                            {selectedEvent &&
                              `Responsible: ${
                                responsables.find(
                                  (r) =>
                                    r.id === selectedEvent.extendedProps.id_resp
                                )?.firstname 
                              }`}
                          </p>
                        </div>
                      </div>
                    </div>
                    {isAdmin && 
                     <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                     <button
                       type="button"
                       className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm"
                       onClick={handleDelete}
                     >
                       Delete
                     </button>
                     <button
                       type="button"
                       className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-1 sm:mt-0 sm:text-sm"
                       onClick={handleEdit}
                     >
                       Edit
                     </button>
                   </div>
                    }
                   
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        <Transition.Root show={showModal} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={handleCloseModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                      <button
                        type="button"
                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={handleCloseModal}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                        <CheckIcon
                          className="h-6 w-6 text-green-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Create Meeting
                        </Dialog.Title>
                        <div className="mt-2">
                          <form onSubmit={handleSubmit}>
                            <div>
                              <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Title
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  name="title"
                                  id="title"
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  value={newEvent.title}
                                  onChange={handleChange}
                                  required
                                />
                              </div>
                            </div>

                            <div className="mt-4">
                              <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Description
                              </label>
                              <div className="mt-1">
                                <textarea
                                  id="description"
                                  name="description"
                                  rows={3}
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  value={newEvent.description}
                                  onChange={handleChange}
                                ></textarea>
                              </div>
                            </div>

                            <div className="mt-4">
                              <label
                                htmlFor="id_resp"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Responsible
                              </label>
                              <div className="mt-1">
                                <select
                                  id="id_resp"
                                  name="id_resp"
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  value={newEvent.id_resp}
                                  onChange={handleChange}
                                  required
                                >
                                  <option value="">Select a responsible</option>
                                  {responsables.map((resp) => (
                                    <option key={resp.id} value={resp.id}>
                                      {resp.firstname+ " " + resp.lastname}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="mt-4">
                              <label className="block text-sm font-medium text-gray-700">
                                All Day
                              </label>
                              <div className="mt-1">
                                <input
                                  type="checkbox"
                                  name="allDay"
                                  checked={newEvent.allDay}
                                  onChange={(e) =>
                                    setNewEvent({
                                      ...newEvent,
                                      allDay: e.target.checked,
                                    })
                                  }
                                />
                              </div>
                            </div>

                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                              <button
                                type="submit"
                                className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-1 sm:mt-0 sm:text-sm"
                                onClick={handleCloseModal}
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </main>
    </>
  );
}

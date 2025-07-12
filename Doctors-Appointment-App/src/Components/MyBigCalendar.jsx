import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const localizer = momentLocalizer(moment);

function MyBigCalendar() {
  const [defaultView, setDefaultView] = useState();
  const [currentDate, setCurrentDate] = useState(new Date());

  const [events, setEvents] = useState([
    {
      title: "Arun K in 9:00AM",
      doctor: "Dr. Rahul S",
      start: new Date(2025, 6, 20, 9),
      end: new Date(2025, 6, 20, 10),
    },
  ]);

  const [appointment, setAppointment] = useState(false);
  const [date, setDate] = useState(null);
  const [inputAp, setInputAp] = useState(false);

  const [doctor, setDoctor] = useState("");
  const [patient, setPatient] = useState("");
  const [time, setTime] = useState("");
  const [editingEventIndex, setEditingEventIndex] = useState(null);

  const [filterDoctor, setFilterDoctor] = useState("");
  const [filterPatient, setFilterPatient] = useState("");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDefaultView("day");
      } else {
        setDefaultView("month");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSave = () => {
    if (!doctor || !patient || !time) {
      toast.error("Please fill all fields");
      return;
    }

    const [hours, minutes] = time.split(":");
    const startDate = new Date(date);
    startDate.setHours(Number(hours));
    startDate.setMinutes(Number(minutes));

    const endDate = new Date(startDate);
    endDate.setHours(startDate.getHours() + 1);

    const isDuplicate = events.some((event, idx) => {
      if (editingEventIndex !== null && idx === editingEventIndex) return false;
      const eventStart = new Date(event.start);
      return (
        event.doctor === doctor && eventStart.getTime() === startDate.getTime()
      );
    });

    if (isDuplicate) {
      toast.error("This doctor already has an appointment at this time!");
      return;
    }

    const updatedEvent = {
      title: `${patient} in ${time}`,
      doctor: doctor,
      start: startDate,
      end: endDate,
    };

    if (editingEventIndex !== null) {
      const updatedEvents = [...events];
      updatedEvents[editingEventIndex] = updatedEvent;
      setEvents(updatedEvents);
    } else {
      setEvents([...events, updatedEvent]);
    }

    toast.success("Appointment Saved");
    setDoctor("");
    setPatient("");
    setTime("");
    setInputAp(false);
    setAppointment(false);
    setEditingEventIndex(null);
  };

  const handleDelete = () => {
    if (editingEventIndex !== null) {
      const updatedEvents = events.filter(
        (_, idx) => idx !== editingEventIndex
      );
      setEvents(updatedEvents);
      toast.success("Appointment Deleted");
    }
    setAppointment(false);
    setEditingEventIndex(null);
  };

  const filteredEvents = events.filter((event) => {
    const matchesDoctor = !filterDoctor || event.doctor === filterDoctor;
    const patientName = event.title.split(" in ")[0].trim();
    const matchesPatient = !filterPatient || patientName === filterPatient;
    return matchesDoctor && matchesPatient;
  });

  return (
    <div className="container mx-auto px-2 sm:px-4 md:px-8 lg:px-12">
      <Calendar
        className="my-5"
        localizer={localizer}
        events={filteredEvents}
        startAccessor="start"
        endAccessor="end"
        selectable
        view={defaultView}
        onView={(view) => setDefaultView(view)}
        date={currentDate}
        onNavigate={setCurrentDate}
        style={{ height: "60vh" }}
        onSelectSlot={(slotInfo) => {
          const clickedDate = slotInfo.start;
          if (clickedDate < new Date()) {
            toast.error("Past Date can't be Selected");
            return;
          }
          setAppointment(true);
          setDate(slotInfo.start);
          setInputAp(false);
          setEditingEventIndex(null);
        }}
        onSelectEvent={(event) => {
          const index = events.findIndex(
            (e) =>
              e.start.getTime() === new Date(event.start).getTime() &&
              e.end.getTime() === new Date(event.end).getTime() &&
              e.title === event.title
          );

          setEditingEventIndex(index);
          setDate(new Date(event.start));

          const titleParts = event.title.split(" in ");
          setPatient(titleParts[0] || "");
          setTime(
            `${String(event.start.getHours()).padStart(2, "0")}:${String(
              event.start.getMinutes()
            ).padStart(2, "0")}`
          );

          setDoctor(event.doctor || "");
          setInputAp(true);
          setAppointment(true);
        }}
      />

      {window.innerWidth < 768 && (
        <div className="my-4 flex justify-end">
          <input
            type="date"
            value={moment(currentDate).format("YYYY-MM-DD")}
            onChange={(e) => {
              const selectedDate = moment(e.target.value).toDate();
              setCurrentDate(selectedDate);
            }}
            className="border border-blue-500 p-2 rounded"
          />
        </div>
      )}

      {appointment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
          <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl w-full max-w-md sm:max-w-lg shadow-2xl space-y-4 overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-semibold mb-4">
              {editingEventIndex !== null
                ? "Edit Appointment"
                : "New Appointment"}{" "}
              for: {date?.toDateString()}
            </h2>

            {inputAp && (
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium">Doctor Name:</label>
                  <select
                    className="w-full border rounded p-2"
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                  >
                    <option value="">Select Doctor</option>
                    <option>Dr. Rahul S</option>
                    <option>Dr. Arunimma Suresh</option>
                    <option>Dr. John James</option>
                    <option>Dr. Abdul Ali</option>
                    <option>Dr. Steena Biju</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-medium">
                    Patient Name:
                  </label>
                  <select
                    className="w-full border rounded p-2"
                    value={patient}
                    onChange={(e) => setPatient(e.target.value)}
                  >
                    <option value="">Select Patient</option>
                    <option>Anu Paul</option>
                    <option>A R Suresh</option>
                    <option>Akash Sunil</option>
                    <option>Anamika P</option>
                    <option>Devika S</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-medium">Time:</label>
                  <select
                    className="w-full border rounded p-2"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  >
                    <option value="">Select Time</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">01:00 PM</option>
                  </select>
                </div>

                <button
                  className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600"
                  onClick={handleSave}
                >
                  {editingEventIndex !== null ? "Update" : "Save"}
                </button>

                {editingEventIndex !== null && (
                  <button
                    className="bg-red-500 text-white rounded px-4 py-2 mx-2 hover:bg-red-600"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                )}
              </div>
            )}

            <div className="flex justify-end gap-4 mt-6">
              {!inputAp && (
                <button
                  className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
                  onClick={() => setInputAp(true)}
                >
                  {editingEventIndex !== null
                    ? "Edit Appointment"
                    : "Add Appointment"}
                </button>
              )}
              <button
                className="bg-gray-400 text-white rounded px-4 py-2 hover:bg-gray-500"
                onClick={() => {
                  setInputAp(false);
                  setAppointment(false);
                  setEditingEventIndex(null);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-4 mb-4">
        <div>
          <label className="block mb-1 font-medium">Filter by Doctor:</label>
          <select
            className="border border-blue-600 rounded p-2"
            value={filterDoctor}
            onChange={(e) => setFilterDoctor(e.target.value)}
          >
            <option value="">All Doctors</option>
            <option>Dr. Rahul S</option>
            <option>Dr. Arunimma Suresh</option>
            <option>Dr. John James</option>
            <option>Dr. Abdul Ali</option>
            <option>Dr. Steena Biju</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Filter by Patient:</label>
          <select
            className="border border-blue-600 rounded p-2"
            value={filterPatient}
            onChange={(e) => setFilterPatient(e.target.value)}
          >
            <option value="">All Patients</option>
            <option>Anu Paul</option>
            <option>A R Suresh</option>
            <option>Akash Sunil</option>
            <option>Anamika P</option>
            <option>Devika S</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default MyBigCalendar;

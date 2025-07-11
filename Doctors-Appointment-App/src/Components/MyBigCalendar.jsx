import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

const localizer = momentLocalizer(moment);

const myEventsList = [
  {
    title: "Meeting",
    start: new Date(),
    end: new Date(),
  },
];

function MyBigCalendar() {
  const [appointment, setAppointment] = useState(false);
  const [date, setDate] = useState(null);
  const [inputAp, setInputAp] = useState(false);

  return (
    <>
      <Calendar
        className="p-2 m-4"
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={(slotInfo) => {
          console.log("Clicked date:", slotInfo.start);
          setAppointment(true);
          setDate(slotInfo.start);
        }}
        style={{ height: 500 }}
        dayPropGetter={(date) => {
          if (date < new Date()) {
            return {
              style: {
                backgroundColor: "#f0f0f0",
                color: "#999",
              },
            };
          }
          return {};
        }}
      />

      {appointment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl m-3 space-y-4">
            <h2 className="text-xl font-semibold mb-4">
              Appointment for: {date?.toDateString()}
            </h2>

            {inputAp && (
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium">Doctor Name:</label>
                  <select className="w-full border rounded p-2">
                    <option>Dr. Rahul S</option>
                    <option>Dr. Arunimma Suresh</option>
                    <option>Dr. John James</option>
                    <option>Dr. Abdul Ali</option>
                    <option>Dr. Steena Biju</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-medium">Patient Name:</label>
                  <select className="w-full border rounded p-2">
                    <option>Anu Paul</option>
                    <option>A R Suresh</option>
                    <option>Akash Sunil</option>
                    <option>Anamika P</option>
                    <option>Devika S</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 font-medium">Time:</label>
                  <select className="w-full border rounded p-2">
                    <option>09:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>12:00 PM</option>
                    <option>01:00 PM</option>
                  </select>
                </div>
                <button className="bg-green-400 text-white rounded px-4 py-2 hover:bg-green-500"
                onClick={() => {
                  setInputAp(false);
                  setAppointment(false);
                }}>Save

              </button>
              </div>
              
            )}

            <div className="flex justify-end gap-4 mt-6">
              {!inputAp && (
                <button
                  className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
                  onClick={() => setInputAp(true)}
                >
                  Add Appointment
                </button>
              )}
              
              <button
                className="bg-gray-400 text-white rounded px-4 py-2 hover:bg-gray-500"
                onClick={() => {
                  setInputAp(false);
                  setAppointment(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MyBigCalendar;

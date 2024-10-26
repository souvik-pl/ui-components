import React, { useEffect, useRef, useState } from "react";

function DatePicker({ onChange, value }) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [yearInCalender, setYearInCalender] = useState();
  const [monthInCalender, setMonthInCalender] = useState();
  const [daysCount, setDaysCount] = useState();
  const ref = useRef();
  const today = new Date();
  const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const clickOutsideHandler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsPickerOpen(false);
      }
    };

    document.addEventListener("mousedown", clickOutsideHandler);
    return () => {
      document.removeEventListener("mousedown", clickOutsideHandler);
    };
  }, []);

  useEffect(() => {
    const year = value ? value.getFullYear() : today.getFullYear();
    const month = value ? value.getMonth() : today.getMonth();
    const daysCount = getDaysCount(month, year);
    setYearInCalender(year);
    setMonthInCalender(month);
    setDaysCount(daysCount);
  }, [value]);

  const getDaysCount = (month, year) => {
    const monthIndexList31 = [0, 2, 4, 6, 7, 9, 11];
    const monthIndexList30 = [3, 5, 8, 10];
    let daysCount;

    //Feb
    if (month === 1) {
      const leapDate = new Date(year, month, 29);
      if (leapDate.getMonth() === 1 && leapDate.getDate() === 29) {
        daysCount = 29;
      } else {
        daysCount = 28;
      }
    } else if (monthIndexList30.includes(month)) {
      daysCount = 30;
    } else if (monthIndexList31.includes(month)) {
      daysCount = 31;
    }

    return daysCount;
  };

  const selectDateHandler = (date) => {
    const selectedDate = new Date(yearInCalender, monthInCalender, date);
    onChange(selectedDate);
  };

  const prevHandler = () => {
    const month = monthInCalender - 1 < 0 ? 11 : monthInCalender - 1;
    const year = monthInCalender - 1 < 0 ? yearInCalender - 1 : yearInCalender;
    setYearInCalender(year);
    setMonthInCalender(month);
    const daysCount = getDaysCount(month, year);
    setDaysCount(daysCount);
  };

  const nextHandler = () => {
    const month = monthInCalender + 1 > 11 ? 0 : monthInCalender + 1;
    const year = monthInCalender + 1 > 11 ? yearInCalender + 1 : yearInCalender;
    setYearInCalender(year);
    setMonthInCalender(month);
    const daysCount = getDaysCount(month, year);
    setDaysCount(daysCount);
  };

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <div
        style={{
          padding: "7px",
          border: "1px solid black",
          width: "max-content",
          cursor: "default",
        }}
        onClick={() => setIsPickerOpen(!isPickerOpen)}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {value
          ? `${value.getDate()}-${value.getMonth() + 1}-${value.getFullYear()}`
          : "Select date"}
      </div>
      {isPickerOpen && (
        <div
          ref={ref}
          style={{
            position: "absolute",
            top: "100%",
            left: "0",
            width: "250px",
            height: "max-content",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              padding: "5px",
            }}
          >
            <button onClick={prevHandler}>&lt;</button>
            <span>
              {monthList[monthInCalender]} {yearInCalender}
            </span>
            <button onClick={nextHandler}>&gt;</button>
          </div>
          <div
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              padding: "10px",
              gap: "5px",
            }}
          >
            {new Array(daysCount).fill(null).map((_, index) => (
              <button
                key={index}
                style={{
                  backgroundColor:
                    index + 1 === today.getDate() &&
                    monthInCalender === today.getMonth() &&
                    yearInCalender === today.getFullYear()
                      ? "pink"
                      : "",
                  border:
                    value &&
                    value.getDate() === index + 1 &&
                    value.getMonth() === monthInCalender &&
                    value.getFullYear() === yearInCalender
                      ? "2px solid blue"
                      : "",
                }}
                onClick={() => selectDateHandler(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DatePicker;

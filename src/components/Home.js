import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../slices/message";
import { getAllListings } from "../slices/listings"
import MyMap from "./common/Map";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { newBooking } from "../slices/booking";
import MooringTable from "./common/MooringTable";
import BookingTable from "./common/BookingTable";
import Button from 'react-bootstrap/Button';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Home = () => {

  const { user } = useSelector((state) => state.auth);
  const { listings } = useSelector((state) => state.listings);

  //selected marker state 
  const dispatch = useDispatch();
  const [selectedMarker, setSelectedMarker] = React.useState([])

  useEffect(() => {
    dispatch(clearMessage());
    dispatch(getAllListings())
  }, [dispatch]);

  const [disabledDates, setDisabledDates] = React.useState([])
  // const [disabledDatesFromSelection, setdisabledDatesFromSelection] = React.useState([])
  var getDaysArray = function (start, end) {
    for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
      arr.push(new Date(dt));
    }
    return arr;
  };
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    const dateSelection = getDaysArray(start?.setHours(0, 0, 0, 0), end?.setHours(0, 0, 0, 0))
    // console.log(disabledDates)
    // console.log(dateSelection)
    // console.log(dateSelection.some(e => disabledDates.includes(e)))
    for (let disabledDate in disabledDates) {
      for (let date in dateSelection) {
        if (disabledDates[disabledDate].toString() === dateSelection[date].toString()) {
          setStartDate(end);
          setEndDate(null)
          return
        }
      }
    }
    setStartDate(start);
    setEndDate(end);
  };


  const handleSelectedMakrer = (mooring) => {
    setSelectedMarker(mooring)
    setStartDate(null)
    setEndDate(null)
    var selectedDates = []
    for (let booking in mooring.bookings) {
      selectedDates = selectedDates.concat(getDaysArray(new Date(mooring.bookings[booking].fromDate), new Date(mooring.bookings[booking].toDate)))
    }
    setDisabledDates(selectedDates)
  }

  const handleMakeBooking = () => {

    var request = {
      fromDate: Date.parse(startDate),
      toDate: Date.parse(endDate),
      mooringId: selectedMarker.id,
    }

    dispatch(newBooking(request))

    console.log(request)
  }

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }



  return (
    <div class="container-xxl">
      <div class="row">

          {selectedMarker == undefined? <></> : <MooringTable data={[selectedMarker]}></MooringTable>}

          <MyMap viewMap={true} markers={listings} handleSelectedMarker={handleSelectedMakrer} selectedMarker={selectedMarker}></MyMap>
        <div class="col">
          {selectedMarker == undefined ? <></> : <>
            <BookingTable data={selectedMarker?.bookings}></BookingTable>
            <div class="row">
              <div class="row">
                <div class="col">
                  <>
                    <DatePicker
                      selected={startDate}
                      onChange={onChange}
                      minDate={new Date()}
                      startDate={startDate}
                      endDate={endDate}
                      excludeDates={disabledDates}
                      selectsRange
                      selectsD
                      inline
                    />
                  </>
                </div>
                <div class="col">
                  <p>From Date: {startDate?.toString()} Until Date: {endDate?.toString()}</p>
                  <Button disabled={!(startDate != null && endDate != null)} onClick={handleMakeBooking} class="mt-4">Make booking</Button>{' '}
                </div>

              </div>

            </div>



          </>}



        </div>
      </div>
    </div>
  );
};

export default Home;

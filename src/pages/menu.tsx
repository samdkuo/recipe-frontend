import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

const Home = () => {
  const [dateState, setDateState] = useState(new Date())
  const changeDate = (e: React.SetStateAction<Date>) => {
    setDateState(e)
  }
  return (
    <div>
      <Calendar
        value={dateState}
        onChange={changeDate}
      />
    </div>
  );
};

export default Home;
function moment(dateState: Date) {
  throw new Error('Function not implemented.');
}


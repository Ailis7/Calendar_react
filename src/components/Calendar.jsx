import React from "react";
import PropTypes from "prop-types";
import moment from 'moment/min/moment-with-locales'
moment.locale('ru');

export function Calendar({ date }) {

  const currentDay = moment(date);
  const begin = moment(date).startOf('M').startOf('week');
  const end = moment(date).endOf('M').endOf('week');
 
  const showDay = [];
  for (begin; begin.isBefore(end); begin.add(1, 'd')) {
    if (begin.format('D M') === currentDay.format('D M')) {
      showDay.push(<td key={begin.format('DD MM')} className="ui-datepicker-today">{begin.format('D')}</td>);
    } else if (begin.format('M') !== currentDay.format('M')) {
      showDay.push(<td key={begin.format('DD MM')} className="ui-datepicker-other-month">{begin.format('D')}</td>)
    } else {
      showDay.push(<td key={begin.format('DD MM')}>{begin.format('D')}</td>)
    }
  }

  const lineOfShowDay = [];
   for (let i = 0; showDay.length > 0; i +=7) {
    lineOfShowDay.push(
      <tr key={i}>
        {
          showDay.splice(0, 7)
        }
      </tr>
    )
   }
  
  return (
  <div className="ui-datepicker">
    <div className="ui-datepicker-material-header">
      <div className="ui-datepicker-material-day">{currentDay.format('dddd')}</div>
      <div className="ui-datepicker-material-date">
        <div className="ui-datepicker-material-day-num">{currentDay.format('D')}</div>
        <div className="ui-datepicker-material-month">{currentDay.format('DD MMMM').split(' ')[1]}</div>
        <div className="ui-datepicker-material-year">{currentDay.format('YYYY')}</div>
      </div>
    </div>
    <div className="ui-datepicker-header">
      <div className="ui-datepicker-title">
       <span className="ui-datepicker-month">Март</span>&nbsp;<span className="ui-datepicker-year">2017</span>
      </div>
    </div>
    <table className="ui-datepicker-calendar">
      <colgroup>
       <col/>
       <col/>
       <col/>
       <col/>
       <col/>
       <col className="ui-datepicker-week-end"></col>
       <col className="ui-datepicker-week-end"></col>
      </colgroup>
      <thead>
        <tr>
          <th scope="col" title="Понедельник">Пн</th>
          <th scope="col" title="Вторник">Вт</th>
          <th scope="col" title="Среда">Ср</th>
          <th scope="col" title="Четверг">Чт</th>
          <th scope="col" title="Пятница">Пт</th>
          <th scope="col" title="Суббота">Сб</th>
          <th scope="col" title="Воскресенье">Вс</th>
        </tr>
      </thead>
      <tbody>
        {lineOfShowDay}
      </tbody>
    </table>
  </div>
  );
}

Calendar.propTypes = {
  date: PropTypes.instanceOf(Date),
}

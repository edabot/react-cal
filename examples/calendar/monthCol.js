/* eslint react/prop-types: 0 */
/* eslint react/jsx-sort-props: 0 */

import React from 'react';
import ReactPDF from '@react-pdf/node';
import moment from 'moment'
import {
  Document,
  Page,
  View,
  Text,
  Link,
  Font,
  StyleSheet,
} from '@react-pdf/core';

const styles = StyleSheet.create({
  title: {
    margin: 20,
    fontSize: 25,
    align: 'center',
    backgroundColor: '#e4e4e4',
    textDecoration: 'underline',
    textTransform: 'uppercase',
    fontFamily: 'Roboto',
  },
  body: {
    padding: 54,
    flexGrow: 1,

  },
  row: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  rowYear: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rowCalendar: {
    height: 100,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  year: {
    color: '#aaa',
    fontSize: 44,
    textAlign: 'center',
    flexGrow: 1,
    width: 100
  },
  gutter: {
    width: 88,
  },
  block: {
    flexGrow: 1,
  },
  text: {
    flexGrow: 3,
    margin: 10,
    fontFamily: 'Oswald',
  },
  monthCol: {
      width: 766,
      backgroundColor: '#990000'
  },
  week: {
      flexDirection: 'row',
  },
  weeks: {
      flexDirection: 'column',
  },
  day: {
    height: 86.4,
    width: 109.44,
    padding: 5,
    borderWidth: .5,
    borderColor: "#AAA"
  },
  day_green: {
      backgroundColor: "#F0F5EE",
  },
  day_yellow: {
      backgroundColor: "#FEFEF7",
  },
  day_red: {
      backgroundColor: "#FAF6F2",
  },
  day_blue: {
      backgroundColor: "#F4FAFC",
  },
  day_ghost: {
    color: "#505050"
  }
});

Font.register(`${__dirname}/fonts/Roboto-Regular.ttf`, { family: 'Roboto' });
Font.register(
  'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
  { family: 'Oswald' },
);

const Day = ({date, dates}) => {
    let style = styles.day
    let month = date.month() + 1
    if ( date.isBefore(dates.first_day) || date.isAfter(dates.last_day) ) {
      style={...style, ...styles.day_ghost}
    }
    else if ( month % 4 === 1 ) {
        style={...style, ...styles.day_green}
    } else if ( month % 4 === 2 ) {
      style={...style, ...styles.day_yellow}
    } else if ( month % 4 === 3 ) {
      style={...style, ...styles.day_red}
    } else {
      style={...style, ...styles.day_blue}
    }
    return (
      <View style={style}>
        <Text>{date.date()}</Text>
      </View>
    )
}

const Week = ({startDate, dates}) => {
    let days = []
    for (let i=0; i < 7; i++) {
        days.push(moment(startDate).add(i, 'days'));
    }
    return (
        <View style={styles.week}>
            {days.map((date) => <Day key={date} date={date} dates={dates}/>)}
        </View>
    )
}

const MonthCol = ({dates, weekCount}) => {
    let weeks = []
    for (let i=0; i < weekCount; i++) {
        weeks.push(moment(dates.cal_start).add(i * 7, 'days'));
    }

    return (
      <View style={styles.weeks}>
          {weeks.map((date) => <Week key={date} startDate={date} dates={dates}/>)}
      </View>
    );
};

export default MonthCol

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
  dayNames: {
    width: 766,
    flexDirection: 'row',
    height: 20,
    justifyContent: 'space-around',
  },
  day: {
    height: 86.4,
    width: 109.44,
    padding: 5,
    borderWidth: .5,
    borderColor: "#AAA"
  },
  date: {
    color: "#555"
  },
  day_green: {
      backgroundColor: "#F0F5EE",
  },
  day_green_weekend: {
      backgroundColor: "#E9EDE6",
  },
  day_yellow: {
      backgroundColor: "#FEFEF7",
  },
  day_yellow_weekend: {
      backgroundColor: "#F9F8EF",
  },
  day_red: {
      backgroundColor: "#FAF6F2",
  },
  day_red_weekend: {
      backgroundColor: "#F4EDE9",
  },
  day_blue: {
      backgroundColor: "#F4FAFC",
  },
  day_blue_weekend: {
      backgroundColor: "#EDF4F5",
  },
  day_ghost: {
    color: "#505050"
  },
  dayName: {
    fontSize: 14,
    color: '#aaa',
  },
  top_border: {
    height: 85.4,
    marginTop: 1,
  },
  left_border: {
    width: 108.44,
    marginLeft: 1,
  },
  bottom_border: {
    height: 85.4,
    marginBottom: 1,
  },
  right_border: {
    width: 108.44,
    marginRight: 1,
  },
});

Font.register(`${__dirname}/fonts/Roboto-Regular.ttf`, { family: 'Roboto' });
Font.register(
  'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
  { family: 'Oswald' },
);

const Day = ({date, dates}) => {
    let style = styles.day,
      dateStyle = styles.date,
      weekend = false,
      month = date.month() + 1,
      tomorrow = moment(date).add(1, 'days'),
      weekFromNow = moment(date).add(7, 'days'),
      weekAgo = moment(date).subtract(7, 'days')
      if ( date.day() === 0 || date.day() === 6 ) {
        weekend = true
      }

    //add month colors
    if ( date.isBefore(dates.first_day) || date.isAfter(dates.last_day) ) {
      style={...style, ...styles.day_ghost}
    }
    else if ( month % 4 === 1 ) {
      if (weekend) {
        style={...style, ...styles.day_green_weekend}
      } else {
        style={...style, ...styles.day_green}
      }
    } else if ( month % 4 === 2 ) {
      if (weekend) {
        style={...style, ...styles.day_yellow_weekend}
      } else {
        style={...style, ...styles.day_yellow}
      }
    } else if ( month % 4 === 3 ) {
      if (weekend) {
        style={...style, ...styles.day_red_weekend}
      } else {
        style={...style, ...styles.day_red}
      }
    } else {
      if (weekend) {
        style={...style, ...styles.day_blue_weekend}
      } else {
        style={...style, ...styles.day_blue}
      }
    }

    //add month border margin
    if (date.date() <= 7 && weekAgo.isSameOrAfter(dates.first_day)) {
      style={...style, ...styles.top_border}
    }
    if (date.date() == 1 && date.day() > 0 ) {
      style={...style, ...styles.left_border}
    }
    if (weekFromNow.date() <= 7 && weekFromNow.isSameOrBefore(dates.last_day)) {
      style={...style, ...styles.bottom_border}
    }
    if (tomorrow.date() === 1 && tomorrow.day() !== 0 ) {
      style={...style, ...styles.right_border}
    }

    return (
      <View style={style}>
        <Text style={dateStyle}>{date.date()}</Text>
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
    let weeks = [],
      dayNames = [ 'Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa' ]
    for (let i=0; i < weekCount; i++) {
        weeks.push(moment(dates.cal_start).add(i * 7, 'days'));
    }

    return (
      <View>
        <View style={styles.dayNames}>
          {dayNames.map(name => <Text key={name} style={styles.dayName}>{name}</Text>)}
        </View>

        <View style={styles.weeks}>
            {weeks.map((date) => <Week key={date} startDate={date} dates={dates}/>)}
        </View>
      </View>
    );
};

export default MonthCol

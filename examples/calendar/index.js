/* eslint react/prop-types: 0 */
/* eslint react/jsx-sort-props: 0 */

import React from 'react';
import ReactPDF from '@react-pdf/node';
import moment from 'moment';
import {
  Document,
  Page,
  View,
  Text,
  Link,
  Font,
  StyleSheet,
} from '@react-pdf/core';
import MonthCol from './monthCol'

let year = 2019

let dates1 = {
  cal_start: moment(year + '-01-01').startOf('week'),
  first_day: moment(year + '-01-01'),
  last_day: moment(year + '-06-30')
}
let dates2 = {
  cal_start: moment(year + '-07-01').startOf('week'),
  first_day: moment(year + '-07-01'),
  last_day: moment(year + '-12-31')
}

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
    width: 20,
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
  },
  weekCount: {
    width: 44,
    marginTop: 20,
  },
  weekNumber: {
    color: '#aaa',
    fontSize: 14,
  },
  weekNumContainer: {
    height: 86.4,
    padding: 10,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  left: {
    alignItems: 'flex-start',
  },
  right: {
    alignItems: 'flex-end',
  }
});

Font.register(`${__dirname}/fonts/Roboto-Regular.ttf`, { family: 'Roboto' });
Font.register(
  'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
  { family: 'Oswald' },
);

const WeekCount = ({start, end, side}) => {
    let weeks = [],
      numStyle = styles.weekNumContainer
    for (let i=start; i <= end; i++) {
        weeks.push(i);
    }
    if ( side === "left" ) {
      numStyle = {...numStyle, ...styles.left}
    } else {
      numStyle = {...numStyle, ...styles.right}
    }
    return (
        <View style={styles.weekCount}>
            {weeks.map((weekNumber) => <View key={weekNumber} style={numStyle}><Text style={styles.weekNumber}>{weekNumber}</Text></View>)}
        </View>
    )
}

const doc = (
  <Document>
    <Page size="P24X36">
      <View style={styles.body}>
          <View style={styles.rowYear}>
              <View>
                  <Text style={styles.year}>{year}</Text>
              </ View>
          </View>
        <View style={styles.rowCalendar}>
          <View style={styles.monthCol}>
            <MonthCol dates={dates1} weekCount={27}/>
          </View>
          <WeekCount start={1} end={26} side={"left"}/>
          <WeekCount start={27} end={53} side={"right"}/>
          <View style={styles.monthCol}>
            <MonthCol dates={dates2} weekCount={27}/>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

ReactPDF.render(doc, `${__dirname}/output.pdf`);

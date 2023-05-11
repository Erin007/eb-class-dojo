import React, { useEffect, useState } from "react"
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider, styled } from 'baseui';
import { Accordion, Panel } from "baseui/accordion";
import './App.css';
import ClassCard from './components/ClassCard.js'

const engine = new Styletron();

const Centered = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

function App() {
  const [awards, setAwards] = useState([])

  useEffect(() => {
    getAwards()
  }, [])

  const getAwards = async() => {
    fetch("https://teach.classdojo.com/api/interviewChallenge")
    .then(response => response.json())
    .then(data => setAwards(data.awards))
  }

  const sortByClass = function(data) {
    let sorted = {}
    data.forEach(award => {
      if (Object.keys(sorted).includes(award.classroom)) {
        sorted[award.classroom].push(award)
      } else {
        sorted[award.classroom] = [award]
      }
    })

    return sorted;
  }

  const pointsByStudent = function(awards) {
    let studentPoints = {}
    awards.forEach(award => {
        if (Object.keys(studentPoints).includes(award.student)) {
          studentPoints[award.student] += award.weight
        } else {
          studentPoints[award.student] = award.weight
        }
    })
    return studentPoints
  }

  const awardsByClass = sortByClass(awards)
  const classNames = Object.keys(awardsByClass)

  const getAvatar = function(awards, studentName) {
   return awards[awards.findIndex(element => element.student === studentName)].studentAvatar
  }

  const getClassCardData = function() {
    let cardDataByClass = {}

    classNames.forEach(className => {
      let dataForCards = []
      const awards = awardsByClass[className]
      const pointTotals = pointsByStudent(awards)

      Object.keys(pointTotals).forEach(student => {
        let dataForCard = {}
        dataForCard.name = student
        dataForCard.pointTotal = pointTotals[student]
        dataForCard.avatar = getAvatar(awards, student)

        dataForCards.push(dataForCard)
      })
      cardDataByClass[className] = dataForCards
    })
    return cardDataByClass
  }

  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Centered>
            <div className="App" style={{width: 500}}>
              <Accordion>
                {classNames.map(
                  className =>
                  <Panel key={className}title={className}>
                    <ClassCard key={className} className={className} students={getClassCardData()[className]}/>
                  </Panel>
                )}
              </Accordion>
            </div>
        </Centered>
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
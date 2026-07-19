import { useMemo, useState } from 'react'
import { useStoredState } from './lib/useStoredState.js'
import { frontsNeedingRecovery } from './lib/neverMissTwice.js'
import Dashboard from './screens/Dashboard.jsx'
import Recovery from './screens/Recovery.jsx'
import TFMView from './screens/TFMView.jsx'
import DecisionModule from './screens/DecisionModule.jsx'
import PrivateModule from './screens/PrivateModule.jsx'

export default function App() {
  const [screen, setScreen] = useState('dashboard')
  const [frontsData, setFrontsData] = useStoredState('s22_fronts', {})
  const [tfmDay, setTfmDay] = useStoredState('s22_tfm_day', 1)
  const [decisions, setDecisions] = useStoredState('s22_decisions', [])
  const [privateData, setPrivateData] = useStoredState('s22_private', {})
  const [monthOffset, setMonthOffset] = useState(0)

  const recoveryFronts = useMemo(() => frontsNeedingRecovery(frontsData), [frontsData])

  function changeFrontEntry(frontId, dateStr, entry) {
    setFrontsData((prev) => ({
      ...prev,
      [frontId]: { ...(prev[frontId] || {}), [dateStr]: entry },
    }))
  }

  function doMinimal(frontId, dateStr, minimalText) {
    setFrontsData((prev) => ({
      ...prev,
      [frontId]: {
        ...(prev[frontId] || {}),
        [dateStr]: { done: true, text: prev[frontId]?.[dateStr]?.text || minimalText },
      },
    }))
  }

  function completeTfm() {
    setTfmDay((d) => Math.min(d + 1, 61))
  }

  function addDecision(decision) {
    setDecisions((prev) => [...prev, decision])
  }

  function changePrivateEntry(monthKey, weekKey, entry) {
    setPrivateData((prev) => ({
      ...prev,
      [monthKey]: {
        note: prev[monthKey]?.note || '',
        entries: { ...(prev[monthKey]?.entries || {}), [weekKey]: entry },
      },
    }))
  }

  function changePrivateNote(monthKey, note) {
    setPrivateData((prev) => ({
      ...prev,
      [monthKey]: { entries: prev[monthKey]?.entries || {}, note },
    }))
  }

  if (screen === 'dashboard' && recoveryFronts.length > 0) {
    return (
      <Recovery
        fronts={recoveryFronts}
        onDoMinimal={doMinimal}
      />
    )
  }

  if (screen === 'tfm') {
    return (
      <TFMView
        tfmDay={tfmDay}
        onComplete={completeTfm}
        onBack={() => setScreen('dashboard')}
      />
    )
  }

  if (screen === 'decision') {
    return (
      <DecisionModule
        decisions={decisions}
        onAdd={addDecision}
        onBack={() => setScreen('dashboard')}
      />
    )
  }

  if (screen === 'private') {
    return (
      <PrivateModule
        privateData={privateData}
        onChangeEntry={changePrivateEntry}
        onChangeNote={changePrivateNote}
        onBack={() => setScreen('dashboard')}
        monthOffset={monthOffset}
        setMonthOffset={setMonthOffset}
      />
    )
  }

  return (
    <Dashboard
      frontsData={frontsData}
      onChangeFront={changeFrontEntry}
      onOpenTfm={() => setScreen('tfm')}
      onOpenDecision={() => setScreen('decision')}
      onOpenPrivate={() => setScreen('private')}
    />
  )
}

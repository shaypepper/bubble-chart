import * as React from 'react'

class RandomColorGenerator {
  color?: string
  somethingElse?: string
  yellow = Math.random()
  changeColor() {
    this.color = `hsl(${Math.ceil(Math.random() * 100)}, ${Math.ceil(
      Math.random() * 100
    )}%, ${Math.ceil(Math.random() * 100)}%)`
    this.somethingElse = 'SHAY WAS HERE'
    return this.color
  }
}

const ClassesPlayButton = ({ color, onClick }) => {
  return (
    <button
      onClick={() => {
        console.log('color', color)
        onClick()
      }}
    >
      {' '}
      New Color!{' '}
    </button>
  )
}

const ClassesPlay = () => {
  const [state, setState] = React.useState({
    generator: new RandomColorGenerator(),
  })

  const color = state.generator.color
  return React.useMemo(
    () => (
      <div style={{ height: '100px', backgroundColor: color }}>
        <ClassesPlayButton
          onClick={() => {
            setState((currentState) => ({
              ...currentState,
            }))
            console.log(
              state.generator.changeColor(),
              state.generator.color,
              state.generator.yellow
              // new RandomColorGenerator()
            )
          }}
          color={color}
        />
      </div>
    ),
    [color]
  )
}

export default ClassesPlay

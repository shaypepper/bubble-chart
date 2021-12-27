import { createContext, useContext } from 'react'

export const bubbleChartContext = createContext<BubbleChartProviderTypes>({})

type BubbleChartProviderTypes = {
  things?: number[]
}

export const BubbleChartProvider: React.FC = ({ children }) => {
  const value = {
    things: [1, 2, 3],
  }
  return (
    <bubbleChartContext.Provider value={value}>
      {children}
    </bubbleChartContext.Provider>
  )
}

export const useBubbleChartContext = () => {
  const { things } = useContext(bubbleChartContext)

  return things
}

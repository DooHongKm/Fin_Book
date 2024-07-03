import React from 'react'
import { ResponsivePie } from '@nivo/pie'

const Graph = ({ userId, year, month }) => {

  // 임시 값, 실제로는 DB와 통신을 통해 값을 받아옴
  const data = [
    {
      "id": "scala",
      "label": "scala",
      "value": 188,
      "color": "hsl(227, 70%, 50%)"
    },
    {
      "id": "sass",
      "label": "sass",
      "value": 34,
      "color": "hsl(345, 70%, 50%)"
    },
    {
      "id": "haskell",
      "label": "haskell",
      "value": 584,
      "color": "hsl(299, 70%, 50%)"
    },
    {
      "id": "javascript",
      "label": "javascript",
      "value": 197,
      "color": "hsl(225, 70%, 50%)"
    },
    {
      "id": "c",
      "label": "c",
      "value": 501,
      "color": "hsl(296, 70%, 50%)"
    }
  ]

  const totalValue = data.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className='graph-container'>
      <ResponsivePie
        data={data}
        margin={{ top: 30, right: 0, bottom: 50, left: 0 }}
        sortByValue={true}
        fit={false}
        activeOuterRadiusOffset={5}
        colors={{ scheme: 'blues' }}
        borderColor={{
            from: 'color',
            modifiers: [['darker', 0.2]]
        }}
        enableArcLinkLabels={false}
        arcLabel="id"
        arcLabelsRadiusOffset={0.55}
        arcLabelsSkipAngle={0}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [['darker','3']]
        }}
        tooltip={({ datum }) => (
          <div
            style={{
              padding: '12px',
              background: 'white',
              border: '1px solid #ccc',
              borderRadius: '3px',
              boxShadow: '0 3px 9px rgba(0, 0, 0, 0.15)'
            }}
          >
            <strong>{datum.id}</strong>
            <br />
            Amount : {datum.value}원
            <br />
            Percentage : {(datum.value/totalValue*100).toFixed(2)}%
          </div>
        )}
        motionConfig="wobbly"
        legends={false}
        theme={{
          labels: {
            text: {fontSize: 20, fill: '#000'}
          }
        }}
    />
    </div>
  )
}

export default Graph

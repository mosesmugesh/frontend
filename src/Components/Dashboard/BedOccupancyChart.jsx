import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const BedOccupancyChart = () => {
  const chartData = [
    {
      date: '2023-09-01',
      admissions: 5,
    },
    {
      date: '2023-09-02',
      admissions: 8,
    },
    {
      date: '2023-09-03',
      admissions: 3,
    },
    // Add more data points as needed
  ];

  return (
    <div>
      <div style={{ width: '50%', height: '480px' }}>
        <ResponsiveBar
          data={chartData}
          keys={['admissions']}
          indexBy="date"
          margin={{ top: 100, right: 60, bottom: 60, left: 60 }}
          padding={0.1}
          colors={{ scheme: 'nivo' }}
          axisBottom={{
            tickRotation: -45,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            tickValues: [0, 1, 2, 3, 4, 5],
          }}
          enableGridX={false}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
    </div>
  );
};

export default BedOccupancyChart;

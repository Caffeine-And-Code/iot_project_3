import { Slider, Stack } from '@mui/material'
import React from 'react'
import WindowVisualizer from './WindowVisualizer';

function SelectPercentage() {
    const [position, setPosition] = React.useState<number>(0);

    const marks = [
        {
          value: 0,
          label: '0%',
        },
        {
          value: 50,
          label: '50%',
        },
        {
          value: 100,
          label: '100%',
        },
      ];
  return (
    <Stack spacing={4} direction="column" alignItems="center" sx={{ marginTop: '20px' }}>
     <WindowVisualizer percentage={position}/>
     <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          valueLabelDisplay="auto"
          getAriaValueText={(value) => `${value}%`}
          min={0}
          step={1}
          max={100}
            marks={marks}
          onChange={(_, value) => setPosition(value as number)}
          sx={(t) => ({
            color: 'rgba(0,0,0,0.87)',
            height: 10,
            '& .MuiSlider-thumb': {
              width: 18,
              height: 18,
              transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
              '&::before': {
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
              },
              '&:hover, &.Mui-focusVisible': {
                boxShadow: `0px 0px 0px 8px ${'rgb(0 0 0 / 16%)'}`,
                ...t.applyStyles('dark', {
                  boxShadow: `0px 0px 0px 8px ${'rgb(255 255 255 / 16%)'}`,
                }),
              },
              '&.Mui-active': {
                width: 24,
                height: 24,
              },
            },
            '& .MuiSlider-rail': {
              opacity: 0.28,
            },
            '& .MuiSlider-mark': {
              height: 5,
            },
            ...t.applyStyles('dark', {
              color: '#fff',
            }),
          })}
        />
    </Stack>
  )
}

export default SelectPercentage
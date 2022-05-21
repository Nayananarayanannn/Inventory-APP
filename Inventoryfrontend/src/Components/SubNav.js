import { Grid } from '@mui/material'
import React from 'react'

function SubNav({ components, page }) {
  return (
    <Grid container className='subNav'>
        {components?.map((navs) => (
           <a href={`/home/${page}/${navs}`}> <h4>{navs}</h4></a>
        ))}
    </Grid>
  )
}

export default SubNav
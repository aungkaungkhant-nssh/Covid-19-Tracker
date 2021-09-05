import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react'
import "./InfoBox.css"
function InfoBox({title,active,isGreen,isRed,cases,total,...props}) {
    return (
         <Card className={`infoBox ${active && 'infoBox__selected'} ${isRed && 'infoBox__deaths'} ${isGreen && 'infoBox__recovered'}`} onClick={props.onClick}>
             <CardContent>
                 <Typography color="textSecondary" gutterBottom>{title}</Typography>
                 <h2 className={`infoBox__cases`}>{cases}</h2>
                 <Typography className={`infoBox__total`}>{total}</Typography>
             </CardContent>
         </Card>
    )
}

export default InfoBox

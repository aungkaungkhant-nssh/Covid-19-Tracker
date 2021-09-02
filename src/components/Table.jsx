import React from 'react'
import './Table.css'
function Table({countries}) {
    return (
        <div className="table">
            <table>
                   {
                       countries.map((country)=>{
                            return(
                                <tr>
                                    <td>{country.country}</td>
                                    <td>{country.cases}</td>
                                </tr>
                            )
                       })
                   }
            </table>
        </div>
    )
}

export default Table


import React, { Fragment } from "react";
import classes from '../../applicationSettings/app.module.css';

const ReadOnlyRow = ({ fieldInfo, handleDeleteClick }) => {
  return (
    <tr className={classes.tr}>
      <td scope="row" data-label="Label For" className={classes.td}>{fieldInfo.labelFor}</td>
      <td data-label="Label Name" className={classes.td}>{fieldInfo.labelName}</td>
      <td data-label="Input Type" className={classes.td}>{fieldInfo.inputType}</td>
      <td data-label="Input Id" className={classes.td}>{fieldInfo.inputId}</td>
      {fieldInfo.inputValue !== "" && (
        <td data-label="Input Id" className={classes.td}>{fieldInfo.inputValue}</td>
      )}
     <td className={classes.td}>
      
        <button className={classes.delbtn} type="button" onClick={() => handleDeleteClick(fieldInfo.id)}>
          Delete
        </button>
      </td>
    </tr>

  );
};

export default ReadOnlyRow;
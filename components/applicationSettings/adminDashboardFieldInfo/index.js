import React, { useState, Fragment, useEffect } from "react";
import { nanoid } from "nanoid";
import { useRouter } from 'next/router';
import classes from '../../applicationSettings/app.module.css';
import ReadOnlyRow from '../readOnlyOutput';

// const getLocalItems = () => {
//     if (typeof window !== 'undefined') {
//         let list = localStorage.getItem('itemlists');
//         if (list) {
//             return JSON.parse(localStorage.getItem('itemlists'));
//         } else {
//             return ''; 
//         }
//     }
// }

async function createFieldInfo(id, applicationId, labelFor, labelName, inputType, inputId, inputValue ) {
  const response = await fetch(`/api/storeAppFields/${applicationId}`, {
    method: 'POST',
    body: JSON.stringify({ id, applicationId, labelFor, labelName, inputType, inputId, inputValue }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) { throw new Error(data.message || 'Something went wrong!');}
  return data;
}


async function deleteFieldInfo(fieldInfoId) {
  const response = await fetch(`/api/storeAppFields/deleteAppFields/${fieldInfoId}`, {
    method: 'POST',
    body: JSON.stringify({ fieldInfoId }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) { throw new Error(data.message || 'Something went wrong!');}
  return data;
}

function AdminDashboardFieldInfo() {
  const router = useRouter();
  const [appId, setAppId] = useState(null);
  const [fieldInfos, setFieldInfos] = useState('');
  const [enable, setEnable] = useState(false);
  const [addFormData, setAddFormData] = useState({
    labelFor: "",
    labelName: "",
    inputType: "",
    inputId: "",
    inputValue: "",
  });

  function handleAddFormChange(event) {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    if(fieldValue === "Checkbox" || fieldValue === "Radio"){
      setEnable(true);
    } else
    {
      setEnable(false);
    }
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
    
  };

  async function handleAddFormSubmit(event) {
    event.preventDefault();
   
    const newFieldInfo = {
      id: nanoid(),
      appliId: appId.appId,
      labelFor: addFormData.labelFor,
      labelName: addFormData.labelName,
      inputType: addFormData.inputType,
      inputId: addFormData.inputId,
      inputValue: addFormData.inputValue,
    };

    try {
      const result = await createFieldInfo(newFieldInfo.id, newFieldInfo.appliId, newFieldInfo.labelFor, newFieldInfo.labelName, newFieldInfo.inputType, newFieldInfo.inputId, newFieldInfo.inputValue );
      console.log(result);
    } catch (error) {
      console.log(error);
    }   

    try {
        fetch(`/api/storeAppFields/${newFieldInfo.appliId}`).then(response => response.json()).then(data => setFieldInfos(data))
    } catch (error) {
        console.log(error);
    }    

    // const newFieldInfos = [...fieldInfos, newFieldInfo];
    // setFieldInfos(newFieldInfos);
  };

  // const handleDeleteClick = (fieldInfoId) => {
  //   const newFieldInfos = [...fieldInfos];
  //   const index = fieldInfos.findIndex((fieldInfo) => fieldInfo.id === fieldInfoId);
  //   newFieldInfos.splice(index, 1);
  //   setFieldInfos(newFieldInfos);
  // };

  // useEffect(() => {
  //   localStorage.setItem('itemlists', JSON.stringify(fieldInfos))
  // }, [fieldInfos]);

  async function handleDeleteClick(fieldInfoId){
    try {
      const result = await deleteFieldInfo(fieldInfoId);
      console.log(result);
    } catch (error) {
      console.log(error);
    }  
  
    try {
      fetch(`/api/storeAppFields/${appId.appId}`).then(response => response.json()).then(data => setFieldInfos(data))
    } catch (error) {
      console.log(error);
    }    
  }

  // function goToDynamicForm(pathToFormId) {
  //   router.push(`/${pathToFormId}`);
  // }

  useEffect(() => {
    if (router.isReady) {      
      console.log('quesry:',router.query);
      var routerqueryval = router.query;
      var myobj = JSON.parse(JSON.stringify(routerqueryval));
      setAppId(myobj);  
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
     if(appId){
         fetch(`/api/storeAppFields/${appId.appId}`)
         .then(response => response.json())
         .then(data => setFieldInfos(data))
    }
  
   }, [appId]);

  return (
    <div className={classes.maincontainer}>
        <div className={classes.mainheading}>        
            {appId && (
              <div>
                <h4>Application Id : {appId.appId}</h4>
                </div>
            )}      
        </div>   
    <div className={classes.container}>
        <table className={classes.table}>
          <thead className={classes.thead}>
            <tr className={classes.tr}>
              <th scope="col" className={classes.th}>label For</th>
              <th scope="col" className={classes.th}>label Name</th>
              <th scope="col" className={classes.th}>Input Type</th>
              <th scope="col" className={classes.th}>Input Id</th>
              <th scope="col" className={classes.th}>Input Value</th>
              <th className={classes.th}></th>
            </tr>
          </thead>
          <tbody>
            {fieldInfos && (
            fieldInfos.map((fieldInfo ,index) => (
              <Fragment key={index}>             
                {                             
                  <ReadOnlyRow
                  fieldInfo={fieldInfo}
                  handleDeleteClick={handleDeleteClick}
                  />
                }              
              </Fragment>
            )))}           
          </tbody>
        </table>   
       
    <br />
      <h4>Add fieldInfo</h4>
      <form onSubmit={handleAddFormSubmit}>
      <table className={classes.table}>
        <tbody>    
        <tr className={classes.tr}>       
        {/* <form className={classes.form} > */}
        <td className={classes.td}>
        <input className={classes.tableinput}
          type="text"
          name="labelFor"
          required="required"
          placeholder="Label For ="
          onChange={handleAddFormChange}        
        /></td>
        <td className={classes.td}>
        <input className={classes.tableinput}
          type="text"
          name="labelName"
          required="required"
          placeholder="Label Name"
          onChange={handleAddFormChange}
        /></td>
        <td className={classes.td}>
        <select name="inputType"
        className={classes.tableinput}
          required="required"
          placeholder="Input Type ="
          onChange={handleAddFormChange}>
          <option value="" disabled selected>Select Input Type = </option>
          <option value="Text">Text</option>
          <option value="Email">Email</option>
          <option value="Number">Number</option>
          <option value="Checkbox">Checkbox</option>
          <option value="Radio">Radio</option>
          <option value="Date">Date</option>
          <option value="File">File</option>      
        </select>
        </td>
        <td className={classes.td}>
        <input className={classes.tableinput}
          type="text"
          name="inputId"
          required="required"
          placeholder="Input Id ="
          onChange={handleAddFormChange}
        /></td>
         <td className={classes.td}>
          {enable && (
             <input className={classes.tableinput}
             type="text"
             name="inputValue"        
             placeholder="Input Value ="
             onChange={handleAddFormChange}
             
           />
          )}
        </td>
        <td className={classes.td}>
        <button className={classes.addbtn} type="submit">Add</button>
        </td>     
        </tr>       
        </tbody>
        </table>
       
        </form>
        <br />
        <br />
      
    </div>
    </div>
    
  );
};

export default AdminDashboardFieldInfo;
import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import classes from '../../applicationSettings/app.module.css';
import styles from '../../dashboard/dashboard.module.css';
import { useRouter } from 'next/router';

async function createApp(id, name, des, quali, jobtype, status) {
  const response = await fetch('/api/storeAppList/appList', {
    method: 'POST',
    body: JSON.stringify({ id, name, des, quali, jobtype, status }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }
  return data;
}

async function updateStatus(id, status) {
  const response = await fetch('/api/storeAppList/appList', {
    method: 'PATCH',
    body: JSON.stringify({ id, status }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }
  return data;
}

async function deleteItem(appNameId) {
  const response = await fetch('/api/storeAppList/deleteListItem', {
    method: 'POST',
    body: JSON.stringify({ appNameId }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }
  return data;
}


function AdminDashboard() {
  const router = useRouter();
  const [appNames, setAppNames] = useState('');
  const [addFormData, setAddFormData] = useState({
    applicationName: "",
  });

  function handleAddFormChange(event) {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };

  async function handleAddFormSubmit(event) {
    event.preventDefault();
    const newAppName = {
      id: nanoid(),
      applicationName: addFormData.applicationName,
      appDescription: addFormData.appDescription,
      qualifications: addFormData.qualifications,
      jobType: addFormData.jobType,
      status: "Active",   
    };

    try {
        const result = await createApp(newAppName.id,newAppName.applicationName, newAppName.appDescription, newAppName.qualifications , newAppName.jobType, newAppName.status);
        console.log(result);
    } catch (error) {
        console.log(error);
    }   

    try {
          fetch('/api/storeAppList/appList').then(response => response.json()).then(data => setAppNames(data))
    } catch (error) {
          console.log(error);
    }    
  };

  useEffect(() => {
    fetch('/api/storeAppList/appList').then(response => response.json()).then(data => setAppNames(data))
   }, []);
  

  async function handleDeleteClick(appNameId){
    try {
      const result = await deleteItem(appNameId);
      console.log(result);
  } catch (error) {
      console.log(error);
  }  
  
  try {
      fetch('/api/storeAppList/appList').then(response => response.json()).then(data => setAppNames(data))
  } catch (error) {
      console.log(error);
  }    
  }

  function goToApplication(pathid) {
         router.push(`/admin/applications/${pathid}`);
  }

  let status;

  function handleChange(event){
    status = event.target.value;
    console.log(status);
  }
  

  async function handleUpdateClick(appid){
    try {
      const result = await updateStatus( appid, status);
      console.log(result);
      } catch (error) {
      console.log(error);
    }   

    try {
      fetch('/api/storeAppList/appList').then(response => response.json()).then(data => setAppNames(data))
    } catch (error) {
      console.log(error);
    }    

  }
  
  return (

    <div className={classes.maincontainer}>
    
    <div className={classes.container}>
      <div className={styles.heading2}>
          <h3>Add a new application</h3>
      </div>  
    <div className={classes.dynamicformcontainer}>
      <form onSubmit={handleAddFormSubmit}>
        <div className={classes.row}>   
      
        <div className={classes.col33}>
        <input className={classes.input}
          type="text"
          name="jobType"
          placeholder="Job Type"
          onChange={handleAddFormChange}
          required />   
        </div>
        <div className={classes.col33}>
        <input className={classes.input}
          type="text"
          name="qualifications"
          placeholder="Qualifications"
          onChange={handleAddFormChange}
          required />   
        </div>
        <div className={classes.col33}>
        <input className={classes.input}
          type="text"
          name="applicationName"
          placeholder="Application Name"
          onChange={handleAddFormChange}
          required />   
        </div>      
        <div className={classes.col99}>
        <textarea className={classes.input}
          type="text"
          name="appDescription"
          placeholder="Description"
          onChange={handleAddFormChange}
          required />   
        </div>
        <div className={classes.row}>
        <button className={classes.submit} type="submit">Add Application</button>
        </div>
        </div>
    </form> 
    </div>
    <br/>
    <br/>
    
    <div className={styles.heading2}>
          <h3>Saved applications</h3>
      </div>      
    
      <form className={classes.form} >
        <table className={classes.table}>
          <thead className={classes.thead}>
            <tr className={classes.tr}>
              <th scope="col" className={classes.th}>Application</th>         
              <th scope="col" className={classes.th}>ID</th>
              <th scope="col" className={classes.th}>Update</th>
              <th scope="col" className={classes.th}></th>
              <th scope="col" className={classes.th}>Status</th>
              <th scope="col" className={classes.th}></th>
            </tr>
          </thead>
          <tbody>
          {appNames && (
            appNames.map((appName, index) => (
                <tr key={index} className={classes.tr}>
                <td scope="row" data-label="Name" className={classes.td1}>
                    <button className={classes.appbtn} type="button" onClick={() => goToApplication(appName.id)}>{appName.appName}</button>
                </td>
                <td data-label="ID" className={classes.td2}>{appName.id}</td>
                <td data-label="Update" className={classes.td3}>
                <form onChange={handleChange}>
                <input
                    id="active"
                    value="Active"
                    name="status"
                    type="radio"               
                  />
                  Active    
                  &nbsp;           
                  <input
                    id="passive"
                    value="Passive"
                    name="status"
                    type="radio"                 
                  />
                  Passive
                  &nbsp;
                 
                  </form>                
                  </td>
                  <td className={classes.td4}>
                  <button className={classes.updatebtn} type="button" onClick={() => handleUpdateClick(appName.id)}>Update</button>                
                  </td>
                  <td data-label="Status" className={classes.td5}><h6 className={ appName.appstatus == "Active" ? classes.active : classes.passive }>{appName.appstatus}</h6></td>
                  <td className={classes.td6}>               
                  <button className={classes.delbtn} type="button" onClick={() => handleDeleteClick(appName.id)}> 
                  {/* <button type="button"> */}
                    Delete
                  </button>
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </form>
    <br />
     
    </div>
    </div>
    
  );
};

export default AdminDashboard;
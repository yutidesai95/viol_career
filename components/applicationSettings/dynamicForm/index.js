import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import classes from '../../applicationSettings/app.module.css';
import { useS3Upload } from "next-s3-upload";
import styles from '../../dashboard/dashboard.module.css';

async function createDynamicInfo(restFormFields) {
    const response = await fetch(`/api/dynamicForm/formInputData`, {
      method: 'POST',
      body: JSON.stringify(restFormFields),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    const data = await response.json();
    if (!response.ok) { throw new Error(data.message || 'Something went wrong!');}
    return data;
  }
  
function DynamicForm() {

    const router = useRouter();
    const [formFields, setFormFields] = useState('');
    const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error'
    const [s3UploadStatus, setS3UploadStatus] = useState();
    const [requestError, setRequestError] = useState();
    const [formId, setFormId] = useState('');
    const [restFormFields, setRestFormFields] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const [fileName, setFileName] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [fetchStatus, setFetchStatus] = useState('pending'); 
    const [urls, setUrls] = useState([]);
    const { uploadToS3 } = useS3Upload();

    // let handleFileChange = async file => {
    //   let { url } = await uploadToS3(file);
    //   console.log('url:',url);
    //   setDisplayUrl(url);
    //   const fileFieldName = "file";
    //   const newData = { ...restFormFields };
    //   newData[fileFieldName] = url;
    //   setRestFormFields(newData);
    // };
    var rest;
    var last;
    const handleFilesChange = async ({ target }) => {
      const files = Array.from(target.files);
  
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        setS3UploadStatus('pending'); 
        const { url } = await uploadToS3(file);
        const newUrl = url.toString();
        rest = newUrl.substring(0, newUrl.lastIndexOf("/") + 1);
        last = newUrl.substring(newUrl.lastIndexOf("/") + 1, newUrl.length);  
        setUrls(current => [...current, last]);
        setS3UploadStatus('success');
        setFileName(last);
        console.log('uploaded:',last);
        const fileFieldName = target.name;
        const newData = { ...restFormFields };
        newData[fileFieldName] = url;
        setRestFormFields(newData);   
        setDisabled(false);
      }
    };

    useEffect(() => {
        if (router.isReady) {      
          //console.log('qury:',router.query);
          var routerqueryval = router.query;
          setFormId(routerqueryval);      
        }
      }, [router.isReady, router.query]);
    
    console.log('routerqueryval:',formId.applicationById);

    var formPageLinkWithIDandName;
    var formIdSeperated;
    var formNameSeperated;
    var finalFormIdSeperated;
    if(formId){
        formPageLinkWithIDandName = formId.applicationById.toString();
        formIdSeperated = formPageLinkWithIDandName.substring(0, formPageLinkWithIDandName.lastIndexOf(":") + 1);
        formNameSeperated = formPageLinkWithIDandName.substring(formPageLinkWithIDandName.lastIndexOf(":") + 1, formPageLinkWithIDandName.length);
        finalFormIdSeperated = formIdSeperated.slice(0, formIdSeperated.length - 1); 
    }

    useEffect(() => {
        if(finalFormIdSeperated){
        setFetchStatus("pending");
        fetch(`/api/storeAppFields/${finalFormIdSeperated}`).then(response => response.json()).then(data => setFormFields(data))
        setFetchStatus("success");
        }
       }, [finalFormIdSeperated]);

    useEffect(() => {
        if (requestStatus === 'success' || requestStatus === 'error' || s3UploadStatus === 'success') {
          const timer = setTimeout(() => {
            setRequestStatus(null);
            setS3UploadStatus(null);
            setRequestError(null);
          }, 2000);
    
          return () => clearTimeout(timer);
        }
    }, [requestStatus, s3UploadStatus]);

    function handleChange(e, index) {
         e.preventDefault();

         const fieldName = e.target.getAttribute("name");
         const fieldValue = e.target.value;
         const newData = { ...restFormFields };
         newData[fieldName] = fieldValue;
         setRestFormFields(newData);
    };

    function radioHandleChange(e, index) {
     
      setSelectedValue(e.target.value);
      const radioFieldName = e.target.getAttribute("name");
      const radioFieldValue = e.target.value;
      const newData = { ...restFormFields };
      newData[radioFieldName] = radioFieldValue;
      setRestFormFields(newData);  
      console.log(restFormFields);
      
    };


    const getCheckboxes = (e) => {
      const { value, checked, name } = e.target
      console.log(`${value} is ${checked}`);

      if(checked){
        const newData = { ...restFormFields };
        newData[name] = value;
        setRestFormFields(newData);  
      } else {
        const uncheckedboxes = Object.keys(restFormFields)
          .filter((e) => e !== name)
          .reduce((obj, key) => {
            return Object.assign(obj, {
            [key]: restFormFields[key]
            });
          }, {});
          setRestFormFields(uncheckedboxes);
      }
    }
    
    console.log("selected checkbox entries:",restFormFields);
   // console.log("urls:",urls);
    

   function exitPage(){
    router.push('/exit');
}
    async function handleAddFormSubmit(event) {
        //event.preventDefault(); 
        setRequestStatus('pending');         
                try {             
                    const result = await createDynamicInfo(restFormFields);
                    setRequestStatus('success');
                    exitPage();
                    
                    
                    //console.log(result);
                    
                  } catch (error) {
                    setRequestError(error.message);
                    setRequestStatus('error');
                    console.log(error);
                  }  
                
    };


    let notification;

    if (requestStatus === 'pending') {
      notification = <p className={classes.notify}>Sending your inputs</p>
    }

    if (requestStatus === 'success') {
      notification = <div><p className={classes.notify}>Your inputs are submitted sucessfully</p>
      </div>
    }

    if (requestStatus === 'error') {
      notification = <p className={classes.notify}>{requestError}</p>
    }

    let notifyS3Upload;

    if (s3UploadStatus === 'pending') {
      notifyS3Upload = <div className={classes.loader2}></div>
    }

    if (s3UploadStatus === 'success') {
      notifyS3Upload = <div><p className={classes.notify}>File {fileName} is uploaded</p>   
      </div>
    }

    return(       
        <div className={classes.maincontainer}>
        <div className={classes.container}>
        <div>
        <h4>Job role: {formNameSeperated}</h4>
        </div>
        <div className={classes.dynamicformcontainer}>

        {fetchStatus === 'pending' && (
           
           <div className={styles.load}>
               <div className={styles.line}></div>
               <div className={styles.line}></div>
               <div className={styles.line}></div>
           </div>               
      
       )
       }
       {fetchStatus === 'success' && (
        <form>
        
        {formFields && (
          formFields.map((formField, index) => 
            (            
              <div key={index} className={classes.row}>  
                {formField.inputType === 'Email' && ( 
                <div>
                <div className={classes.col25}>
                  <label className={classes.label}>
                    {formField.labelName}
                  </label>         
                </div>
                <div className={classes.col75}>              
                  <input className={classes.input}
                      name={formField.labelFor}
                      type={formField.inputType}
                      id={formField.inputId}
                      onChange = {(e) => handleChange(e, index)}
                      required
                   />
               </div>
               </div> 
                )} 
                 {formField.inputType === 'Text' && ( 
                <div>
                <div className={classes.col25}>
                  <label className={classes.label}>
                    {formField.labelName}
                  </label>         
                </div>
                <div className={classes.col75}>              
                  <input className={classes.input}
                      name={formField.labelFor}
                      type={formField.inputType}
                      id={formField.inputId}
                      onChange = {(e) => handleChange(e, index)}
                      required
                   />
               </div>
               </div> 
                )} 
                {formField.inputType === 'Date' && ( 
                <div>
                <div className={classes.col25}>
                  <label className={classes.label}>
                    {formField.labelName}
                  </label>         
                </div>
                <div className={classes.col75}>              
                  <input className={classes.input}
                      name={formField.labelFor}
                      type={formField.inputType}
                      id={formField.inputId}
                      onChange = {(e) => handleChange(e, index)}
                      required
                   />
               </div>
               </div> 
                )} 
                 {formField.inputType === 'Number' && ( 
                <div>
                <div className={classes.col25}>
                  <label className={classes.label}>
                    {formField.labelName}
                  </label>         
                </div>
                <div className={classes.col75}>              
                  <input className={classes.input}
                      name={formField.labelFor}
                      type={formField.inputType}
                      id={formField.inputId}
                      onChange = {(e) => handleChange(e, index)}
                      required
                    />
                </div>
                </div> 
                )} 
                {formField.inputType === 'Radio' && ( 
                   <div>
                   <div className={classes.col25}>
                  </div>
                  <div className={classes.col75}>
                      <label className={classes.labelradio} htmlFor={formField.labelFor}>
                        {formField.labelFor}      
                          <input className={classes.inputradio}
                              name={formField.labelName}
                              type={formField.inputType}
                              id={formField.inputId}
                              value={formField.inputValue}
                              checked={selectedValue === formField.inputValue}                   
                              onChange={radioHandleChange}                      
                          />
                            <span className={classes.checkmarkradio}></span> 
                      </label> 
                  </div>
                  </div> 
                  )} 
                   {formField.inputType === 'Checkbox' && ( 
                        <div>
                            <div className={classes.col25}>                     
                        </div>
                         <div className={classes.col75}> 
                        <label className={classes.labelcheckbox} htmlFor={formField.inputId}>
                          {formField.inputValue}
                    
                        <input className={classes.inputcheckbox}
                            name={formField.labelName}
                            type={formField.inputType}
                            id={formField.inputId}
                            value={formField.inputValue}
                            //checked={checkedState[index]}
                            onChange={(e) => getCheckboxes(e)}                     
                        />                    
                        <span className={classes.checkmark}></span>
                        </label>    
                       </div> 
                      </div> 
                    )} 

                   
                {formField.inputType === 'File' && ( 
                <div>
                <div className={classes.col25}>
                  <label className={classes.label} htmlFor={formField.labelFor}>
                    {formField.labelFor}
                  </label>         
                </div>
                <div className={classes.col75}>              
                <input className={classes.input}
                      type={formField.inputType}
                      name={formField.inputId}
                      multiple={true}
                      onChange={handleFilesChange}
                    />
               </div>             
               </div> 
               
               )} 
               
                        
           </div>
            )
        ))}
            {notifyS3Upload}
                
        </form>    
       )}
        
       
          <div className={classes.row}>
                <button className={disabled ? classes.disabledsubmit : classes.submit} onClick={handleAddFormSubmit} type="submit" disabled={disabled ? true : false}>Submit Details</button>                
          </div> 

          {disabled && (
              <div className={classes.row}>   
              <h6 className={classes.note}>Note: Fill out the required fields to enable the submit button</h6>         
              </div>    
          )}
          
        </div>
        <div>{notification}</div>
        </div>
        </div>
       
    );

}

export default DynamicForm;





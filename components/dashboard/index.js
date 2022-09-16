import { useState, useEffect } from "react";
import classes from './dashboard.module.css';
import { useRouter } from 'next/router';

function Dashboard(){

    const [dashboardData, setDashboardData] = useState('');
    const [requestStatus, setRequestStatus] = useState('pending'); 
    const router = useRouter();

    // useEffect(() => {
    //     if (requestStatus === 'success' || requestStatus === 'error' ) {
    //       const timer = setTimeout(() => {
    //         setRequestStatus(null);                
    //       }, 3000);    
    //       return () => clearTimeout(timer);
    //     }
    // }, [requestStatus]);
     
    useEffect(() => {
        
        fetch(`/api/storeAppList/appList`).then(response => response.json()).then(data => setDashboardData(data))
        setRequestStatus('success');
       }, []);
       
    function goToApplication(id, appName){
        router.push(`/${id}:${appName}`);
    }



    let content;

    if (requestStatus === 'pending') {
      content = 
                
                <div className={classes.load}>
                    <div className={classes.line}></div>
                    <div className={classes.line}></div>
                    <div className={classes.line}></div>
                </div>               
              
    }

    if (requestStatus === 'success') {
      content =  <div className={classes.cardcontainer}>
        
      {dashboardData && (
      [...dashboardData].reverse().map((dashboard, index) => 
          (   
              <div key={index} className={classes.card}>
              <div className={classes.container}>
                  <p className={classes.appName}>Job role: <p className={classes.appdetails}>{dashboard.appName}</p></p> 
                  <p className={classes.appName}>Description: <p className={classes.appdetails}>{dashboard.appDescription}</p></p> 
                  <p className={classes.appName}>Qualifications: <p className={classes.appdetails}>{dashboard.qualifications}</p></p> 
                  <p className={classes.appName}>Job type: <p className={classes.appdetails}>{dashboard.jobType}</p></p>
                  <div>
                      <div className={classes.element}><h6 className={dashboard.appstatus == "Active" ? classes.active : classes.passive }><span className={dashboard.appstatus == "Active" ? classes.activedot : classes.passivedot }></span> {dashboard.appstatus}</h6></div> 
                  </div>                    
                  {dashboard.appstatus == "Active" && (
                      <div><button className={classes.appbtn} type="button" onClick={() => goToApplication(dashboard.id, dashboard.appName)}><span>Go To Application</span></button></div>
                  )}                 
              </div>               
              </div>
          )))}
      </div>
    }


    return(
       <div className={classes.maincontainer}>
         <div className={classes.heading0}>
                <h5>TO GET ONBOARD</h5>
            </div>     
            <div className={classes.heading2}>
                <h3>Checkout the active applications</h3>
            </div>  
        {content}
       </div>
    );
}

export default Dashboard;
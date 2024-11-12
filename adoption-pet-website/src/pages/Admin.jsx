import React from 'react'
import AdminSbar from '../components/AdminSbar'
import './css/admin.css'
import { useState, useEffect } from 'react';
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar} from "react-chartjs-2";

const Admin = () => {
    const [ucount, setUcount] = useState(null);
    const [acount, setAcount] = useState(null);

    const urlCount = "http://localhost/AdoptionWebsite/PHP/Analytic.php";
    
    useEffect(() => {

        fetch(urlCount)
        .then(response => response.json())
        .then(data => {
            if(data.status === "success"){
                setUcount(data.total_registered_user);
                setAcount(data.total_adoptions);
                localStorage.setItem("ucount", JSON.stringify(data.total_registered_user))
                localStorage.setItem("acount", JSON.stringify(data.total_adoptions))
            }
        })
        .catch(error => {
            console.error('Error occurred while fetching data:', error);
        })
    }, []);

        




    return (
        <div className='admin-dashboard'>      
            <AdminSbar />
            <div className="main-content">
                <h1>  Analytics Dashboard</h1>
                
                <div className="AnalyticContainer">
                    <div className="CardContainer">
                        
                    <h4 className='A-Title'>ANALYTIC TABLE</h4>
                        <div className="dataCard revenueCard">
                        <Bar
                            data={{
                                labels: ['User', 'Pet Adopted', 'Pet Rehome'],
                                datasets: [
                                    {
                                        label: 'User Registered',
                                        data: [ucount, 0, 0],
                                        backgroundColor: 'Green',
                                        borderColor: 'black',
                                        borderWidth: 2,
                                        fill: false, // Set to true to fill under the line
                                    },
                                    {
                                        label: 'Adopted',
                                        data: [0, acount, 0],
                                        backgroundColor: 'Gold',
                                        borderColor: 'black',
                                        borderWidth: 2,
                                        fill: false, // Set to true to fill under the line
                                    }
                                    ,
                                    {
                                        label: 'Rehome',
                                        data: [, , 0],
                                        backgroundColor: 'LightBlue',
                                        borderColor: 'black',
                                        borderWidth: 2,
                                        fill: false, // Set to true to fill under the line
                                    }
                                    
                                ]
                                
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false, // Allow responsive height
                            }}
                        />
                    </div>
                    </div>
                </div>
                
                
            </div>
        </div>
    ) 
}

export default Admin
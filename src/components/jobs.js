import React, { useEffect } from "react";
import "./jobs.css"
import moment from "moment/moment";
export default function Jobs(){
    const [jobList, setJobsList]=React.useState([])  //jobs list 
    const [showItem, setSowitem]=React.useState(5)      //number of list itme that is showing
    const [newEelemnts,setNewElements] = React.useState(0)      
    const [idArray,setId] = React.useState([])              //array of objects ids
    function CreateList(j,x){
        useEffect(()=>{                 //use useEffect to make sure the funtion will not rerender creating a infinte loop
            const fetchData= async ()=>{
                const dataIdjson= await fetch('https://hacker-news.firebaseio.com/v0/jobstories.json')   
                const dataId = await dataIdjson.json()          
                const datajson=[]               
                const data=[]
                setId((dataId))                 //fetching the Ids first and sayving it into idArray
                for(let i=x ; i<j ;i++){           // making sure to fetch 5 objects at tiem (diffrent between j and i is set to be always 5)
                    datajson[i]= await fetch(`https://hacker-news.firebaseio.com/v0/item/${dataId[i]}.json`) //fetching one object at time and saving it in job list
                    data[i]= await datajson[i].json()
                    setJobsList((jobList)=>[...jobList,data[i]])
                }
            }
            fetchData()   //call fetchdata function to show the first 5 list item (remove stric mode otherwise it will render twice)
        },[showItem])       //rerender just when the button is clcicked
    }
    function clickhandler(){
        if(showItem < idArray.length ){         //make sure not to get erroe when there is no more jobs to show
            setSowitem((showItem)=>showItem+5)
            setNewElements((newEelemnts)=>newEelemnts+5)
            console.log(jobList)
        }
        else{
            alert('no more jobs to show')
        }
    }
    CreateList(showItem,newEelemnts)
    return(
        <div className="conitner">
                <div className="main-continer">
                    {jobList.map((el)=>{
                    return(
                        <a href={el.url} className="job-continer">
                            <p>ID:<span className="blue-text">{el.id}</span></p>
                            <p className="title">{el.title}</p>
                            <p>{moment(el.time).format('MMMM Do YYYY, h:mm:ss a')}</p>        {/* remember to import momemt */}
                            <p>produced by:<span className="blue-text">{el.by}</span></p>
                        </a>
                    )})}
                    
                </div>
            <button onClick={clickhandler} className="btn">Load more</button>
        </div>
    )
}
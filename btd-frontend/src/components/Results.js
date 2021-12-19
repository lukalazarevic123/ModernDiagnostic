import React, {useState, useEffect} from 'react';
import { getTokens } from '../utils';
import './Results.css';


export default function Results(props){

    const [results, setResults] = useState([]);

    useEffect(() => {
        async function getResults(){
            const res = await getTokens();
            setResults(res);
        }

        getResults();
        console.log(results)
    },[]);

    return(
        <div className = "container ">
            <div className = "row">
                {results.map(result => (
                    <div className = "col-4" key = {result.date}>
                    <div className = "card">
                        <img src = {"https://" + result.img +".ipfs.infura-ipfs.io/"} className = "card-img-top" ></img>
                        <div className = "card-body">
                            <h5><strong>Brain tumor result</strong></h5>
                            <p>Date: {result.date}</p>
                            <p>Outcome: {result.outcome.toString()}</p>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

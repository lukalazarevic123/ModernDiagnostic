import React from 'react';
import './Home.css';


export default function Home(props){

    return(
        <div className = "container ">
            <div className = "row">
                <div className = "col-4 models" >
                    <div className = "card text-center" onClick = {() => window.location = "/btd"}>
                        <img src = "https://bafybeiek5swkidlbrno3szfqzligrwbt3qy3frwomywcwfsrjl2j7txoni.ipfs.infura-ipfs.io/" style = {{height: '100%'}}></img>
                        <h5><strong>Brain tumor detection</strong></h5>
                    </div>
                </div>
                <div className = "col-4">
                    <div className = "card text-center">
                        <img src = "https://www.watsonimagingcenter.com/wp-content/uploads/page/912/st-louis-xray.jpg" style = {{height: '100%'}}></img>
                        <h5><strong>Bone fracture detection</strong></h5>
                    </div>
                </div>
                <div className = "col-4" >
                    <div className = "card text-center">
                        <img src = "https://media.istockphoto.com/vectors/human-lungs-flat-vector-illustration-vector-id1155465034?k=20&m=1155465034&s=612x612&w=0&h=qTKEYCb81Cbm9_ZzSMBOggLYPm4uDnSm2xp90K551yA=" className = "card-img-top" style = {{height: '100%'}}></img>
                        <h5><strong>Pneumonia detection</strong></h5>
                    </div>
                </div>
            </div>
        </div>
    )
}
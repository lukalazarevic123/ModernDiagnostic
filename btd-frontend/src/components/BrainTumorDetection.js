import React, {Component} from 'react';
import './BrainTumorDetection.css';
import ipfs from '../ipfs';
import {mintResult} from '../utils.js';

class BrainTumorDetection extends Component {

  constructor(props){
    super(props);
    this.state = {
      image_path: '',
      buffer: '',
      ipfsHash: ''
    }
  }

  convertToBuffer = async (reader) => {
    const buffer = await Buffer.from(reader.result);

    this.setState({buffer});
  }

  captureFile = async (evt) => {
    evt.preventDefault();
    const file = evt.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.convertToBuffer(reader);
    this.setState({
      image_path: URL.createObjectURL(file)
    });
  }

  uploadIPFS = async (evt) => {
    evt.preventDefault();

    const image = await ipfs.add(this.state.buffer);
    const hash = image[0].hash;

    return hash;
  }

  submitResults = async(evt) => {
    evt.preventDefault();
    const ipfsHash = await this.uploadIPFS(evt);

    
    const CID = require('cids');
    const imgV1 = new CID(ipfsHash).toV1().toString('base32');console.log(imgV1);

    const forma = document.getElementById("submitForm");
    const spinner = document.getElementById("spinner");

    forma.hidden = true;
    spinner.hidden = false;

    const res = await fetch("http://localhost:5000/" + ipfsHash);
    const res2 = await res.json();

    const boolean = res2[2] === "F" ? "Negative" : "Positive";//TODO bit risky, needs to be changed
    
    var result = {
      date: new Date(),
      img: imgV1,
      outcome: boolean
    }

    await mintResult(result, evt);

    spinner.hidden = true;
    const res3 = document.getElementById("result");
    res3.innerHTML = "Outcome " + boolean.toString();
    res3.hidden = false;

  }



  render() {
    return (
      <div className="App">
        <div className = "container text-center">
          <img id = "mri" src = {this.state.image_path} title = "No image selected" className = "imgDisplay"/>
          <div className = "submitForm" id = "submitForm" hidden = {false}>
            <input type = "file" onChange = {evt => this.captureFile(evt)}></input>
            <button className = "btn btn-primary" onClick = {evt => this.submitResults(evt)}>Submit</button>
          </div>
          <div class="spinner-border"  id = "spinner" hidden = {true}>
            <span class="sr-only">Loading...</span>
          </div>
          <div className = "result" id = "result" hidden = {true}></div>
        </div>
      </div>
    );
  }
}

export default BrainTumorDetection;

import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import './CreateNewProblem.css';
import Modal from 'react-modal';
import ClipLoader from "react-spinners/ClipLoader";
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default class CreateNewProblem extends Component {
  constructor(props) {
    super(props);
    this.state = {
        image:null,
        showModal: false,
        validForm:false
    }
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  componentWillMount() {
    Modal.setAppElement('body');
  }
  handleOpenModal (event) {
    event.preventDefault();
    let et = event.target;
    var valid =true;
    [et.problem.value,et.description.value,et.image.value].forEach(function(a){
      console.log(a,typeof a);
      if (a==null || a==""){
        valid =false;
      }
    });
    console.log(event.target.encrypt.checked)
    
    var state={showModal:true,validForm:valid};
    this.setState(state);
    if (valid){
      //radiks async await
    }
  }
  handleCloseModal () {
    this.setState({ showModal: false });
  }
  onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {  
        this.setState({image: e.target.result});
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  render() {
  return (
    <div>
      <form style={{marginLeft:"10vmin"}} onSubmit={this.handleOpenModal}>
      <table >
        <tbody>
          <tr><td>问题域</td><td><TextField placeholder="请输入问题域题目" name="problem" style={{width:"100%"}}></TextField></td></tr>
          <tr><td>介绍</td><td><TextField placeholder="请介绍问题域基本信息" name="description" style={{width:"100%"}}></TextField></td></tr>
          <tr><td>是否加密</td><td>
              <label className="switch">
                <input type="checkbox" name="encrypt"/>
                <span className="slider round"></span>
            </label></td></tr>
            <tr><td>Logo</td><td>{
            this.state.image !=null? <div><img src={this.state.image} width="100px" height="100px"/><br/></div>:null
            }<input type="file" id="img" accept="image/*" name="image" onChange={this.onImageChange}/><br/>
            </td></tr>
            <tr><td></td><td><input type="submit" value="submit"/></td></tr>
          </tbody>
      </table>
      <br/>
      <br/>
      </form>
      <Modal
      isOpen={this.state.showModal}
      style={customStyles}
      contentLabel="Example Modal">
      <div>I am a modal</div>
      {
        this.state.validForm?<ClipLoader size={150}
        color={"#123abc"}/>:<div>Unable to upload, there is missing field</div>
      }
      <button onClick={this.handleCloseModal}>Close</button>
      </Modal>
    </div>
  );
  }
}

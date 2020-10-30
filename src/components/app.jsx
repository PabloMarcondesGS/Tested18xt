import React, {Component} from "react";
import { ContactForm } from './contact-form'
import { Message } from './message'
import { UserPanel } from './user-panel'

export class App extends Component{

    CONTACT_FORM_DEFAULTS = {
        name: '',
        email: '',
        option:'A',
        select: 1,
        type:'',
        message:''
    }
    
    constructor(props) {
        super(props);    
        this.state = {        
            contact: {...this.CONTACT_FORM_DEFAULTS},
            sent: false,
            currentUser: null
        };

        this.sendContact = this.sendContact.bind(this);
        this.contactChanged = this.contactChanged.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);

    }

    contactChanged(contact){
        const nameTarget = contact.target.name;
        const valueTarget = contact.target.value;
        this.setState({ contact: { ...this.state.contact, [nameTarget] : valueTarget  } })
    }

    sendContact(contact){
        
        // For now just mark it as `sent`
        this.setState({ sent:true });        
        
    }

    logIn = () => {        
        if(this.state.contact.name != '' && this.state.contact.email != ''){            
            this.setState({
                currentUser:{
                    name:this.state.contact.name,
                    email:this.state.contact.email
                }
            })
        }else{            
            this.setState({
                currentUser:{
                    name:'Test User',
                    email:'user@example.com'
                }
            })
        }
    };

   onKeyDown = (event) => {
      if (event.key === 'Enter' && event.target.name !== 'message') {
        if (event.target.checkValidity && event.target.checkValidity()) {
            this.sendContact(event);
        }
      }
    }

    render(){
        let message = (this.state.sent)?<Message header={"Thank You"} text={"We will reply to your message in next 24h. Have a nice day! ;-)"}/> :<></>;
        let userPanel = (this.state.currentUser)?<UserPanel user={this.state.currentUser}/>: <></>;
        
        return <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="pull-right">
                        <button className="btn btn-default" onClick={this.logIn}>
                            <i className="glyphicon glyphicon-user"></i> Log In
                        </button>
                    </div>
                </div>
            </div>
            {userPanel}

            <div className="row">
                <div className="col-md-4">
                    <h2>Contact us</h2>
                    <p>Please fill in form on the right to get fast reply</p>
                    <img style={{width:'100%'}} src="http://via.placeholder.com/300x200"/>
                </div>
                <div className="col-md-8">
                    {!this.state.sent && <ContactForm data={this.state.contact} onChange={this.contactChanged} onSubmit={ this.sendContact } onKeyDown={this.onKeyDown} />}
                    {message}
                </div>
            </div>
        </div>
    }
}

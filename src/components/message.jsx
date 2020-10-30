import React from "react"; 

export const Message = (props) => {
  
 return(
  <div className="alert alert-primary text-center" role="alert">
  { props.header && <h3 className="message-header">{props.header}</h3>}
  { props.text && <div className="message-body"> {props.text}</div>}
  { !props.text && <div className="message-body"> Hope! </div>}
</div>
 );

}
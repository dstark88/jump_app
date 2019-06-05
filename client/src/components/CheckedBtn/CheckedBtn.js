import React from "react";
import "./CheckedBtn.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function CheckedBtn(props) {
  return (
    <span className="checked-btn" {...props} 
      role="button" tabIndex="0" data-value="check">
      Check
    </span>
  );
}

export default CheckedBtn;

    // <span className="checked-btn"
    //     onClick={()=>props.handleClickTodo(props._id)}
    //     role="button" 
    //     type="checkbox"
    //     name="done" 
    //     tabIndex="0">
        
    //     Check
    // </span>
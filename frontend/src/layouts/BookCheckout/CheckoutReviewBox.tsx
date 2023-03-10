import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";
import Bookmodel from "../../models/Bookmodel";

export const CheckoutReviewBox: React.FC<{book:Bookmodel | undefined,mobile:boolean,currentLoansCount:number
, isAuthenticated:any,isCheckedOut:boolean, doCheckout:Function
}> = (props) =>{
    

    function buttonRender(){

        if(props.isAuthenticated){
            if(!props.isCheckedOut && props.currentLoansCount < 5){
                return (<button className="btn btn-success btn-lg" onClick={() => props.doCheckout()}>Checkout</button>);
         

            }else if(props.isCheckedOut){
                return(<p><b>Book is checked out. Enjoy!</b></p>);
            }else if(!props.isCheckedOut){
                return(<p className="text-danger">Too many books checked out.</p>);

            }
        }else{
               
            return(<Link to={"/login"} className="btn btn-success btn-lg">Sign In</Link>);
        }
    }
         

    return(
        <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
            <div className='card-body container'>
                <div className='mt-3'>
                    <p>
                        <b>{props.currentLoansCount}/5</b>
                        books checked out
                    </p>
                    <hr />
                    {props.book && props.book.copiesAvailable && props.book.copiesAvailable > 0 ? 
                    <h4 className='text-success'>Available</h4>    
                    :
                    <h4 className='text-danger'>Wait list</h4>
                }

                <div className='row'>
                    <p className='col-6 lead'>
                        <b>{props.book?.copies} </b>
                         copies
                    </p>
                    <p className="col-6 lead">
                        <b>{props.book?.copiesAvailable} </b>
                         available
                    </p>
                </div>
                </div>
                {buttonRender()}
                <hr />
                <p className='mt-3'>
                    This number can be changed until placing order has been complete.
                </p>
                <p>Sign in to be able to leave a review.</p>
            </div>
        </div>
    );
}
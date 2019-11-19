import React from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from './../actions';



class GoogleAuth extends React.Component{

    // state={
    //     isSignedIn : null
    // }


    componentDidMount(){
        window.gapi.load('client:auth2', ()=>{
           window.gapi.client.init({
               clientId:'534984936488-g9a5tbjs4s0rjrdk5vjmc1gls8gvor17.apps.googleusercontent.com',
               scope:'email'
           }).then(()=>{
               this.auth = window.gapi.auth2.getAuthInstance();
               this.onAuthChange(this.auth.isSignedIn.get());

               this.auth.isSignedIn.listen(this.onAuthChange);
           });
        });
    }

    onAuthChange = isSignedIn => {
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        }else{
            this.props.signOut();
        }
    }

    render(){
        return <div> {this.renderAuthButton()}</div>
    }


    signIn = () =>{
        this.auth.signIn();
    }

    signOut = () =>{
        this.auth.signOut();
    }

    renderAuthButton(){
        if(this.props.isSignedIn === null){
            return <div> Not Sure</div>;

        }else if(this.props.isSignedIn){
            return (
                <button onClick ={this.signOut} className="ui red google button">
                    <i className="google icon">
                        Sign Out
                    </i>
                </button>
            );
        }else{
            return <div> 
                <button onClick = {this.signIn}className="ui red google button">
                    <i className="google icon">
                        Sign In With Google
                    </i>
                </button>
            </div>
        }
    }

   
}

const mapStateToProps =(state) =>{
    return {
        isSignedIn: state.auth.isSignedIn
    };
};

export default connect(mapStateToProps,{signIn,signOut})(GoogleAuth);
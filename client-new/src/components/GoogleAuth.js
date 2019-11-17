import React from 'react';



class GoogleAuth extends React.Component{

    state={
        isSignedIn : null
    }


    componentDidMount(){
        window.gapi.load('client:auth2', ()=>{
           window.gapi.client.init({
               clientId:'534984936488-g9a5tbjs4s0rjrdk5vjmc1gls8gvor17.apps.googleusercontent.com',
               scope:'email'
           }).then(()=>{
               this.auth = window.gapi.auth2.getAuthInstance();
               this.setState({isSignedIn : this.auth.isSignedIn.get()});

               this.auth.isSignedIn.listen(()=>{
                this.setState({isSignedIn : this.auth.isSignedIn.get()});
               });
           });
        });
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
        if(this.state.isSignedIn === null){
            return <div> Not Sure</div>;

        }else if(this.state.isSignedIn){
            return (
                <button onClick ={()=>this.signOut()} className="ui red google button">
                    <i className="google icon">
                        Sign Out
                    </i>
                </button>
            );
        }else{
            return <div> 
                <button onClick = {()=>this.signIn()}className="ui red google button">
                    <i className="google icon">
                        Sign In With Google
                    </i>
                </button>
            </div>
        }
    }

   
}

export default GoogleAuth;
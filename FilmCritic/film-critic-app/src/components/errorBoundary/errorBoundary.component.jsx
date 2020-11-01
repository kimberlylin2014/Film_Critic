import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (
          <div className='row justify-content-center align-items-center' style={{height: "95vh"}}>
            <div className='col-lg-8 d-flex justify-content-center align-items-center'>
              <img src="https://www.flaticon.com/svg/static/icons/svg/929/929416.svg" alt="error" width='70px' 
              style={{marginRight: "20px"}}
              />
              <h1 className='text-center'>There was an issue with the network. Please refresh the page.</h1>  
            </div>
            
          </div>
        )
        
  
      }
  
      return this.props.children; 
    }
  }
  
  export default ErrorBoundary;
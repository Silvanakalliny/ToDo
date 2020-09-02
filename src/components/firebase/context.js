import React from 'react'

const FirebaseContext = React.createContext(null)

export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
      {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
  );
//function above basically takes in a component as an argument and adds firebase to that components props so they're accessible
export default FirebaseContext
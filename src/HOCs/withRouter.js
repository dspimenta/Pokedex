import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// Componente de ordem superior (HOC - Higher-Order Component) que envolve um componente com o Router do React Router
const withRouter = (WrappedComponent) => {
	return class Wrapper extends React.Component {
		render() {
			return (
				<Router>
					<WrappedComponent {...this.props} />
				</Router>
			);
		}
	};
};

export default withRouter;

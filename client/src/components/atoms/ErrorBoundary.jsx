import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Puedes registrar el error en un servicio de informes de errores.
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Puedes renderizar cualquier UI de error personalizada aquí.
      return <h1>Lo sentimos, algo salió mal.</h1>;
    }

    // Renderiza los hijos en caso de que no haya errores.
    return this.props.children;
  }
}

export default ErrorBoundary;

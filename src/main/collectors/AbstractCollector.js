class AbstractCollector {

  constructor(type) {
    this.type = type;
  }

  getType() {
    return this.type;
  }

  setContext(contextResolver) {
    this.contextResolver = contextResolver;
  }

  getContext() {
    return this.contextResolver;
  }

  getWindow() {
    return this.contextResolver ? this.contextResolver.getWindow() : window;
  }

  getDocument() {
    return this.contextResolver ? this.contextResolver.getDocument() : window.document;
  }
}

module.exports = AbstractCollector;
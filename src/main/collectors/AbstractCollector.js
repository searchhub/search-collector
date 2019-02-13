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
}

module.exports = AbstractCollector;
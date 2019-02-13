
class ContextResolver {

  constructor(win, doc) {
    this.window = win;
    this.document = doc;
  }

  getWindow() {
    return this.window;
  }

  getDocument() {
    return this.document;
  }
}
module.exports = ContextResolver;
class SplitStreamWriter {

    constructor(writers) {
        this.writers = writers;
    }
  
    write(data) {
        for (let writer of this.writers) {
            writer.write(data);
        }
    }
}
module.exports = SplitStreamWriter;
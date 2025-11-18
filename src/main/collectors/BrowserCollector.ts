import {AbstractCollector} from "./AbstractCollector";


export type BrowserCollectorOptions = {
  recordUrl: boolean,
  recordReferrer: boolean,
  recordLanguage: boolean
}

/**
 * Collect basic browser information. Note that depending on how you use this you may
 * need to consult the GDPR guidelines
 */
export class BrowserCollector extends AbstractCollector {

  private readonly recordUrl: boolean;
  private readonly recordReferrer: boolean;
  private readonly recordLanguage: boolean;
  private readonly recordUserAgent: boolean;

  constructor(options = {recordUrl: true, recordReferrer: true, recordLanguage: false, recordUserAgent: false}) {
    super("browser");
    this.recordUrl = options.recordUrl || false;
    this.recordReferrer = options.recordReferrer || false;
    this.recordLanguage = options.recordLanguage || false;
    this.recordUserAgent = options.recordUserAgent || false;
  }

  /**
   * Attach a writer, note that this collector is not asynchronous and will write
   * the data immediatelly
   *
   * @param {object} writer - The writer to send the data to
   */
  attach(writer) {
    const win = this.getWindow();
    const doc = this.getDocument();

    const data: any = {
      type: this.getType(),
      touch: ('ontouchstart' in window) || (navigator.maxTouchPoints > 0)
    }

    if (this.recordLanguage)
      data.lang = win.navigator.language;

    if (this.recordUrl)
      data.url = win.location.href;

    if (this.recordReferrer)
      data.ref = doc.referrer;

    if (this.recordUserAgent)
      data.agent = window.navigator.userAgent;

    writer.write(data);
  }
}

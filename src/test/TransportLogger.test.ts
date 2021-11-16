import {TransportLogger} from "../main/logger/TransportLogger";
import MockContext = jest.MockContext;

describe('Test the TransportLogger', () => {

	test('TransportLogger test', () => {
		const mockTransport = {
			debug: jest.fn((msg: string, ...dataArgs) => void 0),
			info: jest.fn((msg: string, ...dataArgs) => void 0),
			warn: jest.fn((msg: string, ...dataArgs) => void 0),
			error: jest.fn((msg: string, ...dataArgs) => void 0),
		};

		const log = new TransportLogger([mockTransport]);
		log.info("INFO");
		log.debug("DEBUG");
		log.warn("WARN");
		log.error("ERROR");


		log.info("INFO", 1, 2, 3);
		log.debug("DEBUG", 1, 2, 3);
		log.warn("WARN", 1, 2, 3);
		log.error("ERROR", 1, 2, 3);

		assertMock(mockTransport.info.mock, "INFO");
		assertMock(mockTransport.debug.mock, "DEBUG");
		assertMock(mockTransport.warn.mock, "WARN");
		assertMock(mockTransport.error.mock, "ERROR");

		function assertMock(mock: MockContext<any, any>, msg: string) {
			expect(mock.calls.length).toBe(2);
			expect(mock.calls[0][0]).toBe(msg);
			expect(mock.calls[1][0]).toBe(msg);
			expect(mock.calls[1][1]).toBe(1);
			expect(mock.calls[1][2]).toBe(2);
			expect(mock.calls[1][3]).toBe(3);
		}
	})

	test('TransportLogger test - exception thrown', () => {
		const mockTransport = {
			debug: jest.fn((msg: string, ...dataArgs) => {throw Error("This should not make the test fail")}),
			info: jest.fn((msg: string, ...dataArgs) => {throw Error("This should not make the test fail")}),
			warn: jest.fn((msg: string, ...dataArgs) => {throw Error("This should not make the test fail")}),
			error: jest.fn((msg: string, ...dataArgs) => {throw Error("This should not make the test fail")}),
		};

		const log = new TransportLogger([mockTransport]);
		log.info("INFO");
		log.debug("DEBUG");
		log.warn("WARN");
		log.error("ERROR");

		expect(1).toBe(1);
	})

});


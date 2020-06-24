require('../../setup');
const fs = require('fs');
const ampqlib = require('amqplib');
const rabbit = require('../../../src/index.js');
const config = require('../../integration/configuration');

describe('AMQP Connection', function () {
  describe('ssl support options when values are not paths', function () {
    let sandbox;
    let amqplibConnectSpy;

    before(function (done) {
      sandbox = sinon.createSandbox();
      amqplibConnectSpy = sandbox.stub(ampqlib, 'connect').rejects();
      rabbit.configure({
        connection: {
          ...config.connection,
          retryLimit: 1,
          caPath: 'some-ca-value',
          certPath: 'cert',
          keyPath: 'key',
          pfxPath: 'pfx',
          passphrase: 'passphrase-is-not-a-path'
        }
      })
        .catch(() => {
          done();
        });
    });

    after(() => {
      sandbox.restore();
    });

    it('should have all of the provided ssl options', function () {
      const uri = 'amqps://guest:guest@127.0.0.1:5672/%2f?heartbeat=30';

      const expectedConnectionOptions = {
        servername: '127.0.0.1',
        noDelay: true,
        timeout: 2000,
        cert: 'cert',
        key: 'key',
        pfx: 'pfx',
        passphrase: 'passphrase-is-not-a-path',
        ca: [
          'some-ca-value'
        ],
        clientProperties: {
          host: sinon.match.string,
          process: sinon.match.string,
          lib: sinon.match(/foo-foo-mq - .*/)
        }
      };

      sinon.assert.callCount(amqplibConnectSpy, 1);
      sinon.assert.calledWith(amqplibConnectSpy, uri, expectedConnectionOptions);
    });
  });

  describe('ssl support options when values are paths', function () {
    let amqplibConnectSpy;
    let sandbox;
    const getLocalPath = (fileName) => `${__dirname}/${fileName}`;
    const sslPathSettings = [
      getLocalPath('caPath1'),
      getLocalPath('caPath2'),
      getLocalPath('certPath'),
      getLocalPath('keyPath'),
      getLocalPath('pfxPath')
    ];

    before(function (done) {
      sandbox = sinon.createSandbox();
      sslPathSettings.map((settingName) => {
        fs.writeFileSync(settingName, `${settingName.split('/').pop()}-file-contents`);
      });

      amqplibConnectSpy = sandbox.stub(ampqlib, 'connect').rejects();
      rabbit.configure({
        connection: {
          ...config.connection,
          retryLimit: 1,
          caPath: `${sslPathSettings[0]},${sslPathSettings[1]}`,
          certPath: sslPathSettings[2],
          keyPath: sslPathSettings[3],
          pfxPath: sslPathSettings[4],
          passphrase: 'passphrase-is-not-a-path'
        }
      })
        .catch(() => {
          done();
        });
    });

    after(() => {
      sslPathSettings.map((settingName) => {
        fs.unlinkSync(settingName);
      });
      sandbox.restore();
    });

    it('should have all of the provided ssl options', function () {
      const uri = 'amqps://guest:guest@127.0.0.1:5672/%2f?heartbeat=30';

      const expectedConnectionOptions = {
        servername: '127.0.0.1',
        noDelay: true,
        timeout: 2000,
        cert: Buffer.from('certPath-file-contents'),
        key: Buffer.from('keyPath-file-contents'),
        pfx: Buffer.from('pfxPath-file-contents'),
        passphrase: 'passphrase-is-not-a-path',
        ca: [
          Buffer.from('caPath1-file-contents'),
          Buffer.from('caPath2-file-contents')
        ],
        clientProperties: {
          host: sinon.match.string,
          process: sinon.match.string,
          lib: sinon.match(/foo-foo-mq - .*/)
        }
      };

      sinon.assert.callCount(amqplibConnectSpy, 1);
      sinon.assert.calledWith(amqplibConnectSpy, uri, expectedConnectionOptions);
    });
  });
});

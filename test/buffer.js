'use strict';

require('should');

const crc64 = require('../');

describe('buffer test', function() {
  const retString = '11051210869376104954';

  it('check Buffer(\'123456789\')', function() {
    const ret = crc64.crc64(Buffer.from('123456789'));
    ret.should.be.equal(retString);
  });

  it('check Buffer(\'123456789\') with previous value', function() {
    const ret = crc64.crc64(Buffer.from('123456789'), '0');
    ret.should.be.equal(retString);
  });
});

describe('combine crc64', function() {
  const retString = '11051210869376104954';
  it('check combine 1', function() {
    const crc1 = '1234';
    const crc2 = '56789';
    const ret = crc64.combineCrc64(
      crc64.crc64(Buffer.from(crc1)),
      crc64.crc64(Buffer.from(crc2)),
      crc2.length
    );
    ret.should.be.equal(retString);
  });

  it('check combine 2', function() {
    const crc1 = '1234';
    const crc2 = '56';
    const crc3 = '789';
    const ret1 = crc64.combineCrc64(
      crc64.crc64(Buffer.from(crc1)),
      crc64.crc64(Buffer.from(crc2)),
      crc2.length
    );
    const ret = crc64.combineCrc64(
      ret1,
      crc64.crc64(Buffer.from(crc3)),
      crc3.length
    );
    ret.should.be.equal(retString);
  });

  it('check combine 2 with zero length', function() {
    const crc1 = '1234';
    const crc2 = '';
    const crc3 = '56789';
    const ret1 = crc64.combineCrc64(
      crc64.crc64(Buffer.from(crc1)),
      crc64.crc64(Buffer.from(crc2)),
      crc2.length
    );
    const ret = crc64.combineCrc64(
      ret1,
      crc64.crc64(Buffer.from(crc3)),
      crc3.length
    );
    ret.should.be.equal(retString);
  });
});


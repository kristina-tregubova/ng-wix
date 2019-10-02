import { NullToDashPipe } from './null-to-dash.pipe';

describe('NullToDashPipe', () => {
  it('create an instance', () => {
    const pipe = new NullToDashPipe();
    expect(pipe).toBeTruthy();
  });
});

import { StrengthPipe } from './strength.pipe';

describe('StrengthPipe', () => {
  let sut: StrengthPipe;

  beforeEach( () => {
      sut = new StrengthPipe();
    }
  );

  it('sould display weak if strength is 5', () => {
    // Arrange:
    let expected = '5 (weak)';

    // Act:
    let result = sut.transform(5);

    // Assert:
    expect(result).toBe(expected);
  });

  it('sould display strong if strength is 10', () => {
    // Arrange:
    let expected = '10 (strong)';

    // Act:
    let result = sut.transform(10);

    // Assert:
    expect(result).toBe(expected);
  });

});

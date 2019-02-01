/*
These tests are examples of isolated unit tests, as they directly instantiate the MessageService and run
tests against it without requiring any dependencies or integrating with the Angular environment.
*/

import { MessageService } from './message.service';

describe('MessageService', () => {
  let sut: MessageService;


  it('should have no messages to start', () => {
    // Arrange:
    sut = new MessageService();

    // Assert:
    expect(sut.messages.length).toBe(0);
  });

  it('should add a message when add is called', () => {
    // Arrange:
    sut = new MessageService();

    // Act:
    sut.add('Hello');

    // Assert:
    expect(sut.messages.length).toBe(1);
    expect(sut.messages[0]).toBe('Hello');
  });

  it('should remove all messages when clear is called', () => {
    // Arrange:
    sut = new MessageService();
    sut.add('Hello');

    // Act:
      sut.clear();

    // Assert:
    expect(sut.messages.length).toBe(0);
  });
});

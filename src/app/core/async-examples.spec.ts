import {fakeAsync, flushMicrotasks} from "@angular/core/testing";

describe("Asynchronous Tests", () => {

  it("Asynchronous test example - plain Promise", fakeAsync(() => {

    let test = false;
    console.log('Creating promise');

    Promise.resolve().then(() => {
      console.log('Promise first then() evaluated successfully');
      return Promise.resolve();
    }).then(() => {
      console.log('Promise second then() evaluated successfully');
      test = true;
    })

    flushMicrotasks();

    console.log('Running test assertions');
    expect(test).toBe(true);
  }))
})

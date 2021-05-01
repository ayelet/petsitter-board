test("How async workds", (done) => {
  setTimeout(() => {
    expect(1).toBe(2);
    done();
  }, 2000);
});

test("Shoould add 2 numbers async", async () => {
  const sum = await someAsyncFunction(12, 21);
  expect(sum).toBe(33);
});

export default class Production {
  public static get(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          "production item 1",
          "production item 2",
          "production item 3",
          "production item 4"
        ]);
      }, 2000);
    });
  }
}

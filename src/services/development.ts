export default class Development {
  public static get(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([
          "development item 1",
          "development item 2",
          "development item 3",
          "development item 4"
        ]);
      }, 2000);
    });
  }
}

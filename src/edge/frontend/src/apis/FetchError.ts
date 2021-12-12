class FetchError extends Error {
  private readonly response: Response;
  constructor(message: string, response: Response) {
    super(message);
    this.response = response;
    Object.setPrototypeOf(this, new.target.prototype);
  }
  public getResponse = () => this.response;
}
export { FetchError };

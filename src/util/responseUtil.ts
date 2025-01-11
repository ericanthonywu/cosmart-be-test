export default class ResponseUtil<T> {
  private message: string = "Success";
  private data: T | null | any = null;
  private error: Error  |object| null = null;

  public setData(data: T | any): this {
    this.data = data;
    return this;
  }

  public setMessage(message: string):this {
    this.message = message;
    return this;
  }

  public setError(error: Error | object):this {
    this.error = error;
    return this;
  }

  public toObject() {
    return {
      message: this.message,
      data: this.data,
      error: this.error,
    };
  }
}

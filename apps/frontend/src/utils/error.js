export class APIError extends Error{
  constructor(message,httpCode,detailCode){
    super(message);
    this.httpCode=httpCode;
    this.detailCode=detailCode;
  }
}
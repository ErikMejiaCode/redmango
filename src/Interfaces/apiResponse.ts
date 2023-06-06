export default interface apiResponse {
  data?: {
    //This will be included in suggestions so that if possible use the format if you know that.
    statusCode?: number;
    isSuccess?: boolean;
    errorMessages?: Array<string>;
    result: {
      //This will not give suggestions
      [key: string]: string;
    };
  };
  error?: any;
}

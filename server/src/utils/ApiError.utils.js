export const ApiError = class {
    constructor(statusCode,msg){
        this.statusCode = statusCode;
        this.msg = msg || "something went wrong!";
    }
}

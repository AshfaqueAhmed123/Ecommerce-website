export const ApiResponse = class {
    constructor(statusCode,msg,data){
        this.statusCode = statusCode;
        this.msg = msg;
        this.data = data || [];
    }
}

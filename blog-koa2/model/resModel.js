class BaseModel {
    constructor(data, str) {
        if(typeof data == 'string') {
            this.str = data;
            data = null;
            str = null;
        }
        if(data) this.data = data;
        if(str) this.str = str;
    }
}

class SuccModel extends BaseModel {
    constructor(data, str) {
        super(data, str);
        this.code = 0;
    }
}

class ErrorModel extends BaseModel {
    constructor(data, str) {
        super(data, str);
        this.code = -1;
    }
}

module.exports = {
    SuccModel,
    ErrorModel,
}
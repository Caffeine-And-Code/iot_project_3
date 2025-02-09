class Response {
    static _data = null
    static _error = null
    static _status = 200

    static init()
    {
        this._data = null
        this._error = null
        this._status = 200
    }

    static setData(data) {
        this._data = data
    }

    static setJson(data) {
        this._data = JSON.stringify(data)
    }

    static setError(err) {
        this._error = err
    }

    static setStatus(status) {
        this._status = status
    }

    static toJson(){
        const obj = {
            "ts" : Date.now(),
        }
        if(this._data !== null){
            obj.data = this._data
        }
        if(this._error !== null){
            obj.error = this._error
        }
        return obj
    }

    static send(response) {
        return response.json(this.toJson()).status(this._status)
    }
}

module.exports = Response
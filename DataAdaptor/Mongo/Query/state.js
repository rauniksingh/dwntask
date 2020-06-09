const stateModel = require('../Models/state');

class StateQueries {

    async createState (data) {
        return stateModel.create(data);
    };

    async getStateName (stateName) {
        return stateModel.countDocuments({ stateName: stateName })
    };

    async fetchStates (skipRec, limit) {
        return stateModel.find({}).select('stateName').skip(skipRec).limit(limit).lean();
    };

    async checkState (id) {
        return stateModel.countDocuments({_id: id})
    };

};

module.exports = new StateQueries();
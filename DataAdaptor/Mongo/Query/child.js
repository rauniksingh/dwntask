const chdModel = require('../Models/child');

class ChildQueries {

    async addChild (data) {
        return chdModel.create(data)
    };

    async fetchChild (skiprec, limit) {
        return chdModel.find({})
        .populate( [{ path: 'districtId', select: 'districtName' }, { path: 'stateId', select: 'stateName' }] )    
        .sort(skiprec).limit(limit)
        .select('-__v -updatedAt')
        .lean();
    };

    async getChildById (id) {
        return chdModel.findOne({ _id: id })
        .populate( [{ path: 'districtId', select: 'districtName' }, { path: 'stateId', select: 'stateName' }] )    
        .lean();
    };


};

module.exports = new ChildQueries();
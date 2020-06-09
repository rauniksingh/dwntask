const distModel = require('../Models/district');

class DistQueries {
    
    async checkDupDistrict (obj) {
        return distModel.countDocuments({ stateId: obj.stateId, districtName: obj.districtName })
    };

    async createDistrict (data) {
        return distModel.create(data)
    };

    async fetchDistrict (stateId, skiprec, limit) {
        return distModel.find({ stateId: stateId }).select('districtName').skip(skiprec).limit(limit).lean();
    };
};

module.exports = new DistQueries();